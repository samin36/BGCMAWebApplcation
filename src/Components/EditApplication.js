import React from "react";
import { Container, Header } from "semantic-ui-react";
import MainForm from "./Forms/MainForm";
import { useLocation } from "react-router-dom";

const EditApplication = () => {
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
        Edit Application
      </Header>
      <MainForm childApplicationId={childApplicationId} isView={false} />
    </Container>
  );
};

export default EditApplication;
