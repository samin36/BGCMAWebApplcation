import React from "react";
import { Form, Container, Icon } from "semantic-ui-react";
import * as yup from "yup";
import { Formik } from "formik";
import { Persist } from "formik-persist";

/**
 * Pass in prevStep if the page number >= 1
 */
const FormTemplate = ({ nextStep, prevStep, setFormStates }) => {
  const pageNo = 123456789; //Define the page number here
  const updateFormState = (values) => {
    setFormStates((prevState) => {
      return {
        ...prevState,
        [`page${pageNo}`]: values,
      };
    });
  };

  const goToNextPage = (values) => {
    updateFormState(values);
    nextStep();
  };

  const goToPrevPage = (values) => {
    updateFormState(values);
    prevStep();
  };

  const initialValues = {};

  const validationSchema = yup.object().shape({});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        //as long as the current page isn't the one that submits the data, keep the stuff below
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
        setFieldValue,
      }) => (
        <Container textAlign="center" text>
          {JSON.stringify(values, null, 2)}
          <h1>{`Page number: ${pageNo}`}</h1>
          <Form>
            <Form.Button
              onClick={goToPrevPage}
              primary
              floated="left"
              compact
              disabled={isSubmitting}
            >
              <Icon name="arrow left" />
            </Form.Button>
            <Form.Group inline widths="equal">
              <Form.Button
                type="submit"
                onClick={handleSubmit}
                primary
                floated="right"
                compact
                disabled={isSubmitting}
              >
                <Icon name="arrow right" />
              </Form.Button>
            </Form.Group>
            <Persist name={`page${pageNo}`} />
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default FormTemplate;
