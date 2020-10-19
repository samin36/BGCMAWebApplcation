import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
} from "semantic-ui-react";

const Welcome = () => {
  return (
    <Container
      fluid
      textAlign="center"
      style={{ background: "#E5E9F2", height: "100vh", padding: "8em 0" }}
    >
      <Container
        textAlign="center"
        style={{ background: "#EFF2F7", padding: "2em" }}
        text
      >
        <Image src="/Images/bgcmalogo.png" size="large" centered />
        <Header image as="h1" style={{ fontSize: "3em" }} textAlign="center">
          Membership Web Application
        </Header>
        <Divider hidden />
        <Grid centered>
          <Grid.Row>
            <Button
              primary
              size="big"
              color="facebook"
              circular
              as={NavLink}
              to="/SignUp"
              style={{ padding: "1em 3em" }}
            >
              Sign Up
            </Button>
          </Grid.Row>
          <Grid.Row>
            <Button
              primary
              size="big"
              color="facebook"
              circular
              as={NavLink}
              to="/Login"
              style={{ padding: "1em 3.5em" }}
            >
              Login
            </Button>
          </Grid.Row>
        </Grid>
      </Container>
    </Container>
  );
};

export default Welcome;
