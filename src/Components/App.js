import React, { useState } from "react";
import NavBarDesktop from "./NavBarDesktop";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserDataContext } from "../Context/UserDataContext";
import userdata from "../UserData/sampledata";

const App = () => {
  const [userData, setUserData] = useState(userdata);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      <Router>
        <NavBarDesktop />
        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
      </Router>
    </UserDataContext.Provider>
  );
};

export default App;
