import React from "react";
import { Form, Container, Icon, Header, Label } from "semantic-ui-react";
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
} from "../../PageText/page5text";

/**
 * Pass in prevStep if the page number >= 1
 */
const Page5 = ({ nextStep, prevStep, setFormStates, setCancel }) => {
  const pageNo = 5; //Define the page number here
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
    if (localStorage.getItem(`page${pageNo}`)) {
      let currPage = JSON.parse(localStorage.getItem(`page${pageNo}`));
      currPage["values"] = values;
      localStorage.setItem(`page${pageNo}`, JSON.stringify(currPage));
    }
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
        <Container textAlign="center" fluid style={{ padding: "0 10em" }}>
          {/* {JSON.stringify(values, null, 2)} */}
          <Header textAlign="center" as="h1">
            <b>
              Assumption of the Risk and Waiver of Liability Relating to
              Coronavirus/COVID-19
            </b>
          </Header>
          <Header as="h3" textAlign="left">
            {paragraph1}
            {paragraph2}
            {paragraph3}
            {paragraph4}
            {paragraph5}
            {paragraph6}
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
            <Form.Group>
              <Form.Button
                size="large"
                onClick={() => goToPrevPage(values)}
                primary
                floated="left"
                disabled
                icon="arrow left"
                style={{ padding: ".75em 2em" }}
                width={4}
              />
              <Form.Button
                size="large"
                disabled={isSubmitting}
                onClick={() => setCancel(true)}
                content="Cancel"
                style={{ padding: ".75em 2em" }}
                color="red"
                width={8}
              />
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
                width={4}
              />
            </Form.Group>
            <Persist name={`page${pageNo}`} />
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default Page5;
