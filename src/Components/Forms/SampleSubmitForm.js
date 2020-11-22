import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Header } from "semantic-ui-react";

import firebase from "../../Firebase/firebase";
import useFirebaseUser from "../../CustomHooks/useFirebaseUser";
import SubmissionModal from "../SubmissionModal";

const SampleSubmitForm = ({ formStates, saveClicked }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const user = useFirebaseUser();

  useEffect(() => {
    setIsSubmitting(true);
    const submitFormData = async () => {
      const parentId = user.uid;
      const childFormData = { ...formStates };
      delete childFormData.step;
      const childFirstName = childFormData.page6
        ? childFormData.page6.childFirstName
        : "";
      const childLastName = childFormData.page6
        ? childFormData.page6.childLastName
        : "";
      const isIncomplete = saveClicked;
      if (childFormData.update) {
        const childApplicationId = childFormData.update;
        delete childFormData.update;
        try {
          await firebase.updateChildForm(
            childFirstName,
            childLastName,
            childFormData,
            parentId,
            childApplicationId,
            isIncomplete
          );
          setIsSubmitting(false);
          setTimeout(() => {
            setRedirect(true);
          }, 3000);
        } catch (err) {
          console.log("Error updating form data: ", err);
          setIsSubmitting(false);
        }
      } else {
        try {
          await firebase.uploadChildForm(
            childFirstName,
            childLastName,
            childFormData,
            parentId,
            isIncomplete
          );
          setIsSubmitting(false);
          setTimeout(() => {
            setRedirect(true);
          }, 3000);
        } catch (err) {
          console.log("Error submitting form data: ", err);
          setIsSubmitting(false);
        }
      }
    };
    submitFormData();
  }, []);

  return !redirect ? (
    isSubmitting ? (
      <SubmissionModal isSubmitting={isSubmitting} />
    ) : (
      <Header as="h1">
        Your form has been {saveClicked ? "saved" : "submitted"}.
        <Header.Subheader>Redirecting...</Header.Subheader>
      </Header>
    )
  ) : (
    <Redirect to="/" />
  );
};
export default SampleSubmitForm;
