import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { FirebaseAuthContext } from "../Context/FirebaseAuthContext";

export const ProtectedRoute = ({
  isWelcomeSignUpOrLogin,
  component: Component,
  ...rest
}) => {
  const user = useContext(FirebaseAuthContext);

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
