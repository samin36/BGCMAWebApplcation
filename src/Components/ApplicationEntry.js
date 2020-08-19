import React from "react";
import { Table, Button, Icon, Label } from "semantic-ui-react";

const ApplicationEntry = ({ child }) => {
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

  return (
    <Table.Row>
      <Table.Cell>{child.name}</Table.Cell>
      <Table.Cell>
        <Button circular content={child.action} color="blue" />
        <Icon
          size="large"
          name="trash alternate"
          disabled={child.action === "View"}
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
