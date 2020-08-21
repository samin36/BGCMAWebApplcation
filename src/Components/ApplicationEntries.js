import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { Table, Icon, Button } from "semantic-ui-react";
import ApplicationEntry from "./ApplicationEntry";
import { UserDataContext } from "../Context/UserDataContext";
import NewApplication from "./Forms/NewApplication";

const dataReducer = (state, action) => {
  switch (action.type) {
    case "SORT":
      if (state.column === action.column) {
        // state.setUserData((prevData) => prevData.reverse());
        return {
          ...state,
          data: state.data.reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      } else {
        // state.setUserData((prevData) => _.sortBy(prevData, [action.column]));
        return {
          ...state,
          column: action.column,
          data: _.sortBy(state.data, [action.column]),
          direction: "ascending",
        };
      }
    case "DELETE":
      return {
        ...state,
        data: state.data.filter((application) => application.id !== action.id),
      };
    default:
      throw new Error("data reducer error");
  }
};

const ApplicationEntries = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const [showForm, setShowForm] = useState(false);
  const [state, dispatch] = React.useReducer(dataReducer, {
    column: null,
    direction: null,
    data: userData,
  });
  useEffect(() => {
    setUserData(state.data);
  }, [state.data, setUserData]);

  const createNewApplication = () => {
    console.log("here");
    setShowForm(true);
  };

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
              <ApplicationEntry key={index} child={child} dispatch={dispatch} />
            ))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row textAlign="center">
            <Table.HeaderCell colSpan="4">
              <Button
                color="facebook"
                circular
                onClick={() => createNewApplication()}
              >
                New Application
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      {showForm && <NewApplication />}
    </>
  );
};

export default ApplicationEntries;
