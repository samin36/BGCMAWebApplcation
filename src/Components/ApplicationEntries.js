import _ from "lodash";
import React, { useContext } from "react";
import { Table, Icon, Button } from "semantic-ui-react";
import ApplicationEntry from "./ApplicationEntry";
import { UserDataContext } from "../Context/UserDataContext";

const sortReducer = (state, action) => {
  switch (action.type) {
    case "SORT":
      if (state.column === action.column) {
        state.setUserData((prevData) => prevData.reverse());
        return {
          ...state,
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      } else {
        state.setUserData((prevData) => _.sortBy(prevData, [action.column]));
        return {
          ...state,
          column: action.column,
          // data: _.sortBy(state.data, [action.column]),
          direction: "ascending",
        };
      }
    default:
      throw new Error("sort reducer error");
  }
};

const ApplicationEntries = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const [state, dispatch] = React.useReducer(sortReducer, {
    column: null,
    direction: null,
    setUserData,
  });

  return (
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
            onClick={() => dispatch({ type: "SORT", column: "name" })}
          >
            Child Name
            <Icon name="sort" />
          </Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
          <Table.HeaderCell
            onClick={() => dispatch({ type: "SORT", column: "date" })}
          >
            Date
            <Icon name="sort" />
          </Table.HeaderCell>
          <Table.HeaderCell>Application Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {userData &&
          userData.map((child, index) => (
            <ApplicationEntry key={index} child={child} />
          ))}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row textAlign="center">
          <Table.HeaderCell colSpan="4">
            <Button color="facebook" circular>
              New Application
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default ApplicationEntries;
