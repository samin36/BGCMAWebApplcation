import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

const ConfirmationPopup = ({
  headerMessage,
  bodyMessage,
  yesAction,
  noAction,
  isOpen,
}) => {
  return (
    <Modal onClose={noAction} open={isOpen} size="small">
      <Modal.Header as="h2">{headerMessage}</Modal.Header>
      <Modal.Content>
        <h1>{bodyMessage}</h1>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => noAction()}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" onClick={() => yesAction()}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmationPopup;
