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
        console.log(
          "isWelcomeSignUpOrLogin",
          isWelcomeSignUpOrLogin,
          " and user begin null is: ",
          user === null
        );
        if (isWelcomeSignUpOrLogin) {
          return user !== null ? (
            <Redirect to="/dashboard" />
          ) : (
            <Component {...props} />
          );
        } else {
          console.log("not null and not isWelcomeSignUpOrLogin");
          console.log(props);
          return user !== null ? <Component {...props} /> : <Redirect to="/" />;
        }
      }}
    />
  );
};
