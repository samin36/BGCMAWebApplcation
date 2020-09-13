import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({
  isWelcomeSignUpOrLogin,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const isAuthenticated = sessionStorage.getItem("isAuthenticated");
        // if (isAuthenticated) {
        //   return isWelcomeSignUpOrLogin ? (
        //     <Redirect to="/dashboard" />
        //   ) : (
        //     <Component {...props} />
        //   );
        // } else {
        //   return <Redirect to="/" />;
        // }
        if (isWelcomeSignUpOrLogin) {
          return isAuthenticated ? (
            <Redirect to="/dashboard" />
          ) : (
            <Component {...props} />
          );
        } else {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          );
        }
      }}
    />
  );
};
