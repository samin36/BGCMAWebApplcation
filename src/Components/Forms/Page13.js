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
} from "../../PageText/page13text";

/**
 * Pass in prevStep if the page number >= 1
 */
const FormTemplate = ({ nextStep, prevStep, setFormStates }) => {
  const pageNo = 13; //Define the page number here
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
    staffVisitorParentOrGuardianInitials: "",
    staffVisitorParentOrGuardianName: "",
    agreementDate: "",
    bgcmaParticipantOrClubMemberName: "",
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
                  touched.staffVisitorParentOrGuardianInitials &&
                  errors.staffVisitorParentOrGuardianInitials !== undefined && {
                    content: errors.staffVisitorParentOrGuardianInitials,
                    pointing: "above",
                  }
                }
                placeholder="Initials of Staff, Visitor or Parent/Guardian"
                name="staffVisitorParentOrGuardianInitials"
                value={values.staffVisitorParentOrGuardianInitials}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.agreementDate &&
                  errors.agreementDate !== undefined && {
                    content: errors.agreementDate,
                    pointing: "above",
                  }
                }
                placeholder="Date"
                name="agreementDate"
                value={values.agreementDate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.staffVisitorParentOrGuardianName &&
                  errors.staffVisitorParentOrGuardianName !== undefined && {
                    content: errors.staffVisitorParentOrGuardianName,
                    pointing: "above",
                  }
                }
                placeholder="Name of Staff, Visitor or Parent/Guardian"
                name="staffVisitorParentOrGuardianName"
                value={values.staffVisitorParentOrGuardianName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.bgcmaParticipantOrClubMemberName &&
                  errors.bgcmaParticipantOrClubMemberName !== undefined && {
                    content: errors.bgcmaParticipantOrClubMemberName,
                    pointing: "above",
                  }
                }
                placeholder="Name(s) of BGCMA Program Participant(s) or Club Members"
                name="bgcmaParticipantOrClubMemberName"
                value={values.bgcmaParticipantOrClubMemberName}
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
