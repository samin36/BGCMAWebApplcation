import * as firebaseApp from "firebase/app";

import firebaseConfig from "./config";

import { getFormattedDate } from "./firebaseutils";
import _ from "lodash";

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

  async uploadChildForm(
    childFirstName,
    childLastName,
    childFormData,
    parentId
  ) {
    //TODO: Add rule to check if childFirstName and childLastName are non-null
    const newChildRef = this.firestore
      .collection("parents")
      .doc(parentId)
      .collection("Children")
      .doc();

    const metaData = {
      //Assume that the parent completed the entire application
      applicationStatus: _.sample(["Approved", "Pending", "Incomplete"]),
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
    childApplicationId
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
      formData: childFormData,
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

  getMetaDataForAllChildren(parentId) {
    const allChildren = this.firestore
      .collection("parents")
      .doc(parentId)
      .collection("Children")
      .get();
    return allChildren;
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
