import React, { useEffect } from "react";
import { Container, Header } from "semantic-ui-react";
import ApplicationEntries from "./ApplicationEntries";

const Dashboard = () => {
  useEffect(() => {
    setTimeout(() => {
      localStorage.clear();
    }, 1000);
  }, []);

  return (
    <Container fluid style={{ background: "#EFF2F7" }} textAlign="center">
      <Header
        textAlign="center"
        as="h1"
        style={{ color: "#47525E", fontSize: "4em" }}
        dividing
      >
        Dashboard
      </Header>
      <ApplicationEntries />
    </Container>
  );
};

export default Dashboard;
