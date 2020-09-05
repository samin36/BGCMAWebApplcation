import React, { useState, useEffect, useContext } from "react";
import { DashboardDispatchContext } from "../../Context/DashboardDispatchContext";
import { useHistory } from "react-router-dom";

import Page5 from "./Page5";
import Page6 from "./Page6";
import Page7 from "./Page7";
import Page8 from "./Page8";
import Page9 from "./Page9";
import Page10 from "./Page10";
import Page11 from "./Page11";
import Page12 from "./Page12";
import Page13 from "./Page13";
import Page14 from "./Page14";
import SampleSubmitForm from "./SampleSubmitForm";

import ConfirmationPopup from "../ConfirmationPopup";
const MainForm = () => {
  const totalNumberOfForms = 16;
  const [formStates, setFormStates] = useState({
    step: 5,
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
            setCancel={setCancelPopupOpen}
          />
        );
      case 7:
        return (
          <Page7
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
          />
        );
      case 8:
        return (
          <Page8
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
          />
        );
      case 9:
        return (
          <Page9
            nextStep={nextStep}
            prevStep={prevStep}
            setFormStates={setFormStates}
            setCancel={setCancelPopupOpen}
          />
        );
      case 10:
        return (
          <Page10
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
          />
        );
      case 11:
        return (
          <Page11
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
          />
        );
      case 12:
        return (
          <Page12
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
          />
        );
      case 13:
        return (
          <Page13
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            cancelApplication={cancelApplication}
            setCancel={setCancelPopupOpen}
          />
        );
      case 14:
        return (
          <Page14
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
          />
        );
      case 15:
        return <SampleSubmitForm formStates={formStates} />;
      default:
        return <h1>Page: {formStates.step}</h1>;
    }
  };
  return (
    <>
      <h3>Page: {formStates.step}</h3>
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
