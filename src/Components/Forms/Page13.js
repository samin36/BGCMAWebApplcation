import React from "react";
import { Form, Container, Icon, Header } from "semantic-ui-react";
import * as yup from "yup";
import { Formik } from "formik";
import { Persist } from "formik-persist";
import { dateRegex } from "../../Regex/regex";
import {
  paragraph1,
  paragraph2,
  paragraph3,
  paragraph4,
} from "../../PageText/page13text";

/**
 * Pass in prevStep if the page number >= 1
 */
const FormTemplate = ({ nextStep, prevStep, setFormStates }) => {
  const pageNo = 14; //Define the page number here
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

  const initialValues = {
    familyUnitSize: "",
    yealyIncome: "",
    monthlyIncome: "",
  };

  const validationSchema = yup.object().shape({
    guardianFirstName: yup.string().required("Child's First name is required"),
    guardianMiddleInitial: yup.string().max(1, "Initial must be a single letter"),
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
        setFieldValue,
      }) => (
        <Container textAlign="center">
          {/* {JSON.stringify(values, null, 2)} */}
          <Header textAlign="center" as="h1">
            <b>
              Page 2 of 3 - DFCS AfterSchool Care Program Elgibility Form
            </b>
          </Header>
          <Header as="h2" textAlign="left">
            <b>
                Section 3
            </b>
          </Header>
          <Header as="h4" textAlign="left">
            {paragraph1}
          </Header>
          <Header textAlign="center" as="h1">
            <b>
              <u>Family Income Elgibility for the DFCS Afterschool Care Program Income Elgibility Guide</u> 
            </b>
          </Header>
          <Form size="big">
            <Header as="h4" textAlign="left">
              {paragraph2}
              {paragraph3}
            </Header> 
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.familyUnitSize &&
                  errors.familyUnitSize !== undefined && {
                    content: errors.familyUnitSize,
                    pointing: "above",
                  }
                }
                placeholder="Family Unit Size"
                name="familyUnitSize"
                value={values.familyUnitSize}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.yealyIncome &&
                  errors.yealyIncome !== undefined && {
                    content: errors.yealyIncome,
                    pointing: "above",
                  }
                }
                placeholder="Gross Household Yearly Income $"
                name="yealyIncome"
                value={values.yealyIncome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.monthlyIncome &&
                  errors.monthlyIncome !== undefined && {
                    content: errors.monthlyIncome,
                    pointing: "above",
                  }
                }
                placeholder="Gross Household Monthly Income $"
                name="monthlyIncome"
                value={values.monthlyIncome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Header as="h4" textAlign="left">
              * See Appendix A for definition of family unit.
            </Header> 
            <Header as="h2" textAlign="left">
              <b>
                  Section 4
              </b>
            </Header>
            <Header as="h4" textAlign="left">
            {paragraph4}
          </Header> 
            <Form.Group widths="equal">
              <Form.Button
                onClick={goToPrevPage}
                primary
                floated="left"
                disabled={isSubmitting}
                icon="arrow left"
                style={{ padding: ".75em 2em" }}
              />
              <Form.Button
                type="submit"
                onClick={handleSubmit}
                primary
                floated="right"
                disabled={isSubmitting}
                icon="arrow right"
                style={{ padding: ".75em 2em" }}
              />
            </Form.Group>
            <Persist name={`page${pageNo}`} />
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default FormTemplate;
