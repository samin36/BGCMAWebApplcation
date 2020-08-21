import React from "react";
import { Container, Header } from "semantic-ui-react";
import SampleForm from "./Forms/SampleForm";

const NewApplication = () => {
  return (
    <Container fluid style={{ background: "#EFF2F7" }} textAlign="center">
      <Header
        textAlign="center"
        as="h1"
        style={{ color: "#47525E", fontSize: "4em" }}
        dividing
      >
        New Application
      </Header>
      <SampleForm />
    </Container>
  );
};

export default NewApplication;
