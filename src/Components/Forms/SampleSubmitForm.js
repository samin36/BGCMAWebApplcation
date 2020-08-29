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
      localStorage.clear();
    };
  }, [dashboardState]);

  useEffect(() => {
    const newApplication = {
      ...formStates,
    };
    delete newApplication.step;
    const timeoutId = setTimeout(() => {
      dashboardDispatch({ type: "NEW_APPLICATIONS", newApplication });
    }, 3000);
    setIsSubmitting(true);
    return () => {
      clearTimeout(timeoutId);
    };
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
