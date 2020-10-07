import React, { useContext, useState } from "react";
import { Table, Button, Icon, Label } from "semantic-ui-react";
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
    const parentId = user.uid;
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
            disabled={child.action !== "Edit"}
            onClick={() => setConfirmDelete(true)}
            style={{ cursor: `${child.action === "Edit" && "pointer"}` }}
          />
        </Table.Cell>
        <Table.Cell>{child.date}</Table.Cell>
        <Table.Cell>
          <Label circular color={colorMap[child.applicationStatus]} size="big">
            <Icon name={iconMap[child.applicationStatus]} />
            {child.applicationStatus}
          </Label>
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
    </>
  );
};

export default ApplicationEntry;
