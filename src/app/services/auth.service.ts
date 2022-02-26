import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!:Observable<firebase.User| null>
  userID:string=""
  constructor(private fireAuth:AngularFireAuth,
    private fireStore:AngularFirestore) {
    this.user=fireAuth.user
  }
  

  addNewUser(id:string,name:string,email:string){
    return this.fireStore.doc(`user/${id}`).set({
      name,email
    })
  }
signUp(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
  }
  logIn(email: string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email,password);
  }
  logOut(){
    return this.fireAuth.signOut()
  }
}
