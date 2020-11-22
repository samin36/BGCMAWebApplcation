// import * as firebaseApp from "firebase/app";
import * as firebaseApp from "firebase";
import "firebase/app";

import firebaseConfig from "./config";

import { getFormattedDate } from "./firebaseutils";

import "firebase/auth";
import "firebase/firebase-firestore";
// Initialize Firebase

class Firebase {
  constructor() {
    firebaseApp.initializeApp(firebaseConfig);
    this.auth = firebaseApp.auth();
    this.firestore = firebaseApp.firestore();
    this.functions = firebaseApp.functions();
  }

  async login(email, password) {
    await this.auth.signInWithEmailAndPassword(email, password);
  }

  async loginAdmin(email, password) {
    await this.auth.signInWithEmailAndPassword(email, password);
    if (!this.auth.currentUser.emailVerified) {
      await this.logout();
      throw new Error("Admin email must be verified");
    } else {
      const currentUser = this.auth.currentUser;
      const name = currentUser.displayName.split(" ");
      const firstName = name[0],
        lastName = name[1];
      await this.addAdminToDatabase(
        firstName,
        lastName,
        currentUser.email,
        currentUser.uid
      );
    }
  }

  async register(email, password, firstName, lastName) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    await this.auth.currentUser.updateProfile({
      displayName: `${firstName} ${lastName}`,
    });
    await this.addParentToDatabase(
      firstName,
      lastName,
      email,
      this.auth.currentUser.uid
    );
  }

  async registerAdmin(email, password, firstName, lastName) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    await this.auth.currentUser.updateProfile({
      displayName: `${firstName} ${lastName}`,
    });
    const addAdminRole = this.functions.httpsCallable("addAdminRole");
    const data = {
      email,
      uid: this.auth.currentUser.uid,
    };
    await addAdminRole(data);
    await this.auth.currentUser.sendEmailVerification();
    await this.auth.signOut();
  }

  async checkAdminStatus() {
    const checkIfAdmin = this.functions.httpsCallable("checkIfAdmin");
    const data = {
      uid: this.auth.currentUser.uid,
    };
    const result = await checkIfAdmin(data);
    return result.data === true;
  }

  async addParentToDatabase(firstName, lastName, email, uid) {
    console.log(uid);
    await this.firestore.collection("parents").doc(uid).set({
      firstName,
      lastName,
      email,
      uid,
    });
  }

  async addAdminToDatabase(firstName, lastName, email, uid) {
    console.log(firstName, lastName, email);
    await this.firestore.collection("admins").doc(uid).set(
      {
        firstName,
        lastName,
        email,
        uid,
        isAdmin: true,
      },
      {
        merge: true,
      }
    );
  }

  async uploadChildForm(
    childFirstName,
    childLastName,
    childFormData,
    parentId,
    isIncomplete = false
  ) {
    //TODO: Add rule to check if childFirstName and childLastName are non-null
    const newChildRef = this.firestore
      .collection("parents")
      .doc(parentId)
      .collection("Children")
      .doc();

    const metaData = {
      //Assume that the parent completed the entire application
      applicationStatus: isIncomplete ? "Incomplete" : "Pending",
      dateSubmitted: getFormattedDate(
        firebaseApp.firestore.Timestamp.now().toDate()
      ),
      firstName: childFirstName,
      lastName: childLastName,
      childDocRefId: newChildRef.id,
    };

    await newChildRef.set({
      metaData: metaData,
      formData: childFormData,
    });
  }

  async updateChildForm(
    childFirstName,
    childLastName,
    childFormData,
    parentId,
    childApplicationId,
    isIncomplete = false
  ) {
    const childRef = this.firestore
      .collection("parents")
      .doc(parentId)
      .collection("Children")
      .doc(childApplicationId);

    await childRef.update({
      "metaData.dateSubmitted": getFormattedDate(
        firebaseApp.firestore.Timestamp.now().toDate()
      ),
      "metaData.firstName": childFirstName,
      "metaData.lastName": childLastName,
      "metaData.applicationStatus": isIncomplete ? "Incomplete" : "Pending",
      formData: childFormData,
    });
  }

  async changeChildApplicationStatus(
    parentId,
    childApplicationId,
    newApplicationStatus
  ) {
    const childRef = this.firestore
      .collection("parents")
      .doc(parentId)
      .collection("Children")
      .doc(childApplicationId);

    await childRef.update({
      "metaData.dateSubmitted": getFormattedDate(
        firebaseApp.firestore.Timestamp.now().toDate()
      ),
      "metaData.applicationStatus": newApplicationStatus,
    });
  }

  async deleteApplication(parentId, childApplicationId) {
    await this.firestore
      .collection("parents")
      .doc(parentId)
      .collection("Children")
      .doc(childApplicationId)
      .delete();
  }

  async getMetaDataForAllChildren(parentId) {
    const allChildren = this.firestore
      .collection("parents")
      .doc(parentId)
      .collection("Children")
      .get();
    return allChildren;
  }

  async getAllParents() {
    const allParents = this.firestore.collection("parents").get();
    return allParents;
  }

  async testChildrenCollectionRule() {
    await this.firestore
      .collection("parents")
      .doc("QOj4Yi1JlOXblMUvxttpEvkp0iA2")
      .collection("ShreyAmin")
      .doc("ShreyAminFormData")
      .set({
        securityIssue: "yes",
      });
  }

  resetPassword(emailAddress) {
    return this.auth.sendPasswordResetEmail(emailAddress);
  }

  logout() {
    return this.auth.signOut();
  }

  authChange(callBack) {
    return this.auth.onAuthStateChanged(callBack);
  }
}

export default new Firebase();
