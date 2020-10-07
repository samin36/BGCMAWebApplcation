import React, { useState, useEffect, useContext } from "react";
import { DashboardDispatchContext } from "../../Context/DashboardDispatchContext";
import { DashboardStateContext } from "../../Context/DashboardStateContext";
import { Redirect } from "react-router-dom";
import {
  Header,
  Modal,
  Icon,
  SegmentGroup,
  Segment,
  List,
} from "semantic-ui-react";

import firebase from "../../Firebase/firebase";
import useFirebaseUser from "../../CustomHooks/useFirebaseUser";

const SampleSubmitForm = ({ formStates }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // const dashboardDispatch = useContext(DashboardDispatchContext);
  // const dashboardState = useContext(DashboardStateContext);
  // const history = useHistory();

  const user = useFirebaseUser();

  // useEffect(() => {
  //   if (isSubmitting) {
  //     setIsSubmitting(false);
  //     history.goBack();
  //   }
  //   return () => {
  //     localStorage.clear();
  //   };
  // }, [dashboardState]);

  // useEffect(() => {
  //   const newApplication = {
  //     ...formStates,
  //   };
  //   delete newApplication.step;
  //   const timeoutId = setTimeout(() => {
  //     dashboardDispatch({ type: "NEW_APPLICATIONS", newApplication });
  //   }, 3000);
  //   setIsSubmitting(true);
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

  useEffect(() => {
    setIsSubmitting(true);
    const submitFormData = async () => {
      const parentId = user.uid;
      const childFormData = { ...formStates };
      delete childFormData.step;
      const childFirstName = childFormData.page6.childFirstName;
      const childLastName = childFormData.page6.childLastName;
      if (childFormData.update) {
        const childApplicationId = childFormData.update;
        delete childFormData.update;
        try {
          await firebase.updateChildForm(
            childFirstName,
            childLastName,
            childFormData,
            parentId,
            childApplicationId
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
            parentId
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
      <Modal open={isSubmitting} centered dimmer size="small">
        <Modal.Header>Submitting your form</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header as="h1" textAlign="center">
              Please wait until your form is submitted
              <br />
              <Header.Content>
                <Icon
                  name="spinner"
                  loading={true}
                  size="large"
                  color="green"
                />
              </Header.Content>
            </Header>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    ) : (
      <Header as="h1">
        Your form has been submitted.
        <Header.Subheader>Redirecting...</Header.Subheader>
      </Header>
      // {/* <SegmentGroup>
      //   {Object.entries(formStates).map(([k, v], index) =>
      //     k !== "step" && k !== "newApplicationDashboardData" ? (
      //       <Segment key={index}>
      //         <h2 style={{ textDecoration: "underline" }}>
      //           {k.replace(/^page(\d+)$/, "Page $1")}
      //         </h2>
      //         {Object.entries(v).map(([field, fieldValue], index2) => (
      //           <List key={index2} size="big">
      //             <List.Item as="h3">{`${field} -> ${fieldValue}`}</List.Item>
      //           </List>
      //         ))}
      //       </Segment>
      //     ) : null
      //   )}
      // </SegmentGroup> */}
    )
  ) : (
    <Redirect to="/" />
  );
};
export default SampleSubmitForm;
