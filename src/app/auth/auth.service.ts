import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
// import { ThrowStmt } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  newUser: any;
  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {}

  createUser(user) {
    await this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName,
        });
        this.insertUserData(userCredential).then(() => {
          this.router.navigate(['/home']);
        });
      })
      .catch((error) => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.userCredential) {
    return this.db.doc('Users/${userCredential.user.uid}').set({
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'network user',
    });
  }
}