import React, { useState, useEffect } from "react";

// import SampleForm2 from "./SampleForm2";
// import SampleFormPage1 from "./SampleFormPage1";
// import SampleFormPage2 from "./SampleFormPage2";
import SampleSubmitForm from "./SampleSubmitForm";

import Page5 from "./Page5";
import Page6 from "./Page6";
import ConfirmationPopup from "../ConfirmationPopup";
import { useHistory } from "react-router";
import { SegmentGroup, Segment } from "semantic-ui-react";

const MainForm = () => {
  const totalNumberOfForms = 16;
  const [formStates, setFormStates] = useState({
    step: 1,
    newApplicationDashboardData: {},
  });
  const [cancelPopupOpen, setCancelPopupOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("step")) {
      setFormStates((prevState) => {
        return {
          ...prevState,
          step: Number.parseInt(localStorage.getItem("step")),
        };
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("step", formStates.step);
  }, [formStates.step]);

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

  const cancelApplication = () => {
    setCancelPopupOpen(false);
    history.goBack();
    setTimeout(() => {
      localStorage.clear();
    }, 1000);
  };

  const dontCancelApplication = () => {
    setCancelPopupOpen(false);
  };

  const renderForm = () => {
    switch (formStates.step) {
      case 5:
        return (
          <Page5
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
          />
        );
      case 6:
        return (
          <Page6
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            cancelApplication={cancelApplication}
            setCancel={setCancelPopupOpen}
          />
        );
      case 16:
        // return <SampleSubmitForm formStates={formStates} />;
        return (
          <SegmentGroup>
            {Object.entries(formStates).map(([k, v], index) => (
              <Segment key={index}>
                <h2>
                  {k} {`->`} {JSON.stringify(v, null, 2)}
                </h2>
              </Segment>
            ))}
          </SegmentGroup>
        );
      default:
        return <h1>Page: {formStates.step}</h1>;
    }
  };
  return (
    <>
      {renderForm()}
      {cancelPopupOpen && (
        <ConfirmationPopup
          headerMessage="Cancel Application?"
          bodyMessage="Are you sure you want to cancel the application?"
          yesAction={cancelApplication}
          noAction={dontCancelApplication}
          isOpen={cancelPopupOpen}
        />
      )}
    </>
  );
};

export default MainForm;
