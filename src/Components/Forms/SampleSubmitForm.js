import React, { useState, useEffect, useContext } from "react";
import { DashboardDispatchContext } from "../../Context/DashboardDispatchContext";
import { DashboardStateContext } from "../../Context/DashboardStateContext";
import { useHistory } from "react-router-dom";
import { Header, Modal, Icon } from "semantic-ui-react";

const SampleSubmitForm = ({ formStates }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dashboardDispatch = useContext(DashboardDispatchContext);
  const dashboardState = useContext(DashboardStateContext);
  const history = useHistory();

  useEffect(() => {
    if (isSubmitting) {
      setIsSubmitting(false);
      history.goBack();
    }
    return () => {
      console.log(localStorage.getItem("page1"));
      console.log(localStorage.getItem("page2"));
      localStorage.clear();
      console.log(localStorage.getItem("page1"));
      console.log(localStorage.getItem("page2"));
    };
  }, [dashboardState]);

  useEffect(() => {
    const newApplication = {
      ...formStates,
    };
    delete newApplication.step;
    dashboardDispatch({ type: "NEW_APPLICATIONS", newApplication });
    setIsSubmitting(true);
  }, []);

  return (
    <>
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
      {!isSubmitting && (
        <Header as="h1">
          Your form has been submitted.
          <p>Redirecting...</p>
        </Header>
      )}
    </>
  );
};

export default SampleSubmitForm;
