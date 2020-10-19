import React from "react";
import { Table, Button } from "semantic-ui-react";
import ParentApplicationEntry from "./ParentApplicationEntry";
import { NavLink } from "react-router-dom";

const ParentApplicationEntries = ({allParents}) => {

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
            <Table.HeaderCell>
              Parent Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              Applications
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allParents &&
            allParents.map((parent) => (
              <ParentApplicationEntry key={parent.uid} parent={parent} />
            ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default ParentApplicationEntries;
