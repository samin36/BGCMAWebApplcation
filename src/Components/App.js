import React, { useEffect, useState } from "react";
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

const App = () => {
  const [dashboardState, dashboardDispatch] = useDashboardReducer(userdata);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("isSessionActive")) {
      console.log("doesn't exist");
      localStorage.clear();
      sessionStorage.setItem("isSessionActive", "true");
    }
  }, []);

  return (
    <DashboardDispatchContext.Provider value={dashboardDispatch}>
      <DashboardStateContext.Provider value={dashboardState}>
        <Router>
          {isLoggedIn && <NavBarDesktop />}
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/newapplication" component={NewApplication} />
          </Switch>
        </Router>
      </DashboardStateContext.Provider>
    </DashboardDispatchContext.Provider>
  );
};

export default App;
