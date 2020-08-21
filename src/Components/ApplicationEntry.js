import React, { useContext } from "react";
import { Table, Button, Icon, Label } from "semantic-ui-react";
import { DashboardDispatchContext } from "../Context/DashboardDispatchContext";

const ApplicationEntry = ({ child }) => {
  const dashboardDispatch = useContext(DashboardDispatchContext);
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

  const deleteApplication = () => {
    dashboardDispatch({ type: "DELETE", id: child.id });
  };

  return (
    <Table.Row>
      <Table.Cell>{child.name}</Table.Cell>
      <Table.Cell>
        <Button circular content={child.action} color="blue" />
        <Icon
          size="large"
          name="trash alternate"
          disabled={child.action === "View"}
          onClick={() => deleteApplication()}
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
  );
};

export default ApplicationEntry;
