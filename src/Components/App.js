import React, { useEffect } from "react";
import NavBarDesktop from "./NavBarDesktop";
import Dashboard from "./Dashboard";
import NewApplication from "./NewApplication";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DashboardDispatchContext } from "../Context/DashboardDispatchContext";
import { DashboardStateContext } from "../Context/DashboardStateContext";
import useDashboardReducer from "../CustomHooks/useDashboardReducer";
import userdata from "../UserData/sampledata";
import Welcome from "./Welcome";
import SignUp from "./ParentLoginLogout/SignUp";
import Login from "./ParentLoginLogout/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import PageNotFound from "./PageNotFound";

const App = () => {
  const [dashboardState, dashboardDispatch] = useDashboardReducer(userdata);

  useEffect(() => {
    if (!sessionStorage.getItem("isSessionActive")) {
      localStorage.clear();
      sessionStorage.setItem("isSessionActive", "true");
    }
  }, []);

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
              path="/newapplication"
              component={NewApplication}
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
