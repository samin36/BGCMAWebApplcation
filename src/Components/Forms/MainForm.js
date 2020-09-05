import React, { useState, useEffect, useContext } from "react";
import { DashboardDispatchContext } from "../../Context/DashboardDispatchContext";
import { useHistory } from "react-router-dom";

import Page5 from "./Page5";
import Page6 from "./Page6";
import Page13 from "./Page13";
import Page14 from "./Page14";
import Page9 from "/Page9";
import Page10 from "./Page10";
import SampleSubmitForm from "./SampleSubmitForm";

import ConfirmationPopup from "../ConfirmationPopup";
import { useHistory } from "react-router";
import { SegmentGroup, Segment } from "semantic-ui-react";

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
      case 1:
        return (
          <Page5
          nextStep={nextStep}
          setFormStates={setFormStates}
          prevStep={prevStep}
          cancelApplication={cancelApplication}
          setCancel={setCancelPopupOpen}
          />
        );
      case 2:
        return (
          <Page6
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            cancelApplication={cancelApplication}
            setCancel={setCancelPopupOpen}
          />
        );
      case 3:
        return (
          <Page9
            nextStep={nextStep}
            prevStep={prevStep}
            setFormStates={setFormStates}
          />
        );
      case 4:
        return (
          <Page10
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
          />
        );
      case 5:
        return (
          <Page13
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            cancelApplication={cancelApplication}
            setCancel={setCancelPopupOpen}
          />
        );
      case 6:
        return (
          <Page14
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            cancelApplication={cancelApplication}
            setCancel={setCancelPopupOpen}
          />
        );
      case 9:
        return <SampleSubmitForm formStates={formStates} />;
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
