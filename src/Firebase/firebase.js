import * as firebaseApp from "firebase/app";

import firebaseConfig from "./config";

import "firebase/auth";
import "firebase/firebase-firestore";
// Initialize Firebase

class Firebase {
  constructor() {
    firebaseApp.initializeApp(firebaseConfig);
    this.auth = firebaseApp.auth();
    this.firestore = firebaseApp.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async register(email, password, firstName, lastName) {
    console.log(email, password, firstName, lastName);
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: `${firstName} ${lastName}`,
    });
  }

  logout() {
    return this.auth.signOut();
  }

  authChange(callBack) {
    return this.auth.onAuthStateChanged(callBack);
  }
}

export default new Firebase();
