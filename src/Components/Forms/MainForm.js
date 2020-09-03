import React, { useState, useContext } from "react";
import { DashboardDispatchContext } from "../../Context/DashboardDispatchContext";
import { useHistory } from "react-router-dom";

import SampleForm from "./SampleForm";
import SampleForm2 from "./SampleForm2";
import Page9 from "./Page9";
import Page10 from "./Page10";

const MainForm = () => {
  const dashboardDispatch = useContext(DashboardDispatchContext);
  const history = useHistory();

  const totalNumberOfForms = 16;
  const [formStates, setFormStates] = useState({
    step: 9,
    newApplicationDashboardData: {},
  });

  const nextStep = () => {
    setFormStates((prevState) => {
      return {
        ...prevState,
        step:
          prevState.step < totalNumberOfForms
            ? prevState.step + 1
            : prevState.step,
      };
    });
  };

  const prevStep = () => {
    setFormStates((prevState) => {
      return {
        ...prevState,
        step: prevState.step > 1 ? prevState.step - 1 : prevState.step,
      };
    });
  };

  const renderForm = () => {
    switch (formStates.step) {
      case 9:
        return (
          <Page9
            nextStep={nextStep}
            prevStep={prevStep}
            setFormStates={setFormStates}
          />
        );
      case 2:
        return (
          <SampleForm2
            nextStep={nextStep}
            prevStep={prevStep}
            setFormStates={setFormStates}
            formStates={formStates}
          />
        );
      case 3:
        return (
          <>
            <h1>Your form has been submitted.</h1>
            <h2>Redirecting...</h2>
            {JSON.stringify(formStates)}
          </>
        );
      default:
        return <h1>Default Page</h1>;
    }
  };

  return renderForm();
};

export default MainForm;
