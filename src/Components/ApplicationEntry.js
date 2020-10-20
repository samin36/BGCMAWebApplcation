import React, { useContext, useState } from "react";
import { Table, Button, Icon, Label, Modal, Form, Radio, Header } from "semantic-ui-react";
import { DashboardDispatchContext } from "../Context/DashboardDispatchContext";
import firebase from "../Firebase/firebase";
import useFirebaseUser from "../CustomHooks/useFirebaseUser";
import ConfirmationPopup from "../Components/ConfirmationPopup";
import CustomModal from "../Components/CustomModal";
import { useHistory } from "react-router-dom";

const ApplicationEntry = ({ child }) => {
  const dashboardDispatch = useContext(DashboardDispatchContext);
  const history = useHistory();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [applicationStatusChangeError, setApplicationStatusChangeError] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(child.applicationStatus);
  const [shownApplicationStatusModal, setShowApplicationStatusModal] = useState(false);

  const user = useFirebaseUser();

  const colorMap = {
    Approved: "green",
    Incomplete: "red",
    Pending: "orange",
  };

  const iconMap = {
    Approved: "checkmark",
    Incomplete: "attention",
    Pending: "clock",
  };

  const deleteApplication = async () => {
    const parentId = child.parentUid;
    try {
      await firebase.deleteApplication(parentId, child.id);
      sessionStorage.removeItem(child.id);
      dashboardDispatch({ type: "DELETE", id: child.id });
    } catch (err) {
      setDeleteError(err.message);
    }
  };

  const handleViewEdit = () => {
    if (child.action === "Edit") {
      history.push({
        pathname: "/editapplication",
        state: {
          childApplicationId: child.id,
        },
      });
    } else if (child.action === "View") {
      history.push({
        pathname: "/viewapplication",
        state: {
          childApplicationId: child.id,
        },
      });
    }
  };

  const updateApplicationStatus = async () => {
    const parentId = child.parentUid;
    try {
      await firebase.changeChildApplicationStatus(parentId, child.id, applicationStatus);
      setShowApplicationStatusModal(false);
      window.location.reload();
    } catch (err) {
      setApplicationStatusChangeError(err);
    }
  }

  return (
    <>
      <Table.Row>
        <Table.Cell>{child.name}</Table.Cell>
        <Table.Cell>
          <Button
            circular
            content={child.action}
            color="blue"
            onClick={handleViewEdit}
          />
          <Icon
            size="large"
            name="trash alternate"
            disabled={child.action !== "Edit" && (!user || !user.admin)}
            onClick={() => setConfirmDelete(true)}
            style={{ cursor: `${(child.action === "Edit" || (user && user.admin === true)) && "pointer"}` }}
          />
        </Table.Cell>
        <Table.Cell>{child.date}</Table.Cell>
        <Table.Cell>
          <Label circular color={colorMap[child.applicationStatus]} size="big">
            <Icon name={iconMap[child.applicationStatus]} />
            {child.applicationStatus}
          </Label>
          {(user && user.admin === true ) ? 
          <Icon
            size="large"
            name="edit"
            onClick={() => setShowApplicationStatusModal(true)}
            style={{ cursor: "pointer", marginTop: '-.25em' }}
          />
          : null}
        </Table.Cell>
      </Table.Row>
      <ConfirmationPopup
        headerMessage="Delete Application?"
        bodyMessage="Are you sure you want to delete the application? The action cannot be undone"
        yesAction={deleteApplication}
        noAction={() => setConfirmDelete(false)}
        isOpen={confirmDelete}
      />
      {deleteError && (
        <CustomModal
          bodyMessage={deleteError}
          isError={true}
          okAction={() => setDeleteError(null)}
        />
      )}
      {applicationStatusChangeError && (
        <CustomModal
          bodyMessage={applicationStatusChangeError}
          isError={true}
          okAction={() => setApplicationStatusChangeError(null)}
        />
      )}
      <Modal open={shownApplicationStatusModal} centered >
      <Modal.Header>
        <Header as="h1" content="Update Application Status" textAlign="center" />
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Radio label="Approved" name="radioGroup" value="Approved" checked={applicationStatus==="Approved"}
            onChange={() => setApplicationStatus("Approved")}/>
          </Form.Field>
          <Form.Field>
          <Radio label="Pending" name="radioGroup" value="Pending" checked={applicationStatus==="Pending"}
            onChange={() => setApplicationStatus("Pending")}/>
          </Form.Field>
          <Form.Field>
          <Radio label="Incomplete" name="radioGroup" value="Incomplete" checked={applicationStatus==="Incomplete"}
            onChange={() => setApplicationStatus("Incomplete")}/>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={() => updateApplicationStatus()} >
          Update
        </Button>
        <Button negative onClick={() => setShowApplicationStatusModal(false)}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
    </>
  );
};

export default ApplicationEntry;
