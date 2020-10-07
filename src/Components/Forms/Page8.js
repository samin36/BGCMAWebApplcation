import React from "react";
import { Form, Container, Header } from "semantic-ui-react";
import * as yup from "yup";
import { Field, Formik } from "formik";
import { Persist } from "formik-persist";
import {
  paragraph1,
  paragraph2,
  paragraph3,
  paragraph4,
  paragraph5,
  paragraph6,
  paragraph7,
  paragraph8,
} from "../../PageText/page8text";

/**
 * Pass in prevStep if the page number >= 1
 */
const Page8 = ({
  nextStep,
  prevStep,
  setFormStates,
  setCancel,
  initialData,
  isView,
  saveAndExitApplication,
}) => {
  const pageNo = 8; //Define the page number here
  const updateFormState = (values) => {
    setFormStates((prevState) => {
      return {
        ...prevState,
        [`page${pageNo}`]: values,
      };
    });
  };

  const saveAndExit = (values) => {
    updateFormState(values);
    saveAndExitApplication();
  };

  const goToNextPage = (values) => {
    updateFormState(values);
    nextStep();
  };

  const goToPrevPage = (values) => {
    if (localStorage.getItem(`page${pageNo}`)) {
      let currPage = JSON.parse(localStorage.getItem(`page${pageNo}`));
      currPage["values"] = values;
      localStorage.setItem(`page${pageNo}`, JSON.stringify(currPage));
    }
    updateFormState(values);
    prevStep();
  };

  let initialValues;
  if (initialData) {
    initialValues = initialData;
  } else {
    initialValues = {
      mediaPermission: true,
      schoolDataRelease: true,
      generalTravelPermissions: true,
      clubMaskDownZone: true,
    };
  }

  const validationSchema = yup.object().shape({
    mediaPermission: yup.boolean().required("This selection is required"),
    schoolDataRelease: yup.boolean().required("This selection is required"),
    generalTravelPermissions: yup
      .boolean()
      .required("This selection is required"),
    clubMaskDownZone: yup.boolean().required("This selection is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // as long as the current page isn't the one that submits the data, keep the stuff below
        setSubmitting(false);
        goToNextPage(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Container textAlign="center" fluid style={{ padding: "0 10em" }}>
          {/* {JSON.stringify(values, null, 2)} */}
          <Header textAlign="center" as="h1">
            <b>Member Assessment Permission Form</b>
          </Header>

          {paragraph1}
          <Header as="h3" textAlign="left">
            {paragraph2}
          </Header>
          <Form size="big">
            <Form.Group>
              <Field as="select" name="memberAssessments">
                <option value={true}>I give my child Media Permission </option>
                <option value={false}>
                  I DO NOT give my child Media Permission.
                </option>
                value={values.mediaPermission}
              </Field>
            </Form.Group>
          </Form>

          {paragraph3}
          <Header as="h3" textAlign="left">
            {paragraph4}
          </Header>
          <Form size="big">
            <Form.Group>
              <Field as="select" name="memberAssessments">
                <option value={true}>
                  I give permission to the BGCMA to request academic information
                  from my child’s school district.
                </option>
                <option value={false}>
                  I DO NOT give permission to BGCMA to request academic
                  information from my child’s school district.
                </option>
                value={values.schoolDataRelease}
              </Field>
            </Form.Group>
          </Form>

          {paragraph5}
          <Header as="h3" textAlign="left">
            {paragraph6}
          </Header>
          <Form size="big">
            <Form.Group>
              <Field as="select" name="memberAssessments">
                <option value={true}>
                  I give my child General Travel Permission.
                </option>
                <option value={false}>
                  {" "}
                  I DO NOT give my child General Travel Permission.
                </option>
                value={values.generalTravelPermissions}
              </Field>
            </Form.Group>
          </Form>

          {paragraph7}
          <Header as="h3" textAlign="left">
            {paragraph8}
          </Header>
          <Form size="big">
            <Form.Group>
              <Field as="select" name="memberAssessments">
                <option value={true}>
                  I give permission for my child to remove their mask during the
                  Mask Down time.
                </option>
                <option value={false}>
                  I DO NOT give permission for my child to remove their mask
                  during the Mask Down time
                </option>
                value={values.clubMaskDownZone}
              </Field>
            </Form.Group>
            <Form.Group>
              <Form.Button
                size="large"
                onClick={() => goToPrevPage(values)}
                primary
                floated="left"
                disabled={isSubmitting}
                icon="arrow left"
                style={{ padding: ".75em 2em" }}
                width={!isView ? 6 : 4}
              />
              <Form.Button
                size="large"
                disabled={isSubmitting}
                onClick={() => setCancel(true)}
                content="Cancel"
                style={{ padding: ".75em 2em" }}
                color="red"
                width={!isView ? 2 : 8}
              />
              {!isView && (
                <Form.Button
                  size="large"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => saveAndExit(values)}
                  content="Save & Exit"
                  style={{ padding: ".75em 2em" }}
                  color="green"
                  width={2}
                />
              )}
              <Form.Button
                size="large"
                type="submit"
                onClick={handleSubmit}
                primary
                floated="right"
                disabled={isSubmitting}
                content={`Page ${pageNo + 1}`}
                labelPosition="right"
                icon="arrow right"
                style={{ padding: ".75em 2em" }}
                width={!isView ? 6 : 4}
              />
            </Form.Group>
            <Persist name={`page${pageNo}`} />
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default Page8;
