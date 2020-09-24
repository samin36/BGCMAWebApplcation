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
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      await this.auth.currentUser.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });
      console.log("parent registered");
      await this.addParentToDatabase(
        firstName,
        lastName,
        email,
        this.auth.currentUser.uid
      );
      console.log("parent added to database");
    } catch (err) {
      console.error("error in registration: ", err.message);
    }
  }

  async addParentToDatabase(firstName, lastName, email, uid) {
    await this.firestore.collection("parents").doc(uid).set({
      firstName,
      lastName,
      email,
    });
  }

  async uploadChildForm(childFirstName, childLastName, childFormData, uid) {
    //TODO: Add rule to check if childFirstName and childLastName are non-null
    const collectionName = `${childFirstName}${childLastName}`;
    const documentName = `${collectionName}FormData`;
    await this.firestore
      .collection("parents")
      .doc(uid)
      .collection(collectionName)
      .doc(documentName)
      .set(childFormData);
  }

  logout() {
    return this.auth.signOut();
  }

  authChange(callBack) {
    return this.auth.onAuthStateChanged(callBack);
  }
}

export default new Firebase();
