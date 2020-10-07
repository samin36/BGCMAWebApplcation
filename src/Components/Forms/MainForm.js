import React, { useState, useEffect } from "react";

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
import SubmissionModal from "../SubmissionModal";
import { Redirect } from "react-router-dom";

const MainForm = ({ childApplicationId, isView }) => {
  const totalNumberOfForms = 16;
  const [formStates, setFormStates] = useState(() => {
    if (childApplicationId) {
      const initialFormData = JSON.parse(
        sessionStorage.getItem(childApplicationId)
      );
      if (initialFormData) {
        return {
          step: 5,
          update: childApplicationId,
          ...initialFormData,
        };
      }
    }
    return {
      step: 5,
    };
  });
  const [saveClicked, setSaveClicked] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [cancelPopupOpen, setCancelPopupOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("formStates")) {
      setFormStates(JSON.parse(localStorage.getItem("formStates")));
    }
  }, []);

  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);

  useEffect(() => {
    // localStorage.setItem("step", formStates.step);
    localStorage.setItem("formStates", JSON.stringify(formStates));
  }, [formStates]);

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
    setRedirect(true);
    setTimeout(() => {
      localStorage.clear();
    }, 1000);
  };

  const dontCancelApplication = () => {
    setCancelPopupOpen(false);
    setRedirect(false);
  };

  const saveAndExitApplication = () => {
    // setIsBeingSaved(true);
    // setTimeout(async () => {
    //   console.log(formStates);
    //   // const parentId = user.uid;
    //   // const childFormData = { ...formStates };
    //   // delete childFormData.step;
    //   // const childFirstName = childFormData.page6
    //   //   ? childFormData.page6.childFirstName
    //   //   : "";
    //   // const childLastName = childFormData.page6
    //   //   ? childFormData.page6.childLastName
    //   //   : "";
    //   // const isIncomplete = true;
    //   // if (childFormData.update) {
    //   //   const childApplicationId = childFormData.update;
    //   //   delete childFormData.update;
    //   //   try {
    //   //     await firebase.updateChildForm(
    //   //       childFirstName,
    //   //       childLastName,
    //   //       childFormData,
    //   //       parentId,
    //   //       childApplicationId,
    //   //       isIncomplete
    //   //     );
    //   //     setTimeout(() => {
    //   //       localStorage.clear();
    //   //     }, 1000);
    //   //     setIsBeingSaved(false);
    //   //     setRedirect(true);
    //   //   } catch (err) {
    //   //     setIsBeingSaved(false);
    //   //   }
    //   // } else {
    //   //   try {
    //   //     await firebase.uploadChildForm(
    //   //       childFirstName,
    //   //       childLastName,
    //   //       childFormData,
    //   //       parentId,
    //   //       isIncomplete
    //   //     );
    //   //     setTimeout(() => {
    //   //       localStorage.clear();
    //   //     }, 1000);
    //   //     setIsBeingSaved(false);
    //   //     setRedirect(true);
    //   //   } catch (err) {
    //   //     setIsBeingSaved(false);
    //   //   }
    //   // }
    // }, 3000);
    setSaveClicked(true);
    setFormStates((prevState) => {
      return {
        ...prevState,
        step: 15,
      };
    });
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
            initialData={childApplicationId ? formStates.page5 : null}
            isView={isView}
            saveAndExitApplication={saveAndExitApplication}
          />
        );
      case 6:
        return (
          <Page6
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
            initialData={childApplicationId ? formStates.page6 : null}
            isView={isView}
            saveAndExitApplication={saveAndExitApplication}
          />
        );
      case 7:
        return (
          <Page7
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
            initialData={childApplicationId ? formStates.page7 : null}
            isView={isView}
            saveAndExitApplication={saveAndExitApplication}
          />
        );
      case 8:
        return (
          <Page8
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
            initialData={childApplicationId ? formStates.page8 : null}
            isView={isView}
            saveAndExitApplication={saveAndExitApplication}
          />
        );
      case 9:
        return (
          <Page9
            nextStep={nextStep}
            prevStep={prevStep}
            setFormStates={setFormStates}
            setCancel={setCancelPopupOpen}
            initialData={childApplicationId ? formStates.page9 : null}
            isView={isView}
            saveAndExitApplication={saveAndExitApplication}
          />
        );
      case 10:
        return (
          <Page10
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
            initialData={childApplicationId ? formStates.page10 : null}
            isView={isView}
            saveAndExitApplication={saveAndExitApplication}
          />
        );
      case 11:
        return (
          <Page11
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
            initialData={childApplicationId ? formStates.page11 : null}
            isView={isView}
            saveAndExitApplication={saveAndExitApplication}
          />
        );
      case 12:
        return (
          <Page12
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
            initialData={childApplicationId ? formStates.page12 : null}
            isView={isView}
            saveAndExitApplication={saveAndExitApplication}
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
            initialData={childApplicationId ? formStates.page13 : null}
            isView={isView}
            saveAndExitApplication={saveAndExitApplication}
          />
        );
      case 14:
        return (
          <Page14
            nextStep={nextStep}
            setFormStates={setFormStates}
            prevStep={prevStep}
            setCancel={setCancelPopupOpen}
            initialData={childApplicationId ? formStates.page14 : null}
            isView={isView}
            saveAndExitApplication={saveAndExitApplication}
          />
        );
      case 15:
        return (
          <SampleSubmitForm formStates={formStates} saveClicked={saveClicked} />
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
      {redirect && <Redirect to="/dashboard" />}
    </>
  );
};

export default MainForm;
