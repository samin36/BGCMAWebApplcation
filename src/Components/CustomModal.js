import React from "react";
import { Modal, Icon, Header, Button } from "semantic-ui-react";

const CustomModal = ({
  isInfo,
  isWarning,
  isSuccess,
  isError,
  bodyMessage,
  okAction,
}) => {
  const getHeaderMessage = () => {
    if (isWarning) {
      return "Warning";
    } else if (isInfo) {
      return "Alert";
    } else if (isSuccess) {
      return "Success";
    } else if (isError) {
      return "An error occurred";
    }
  };

  const getIconName = () => {
    if (isWarning) {
      return "warning";
    } else if (isInfo) {
      return "info";
    } else if (isSuccess) {
      return "check";
    } else if (isError) {
      return "x";
    }
  };

  const getIconColor = () => {
    if (isWarning) {
      return "orange";
    } else if (isInfo) {
      return "blue";
    } else if (isSuccess) {
      return "green";
    } else if (isError) {
      return "red";
    }
  };
  const headerMessage = getHeaderMessage();
  const iconName = getIconName();
  const iconColor = getIconColor();
  return (
    <Modal open>
      <Modal.Header>
        <Header as="h1" content={headerMessage} textAlign="center" />
      </Modal.Header>
      <Modal.Content>
        <Header as="p" textAlign="center" icon>
          <Icon
            name={iconName}
            size="massive"
            circular
            color={iconColor}
            inverted
          />
          {bodyMessage}
        </Header>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={() => okAction()}>
          Ok
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CustomModal;
