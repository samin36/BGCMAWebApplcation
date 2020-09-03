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
  paragraph5,
  paragraph6,
  paragraph7,
  paragraph8,
} from "../../PageText/page14text";

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
    guardianFirstName: "",
    guardianMiddleInitial: "",
    guardianLastName: "",
    streetAddress: "",
    city: "",
    stateIn: "",
    zipCode: "",
    homePhoneNumber: "",
    workPhoneNumber: "",
    cellPhoneNumber: "",
    guardianPrintedName: "",
    guardianPrintedNameDate: "",
    guardianInitals: "",
    guardianInitalsDate: "",
    totalIncome: "",
    incomeFrequency: "",
    houseHoldSize: "",
    anualIncome: "",
    staffInitials: "",
    staffTitle: "",
    staffDate: "",
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
              Page 3 of 3 - DFCS AfterSchool Care Program Elgibility Form
            </b>
          </Header>
          <Header as="h2" textAlign="left">
            <b>
                Section 5
            </b>
          </Header>
          <Header as="h4" textAlign="left">
            {paragraph1}
          </Header>
          <Header textAlign="center" as="h1">
            <b>
              Application Notification and Signiture
            </b>
          </Header>
          <Header as="h4" textAlign="left">
            {paragraph2}
            {paragraph3}
            {paragraph4}
            {paragraph5}
            {paragraph6}
          </Header>
          <Header as="h1" textAlign="left">
            <b>
              Parent/Guardian/Caregiver Information - <i>This section must be completed in its entirety</i>.
            </b>
          </Header>
          <Form size="big">
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.guardianFirstName &&
                  errors.guardianFirstName !== undefined && {
                    content: errors.guardianFirstName,
                    pointing: "above",
                  }
                }
                placeholder="First Name of Parent/Guardian/Caregiver"
                name="guardianFirstName"
                value={values.guardianFirstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.guardianMiddleInitial &&
                  errors.guardianMiddleInitial !== undefined && {
                    content: errors.guardianMiddleInitial,
                    pointing: "above",
                  }
                }
                placeholder="Middle Initial of Parent/Guardian/Caregiver"
                name="guardianMiddleInitial"
                value={values.guardianMiddleInitial}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.guardianLastName &&
                  errors.guardianLastName !== undefined && {
                    content: errors.guardianLastName,
                    pointing: "above",
                  }
                }
                placeholder="Last Name of Parent/Guardian/Caregiver"
                name="guardianLastName"
                value={values.guardianLastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.streetAddress &&
                  errors.streetAddress !== undefined && {
                    content: errors.streetAddress,
                    pointing: "above",
                  }
                }
                placeholder="Stree Address"
                name="streetAddress"
                value={values.streetAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.city &&
                  errors.city !== undefined && {
                    content: errors.city,
                    pointing: "above",
                  }
                }
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.stateIn &&
                  errors.stateIn !== undefined && {
                    content: errors.stateIn,
                    pointing: "above",
                  }
                }
                placeholder="State"
                name="stateIn"
                value={values.stateIn}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.zipCode &&
                  errors.zipCode !== undefined && {
                    content: errors.zipCode,
                    pointing: "above",
                  }
                }
                placeholder="Zip Code"
                name="zipCode"
                value={values.zipCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.homePhoneNumber &&
                  errors.homePhoneNumber !== undefined && {
                    content: errors.streetAddress,
                    pointing: "above",
                  }
                }
                placeholder="Home Phone Number"
                name="homePhoneNumber"
                value={values.homePhoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.workPhoneNumber &&
                  errors.workPhoneNumber !== undefined && {
                    content: errors.workPhoneNumber,
                    pointing: "above",
                  }
                }
                placeholder="Work Number"
                name="workPhoneNumber"
                value={values.workPhoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.cellPhoneNumber &&
                  errors.cellPhoneNumber !== undefined && {
                    content: errors.cellPhoneNumber,
                    pointing: "above",
                  }
                }
                placeholder="Cell Phone Number"
                name="cellPhoneNumber"
                value={values.cellPhoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.guardianPrintedName &&
                  errors.guardianPrintedName !== undefined && {
                    content: errors.guardianPrintedName,
                    pointing: "above",
                  }
                }
                placeholder="Parent/Caregiver/Guardian Printed Name"
                name="guardianPrintedName"
                value={values.guardianPrintedName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.guardianPrintedNameDate &&
                  errors.guardianPrintedNameDate !== undefined && {
                    content: errors.guardianPrintedNameDate,
                    pointing: "above",
                  }
                }
                placeholder="Date"
                name="guardianPrintedNameDate"
                value={values.guardianPrintedNameDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.guardianInitals &&
                  errors.guardianInitals !== undefined && {
                    content: errors.guardianInitals,
                    pointing: "above",
                  }
                }
                placeholder="Parent/Caregiver/Guardian Initials"
                name="guardianInitals"
                value={values.guardianInitals}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.guardianInitalsDate &&
                  errors.guardianInitalsDate !== undefined && {
                    content: errors.guardianInitalsDate,
                    pointing: "above",
                  }
                }
                placeholder="Date"
                name="guardianInitalsDate"
                value={values.guardianInitalsDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Header as="h1" textAlign="center">
            <b>
              Official Use Only Section for DFCS Funded AfterSchool/Summer Service Provider:
            </b>
            </Header>
            <Form.Group widths="equal">
            <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.totalIncome &&
                  errors.guardianInitaltotalIncomesDate !== undefined && {
                    content: errors.totalIncome,
                    pointing: "above",
                  }
                }
                placeholder="Total Income $"
                name="totalIncome"
                value={values.totalIncome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label>Per: </label>
              <Icon name="asterisk" color="red" size="small" corner />
              <Form.Radio
                name="incomeFrequency"
                value="Week"
                label="Week"
                onBlur={handleBlur}
                onChange={(_, { value }) =>
                  setFieldValue("incomeFrequency", value)
                }
                checked={
                  values.incomeFrequency === "Week"
                }
                error={
                  touched.incomeFrequency &&
                  errors.incomeFrequency !== undefined
                }
              />
              <Form.Radio
                name="incomeFrequency"
                value="Every 2 Weeks"
                label="Every 2 Weeks"
                onBlur={handleBlur}
                onChange={(_, { value }) =>
                  setFieldValue("incomeFrequency", value)
                }
                checked={values.incomeFrequency === "Every 2 Weeks"}
                error={
                  touched.incomeFrequency &&
                  errors.incomeFrequency !== undefined
                }
              />
              <Form.Radio
                name="incomeFrequency"
                value="Twice Monthly"
                label="Twice Monthly"
                onBlur={handleBlur}
                onChange={(_, { value }) =>
                  setFieldValue("incomeFrequency", value)
                }
                checked={values.incomeFrequency === "Twice Monthly"}
                error={
                  touched.incomeFrequency &&
                  errors.incomeFrequency !== undefined
                }
              />
              <Form.Radio
                name="incomeFrequency"
                value="Monthly"
                label="Monthly"
                onBlur={handleBlur}
                onChange={(_, { value }) =>
                  setFieldValue("incomeFrequency", value)
                }
                checked={values.incomeFrequency === "Monthly"}
                error={
                  touched.incomeFrequency &&
                  errors.incomeFrequency !== undefined
                }
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.houseHoldSize &&
                  errors.houseHoldSize !== undefined && {
                    content: errors.houseHoldSize,
                    pointing: "above",
                  }
                }
                placeholder="Household Size"
                name="houseHoldSize"
                value={values.houseHoldSize}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Header as="h4" textAlign="left">
              {paragraph7}
            </Header>
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.anualIncome &&
                  errors.anualIncome !== undefined && {
                    content: errors.anualIncome,
                    pointing: "above",
                  }
                }
                placeholder="Total Converted Annual Income (Round to the nearest whole number) $"
                name="anualIncome"
                value={values.anualIncome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Header as="h4" textAlign="left">
              {paragraph8}
            </Header>
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.staffInitials &&
                  errors.staffInitials !== undefined && {
                    content: errors.staffInitials,
                    pointing: "above",
                  }
                }
                placeholder="Authorized Program Staff Initials"
                name="staffInitials"
                value={values.staffInitials}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.staffTitle &&
                  errors.staffTitle !== undefined && {
                    content: errors.staffTitle,
                    pointing: "above",
                  }
                }
                placeholder="Title"
                name="staffTitle"
                value={values.staffTitle}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.staffDate &&
                  errors.staffDate !== undefined && {
                    content: errors.staffDate,
                    pointing: "above",
                  }
                }
                placeholder="Date"
                name="staffDate"
                value={values.staffDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Header as="h1" textAlign="left">
            <b>
              ** See Apendix B for income verification proof sources
            </b>
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
