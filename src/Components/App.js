import React, { useEffect } from "react";
import NavBarDesktop from "./NavBarDesktop";
import Dashboard from "./Dashboard";
import NewApplication from "./NewApplication";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DashboardDispatchContext } from "../Context/DashboardDispatchContext";
import { DashboardStateContext } from "../Context/DashboardStateContext";
import useDashboardReducer from "../CustomHooks/useDashboardReducer";
import userdata from "../UserData/sampledata";

const App = () => {
  const [dashboardState, dashboardDispatch] = useDashboardReducer(userdata);

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
          <NavBarDesktop />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/newapplication" component={NewApplication} />
          </Switch>
        </Router>
      </DashboardStateContext.Provider>
    </DashboardDispatchContext.Provider>
  );
};

export default App;
