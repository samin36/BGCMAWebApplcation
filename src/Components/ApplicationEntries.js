import React, { useContext } from "react";
import { Table, Icon, Button } from "semantic-ui-react";
import ApplicationEntry from "./ApplicationEntry";
import { DashboardStateContext } from "../Context/DashboardStateContext";
import { DashboardDispatchContext } from "../Context/DashboardDispatchContext";
import { NavLink } from "react-router-dom";
import useFirebaseUser from '../CustomHooks/useFirebaseUser';

const ApplicationEntries = () => {
  const dashboardState = useContext(DashboardStateContext);
  const dashboardDispatch = useContext(DashboardDispatchContext);
  const user = useFirebaseUser();
  return (
    <>
      <Table
        striped
        size="large"
        padded="very"
        singleLine
        selectable
        sortable
        textAlign="center"
        color="blue"
        style={{
          marginTop: "-0.8em",
          background: "#F8F8FF",
          fontSize: "1.25em",
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              onClick={() =>
                dashboardDispatch({ type: "SORT", column: "name" })
              }
            >
              Child Name
              <Icon name="sort" />
            </Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell
              onClick={() =>
                dashboardDispatch({ type: "SORT", column: "date" })
              }
            >
              Date
              <Icon name="sort" />
            </Table.HeaderCell>
            <Table.HeaderCell>Application Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dashboardState.data &&
            dashboardState.data.map((child) => (
              <ApplicationEntry key={child.id} child={child} />
            ))}
        </Table.Body>
        {(!user || user.admin === false) && (
        <Table.Footer fullWidth>
          <Table.Row textAlign="center">
            <Table.HeaderCell colSpan="4">
              <Button
                color="facebook"
                circular
                as={NavLink}
                to="/newapplication"
                disabled={user && user.admin === true}
              >
                New Application
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>)}
      </Table>
    </>
  );
};

export default ApplicationEntries;
