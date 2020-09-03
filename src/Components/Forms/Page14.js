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
    guardianName: "",
    streetAddress: "",
    city: "",
    stateIn: "",
    zipCode: "",
    homePhoneNumber: "",
    workPhoneNumber: "",
    cellPhoneNumber: "",
  };

  const validationSchema = yup.object().shape({
    staffVisitorParentOrGuardianInitials: yup
      .string()
      .max(3, "Initials cannot be more than 3 characters")
      .required("Initials are required"),
    staffVisitorParentOrGuardianName: yup.string().required("Name is required"),
    agreementDate: yup
      .string()
      .required("Date is required as MM/DD/YYYY")
      .matches(dateRegex, "Date must be in the form MM/DD/YYYY"),
    bgcmaParticipantOrClubMemberName: yup
      .string()
      .required("Name(s) of participants/club members are required"),
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
                  touched.guardianName &&
                  errors.guardianName !== undefined && {
                    content: errors.guardianName,
                    pointing: "above",
                  }
                }
                placeholder="Name of Parent/Guardian/Caregiver (Lase, First, MI)"
                name="guardianName"
                value={values.guardianName}
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
