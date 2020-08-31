import React, { useState, useEffect } from "react";

// import SampleForm2 from "./SampleForm2";
// import SampleFormPage1 from "./SampleFormPage1";
// import SampleFormPage2 from "./SampleFormPage2";
import SampleSubmitForm from "./SampleSubmitForm";

import Page5 from "./Page5";
import Page6 from "./Page6";

const MainForm = () => {
  const totalNumberOfForms = 16;
  const [formStates, setFormStates] = useState({
    step: 1,
    newApplicationDashboardData: {},
  });

  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);

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
      case 1:
        return (
          // <SampleFormPage1
          //   nextStep={nextStep}
          //   setFormStates={setFormStates}
          //   formStates={formStates}
          // />
          <Page5
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          // <SampleFormPage2
          //   nextStep={nextStep}
          //   prevStep={prevStep}
          //   formStates={formStates}
          //   setFormStates={setFormStates}
          // />
          <Page6
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
          />
        );
      case 3:
        // return <SampleSubmitForm formStates={formStates} />;
        return <h1>{JSON.stringify(formStates, null, 2)}</h1>;
      default:
        return <h1>Default Page</h1>;
    }
  };

  return renderForm();
};

export default MainForm;
