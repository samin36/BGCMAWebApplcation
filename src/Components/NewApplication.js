import React from "react";
import { Container, Header, Button } from "semantic-ui-react";
import MainForm from "./Forms/MainForm";

const NewApplication = () => {
  return (
    <Container
      fluid
      style={{ background: "#EFF2F7", marginBottom: "0em" }}
      textAlign="center"
    >
      <Header
        textAlign="center"
        as="h1"
        style={{ color: "#47525E", fontSize: "4em" }}
        dividing
      >
        New Application
      </Header>
      <MainForm />
    </Container>
  );
};

export default NewApplication;
