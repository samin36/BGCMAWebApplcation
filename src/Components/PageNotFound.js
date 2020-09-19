import React, { useEffect, useState } from "react";
import { Header } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

const PageNotFound = () => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRedirect(true);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return !redirect ? (
    <Header
      as="h1"
      textAlign="center"
      style={{ fontSize: "3em", padding: "1em" }}
    >
      404 NOT FOUND
      <Header.Subheader>Redirecting...</Header.Subheader>
    </Header>
  ) : (
    <Redirect to="/" />
  );
};

export default PageNotFound;
