import React from "react";
import { Table, Button } from "semantic-ui-react";
import { useHistory } from 'react-router-dom';
const ParentApplicationEntry = ({ parent }) => {
  const history = useHistory();

  const handleParentApplicationsView = () => {
    history.push({
      pathname: "/dashboard",
      state: {
        parentUid: parent.uid,
      },
    });
  }

  return (
    <>
      <Table.Row>
        <Table.Cell>{parent.name}</Table.Cell>
        <Table.Cell>
          <Button
            circular
            content="View"
            color="blue"
            onClick={handleParentApplicationsView}
          />
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default ParentApplicationEntry;
