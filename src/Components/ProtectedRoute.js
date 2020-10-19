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
          if (user !== null) {
            if (user.admin === true) {
              return <Redirect to="/admindashboard" />
            } else {
              return <Redirect to="/dashboard" />
            }
          } else {
            return <Component {...props} />
          }
          // return user !== null ? (
          //   <Redirect to="/dashboard" />
          // ) : (
          //   <Component {...props} />
          // );
        } else {
          return user !== null ? <Component {...props} /> : <Redirect to="/" />;
        }
      }}
    />
  );
};
