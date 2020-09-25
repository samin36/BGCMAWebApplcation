import React from "react";
import { Route, Redirect } from "react-router-dom";

import useFirebaseUser from "../CustomHooks/useFirebaseUser";
export const ProtectedRoute = ({
  isWelcomeSignUpOrLogin,
  component: Component,
  ...rest
}) => {
  const user = useFirebaseUser();

  return (
    <Route
      {...rest}
      render={(props) => {
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
          return user !== null ? (
            <Redirect to="/dashboard" />
          ) : (
            <Component {...props} />
          );
        } else {
          return user !== null ? <Component {...props} /> : <Redirect to="/" />;
        }
      }}
    />
  );
};
