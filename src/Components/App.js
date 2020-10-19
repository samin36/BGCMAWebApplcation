import React, { useEffect } from "react";
import NavBarDesktop from "./NavBarDesktop";
import Dashboard from "./Dashboard";
import NewApplication from "./NewApplication";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DashboardDispatchContext } from "../Context/DashboardDispatchContext";
import { DashboardStateContext } from "../Context/DashboardStateContext";
import useDashboardReducer from "../CustomHooks/useDashboardReducer";
import Welcome from "./Welcome";
import SignUp from "./ParentLoginLogout/SignUp";
import Login from "./ParentLoginLogout/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import PageNotFound from "./PageNotFound";
// import useFirebaseUser from "../CustomHooks/useFirebaseUser";
import firebase from "../Firebase/firebase";
import EditApplication from "./EditApplication";
import ViewApplication from "./ViewApplication";
import AdminDashboard from "./AdminDashboard";

const App = () => {
  const [dashboardState, dashboardDispatch] = useDashboardReducer(null);

  useEffect(() => {
    const unsubscribe = firebase.authChange((currUser) => {
      if (currUser) {
        const user = JSON.parse(JSON.stringify(currUser));
        if (user && user.email.endsWith("bgcma.org") && user.emailVerified) {
          const isAdmin = firebase.checkAdminStatus();
          if (isAdmin) {
            user.admin = true;
          }
        }
        sessionStorage.setItem("authenticatedUser", JSON.stringify(user));
      } else {
        sessionStorage.removeItem("authenticatedUser");
      }
    });
    return () => {
      unsubscribe();
      sessionStorage.clear();
    };
  }, []);
  // firebase.authChange((currUser) => {
  //   if (currUser) {
  //     // setUser(currUser);
  //     sessionStorage.setItem("authenticatedUser", JSON.stringify(currUser));
  //   } else {
  //     sessionStorage.removeItem("authenticatedUser");
  //   }
  // });
  // const user = useFirebaseUser();
  return (
    <DashboardDispatchContext.Provider value={dashboardDispatch}>
      <DashboardStateContext.Provider value={dashboardState}>
        <Router>
          <NavBarDesktop />
          <Switch>
            <ProtectedRoute
              exact
              path="/dashboard"
              component={Dashboard}
              isWelcomeSignUpOrLogin={false}
            />
            <ProtectedRoute
              exact
              path="/admindashboard"
              component={AdminDashboard}
              isWelcomeSignUpOrLogin={false}
            />
            <ProtectedRoute
              exact
              path="/newapplication"
              component={NewApplication}
              isWelcomeSignUpOrLogin={false}
            />
            <ProtectedRoute
              exact
              path="/editapplication"
              component={EditApplication}
              isWelcomeSignUpOrLogin={false}
            />
            <ProtectedRoute
              exact
              path="/viewapplication"
              component={ViewApplication}
              isWelcomeSignUpOrLogin={false}
            />
            <ProtectedRoute
              exact
              path="/signup"
              component={SignUp}
              isWelcomeSignUpOrLogin={true}
            />
            <ProtectedRoute
              exact
              path="/login"
              component={Login}
              isWelcomeSignUpOrLogin={true}
            />
            <ProtectedRoute
              exact
              path="/"
              component={Welcome}
              isWelcomeSignUpOrLogin={true}
            />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      </DashboardStateContext.Provider>
    </DashboardDispatchContext.Provider>
  );
};

export default App;
