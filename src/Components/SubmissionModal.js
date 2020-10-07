import React from "react";
import { Header, Icon, Modal } from "semantic-ui-react";

const SubmissionModal = ({ isSubmitting }) => {
  return (
    <Modal open={isSubmitting} centered dimmer size="small">
      <Modal.Header>Submitting your form</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header as="h1" textAlign="center">
            Please wait until your form is submitted
            <br />
            <Header.Content>
              <Icon name="spinner" loading={true} size="large" color="green" />
            </Header.Content>
          </Header>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default SubmissionModal;
