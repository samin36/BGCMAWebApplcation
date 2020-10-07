import React from "react";
import { Container, Header } from "semantic-ui-react";
import MainForm from "./Forms/MainForm";
import { useLocation } from "react-router-dom";

const ViewApplication = () => {
  const location = useLocation();
  const childApplicationId = location.state.childApplicationId;

  return (
    <Container
      fluid
      style={{
        background: "#EFF2F7",
        marginBottom: "0em",
        borderBottom: "1px solid #EFF2F7",
      }}
      textAlign="center"
    >
      <Header
        textAlign="center"
        as="h1"
        style={{ color: "#47525E", fontSize: "4em" }}
        dividing
      >
        Your Submitted Application
      </Header>
      <MainForm childApplicationId={childApplicationId} isView={true} />
    </Container>
  );
};

export default ViewApplication;
