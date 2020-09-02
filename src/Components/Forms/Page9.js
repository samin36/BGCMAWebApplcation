import React from "react";
import { Form, Container, Icon, Header, Divider } from "semantic-ui-react";
import * as yup from "yup";
import { Formik } from "formik";
import { Persist } from "formik-persist";
import {
  phoneRegex,
  ssnRegex,
  dateRegex,
  zipCodeRegex,
} from "../../Regex/regex";

/**
 * Pass in prevStep if the page number >= 1
 */
const Page9 = ({ nextStep, prevStep, setFormStates }) => {
  const pageNo = 9; //Define the page number here
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
    parent1_firstName: "",
    parent1_lastName: "",
    parent1_homePhone: "",
    parent1_employer: "",
    parent1_occupation: "",
    parent1_workPhone: "",
    parent1_cellPhone: "",
    parent1_vouchersOrPublicHousing: "",
    parent1_vouchersOrPublicHousingYes: "",

    parent2_firstName: "",
    parent2_lastName: "",
    parent2_homePhone: "",
    parent2_cellPhone: "",
    parent2_employer: "",
    parent2_occupation: "",
    parent2_workPhone: "",

    emergencyContact1_name: "",
    emergencyContact1_phone: "",
    emergencyContact2_name: "",
    emergencyContact2_phone: "",
    emergencyContact3_name: "",
    emergencyContact3_phone: "",
    emergencyContact4_name: "",
    emergencyContact4_phone: "",
    emergencyContact5_name: "",
    emergencyContact5_phone: "",
    emergencyContact6_name: "",
    emergencyContact6_phone: "",
    age13_permission: "",

    numPersonsInFam: "",
    houseHoldIncome: "",
  };

  const parentInfoValidationSchema = yup.object().shape({
    parent1_firstName: yup
      .string()
      .required("Parent/guardian's first name is required"),
    parent1_lastName: yup
      .string()
      .required("Parent/guardian's last name is required"),
    parent1_homePhone: yup
      .string()
      .matches(phoneRegex, "Phone must be in the form xxx-xxx-xxxx."),
    parent1_employer: yup.string(),
    parent1_occupation: yup.string(),
    parent1_workPhone: yup.string(),
    parent1_cellPhone: yup
      .string()
      .matches(phoneRegex, "Phone must be in the form xxx-xxx-xxxx."),
    parent1_vouchersOrPublicHousing: yup
      .string()
      .required("Please select Yes or No. If yes, please specify."),
    parent1_vouchersOrPublicHousingYes: yup
      .string()
      .default("None")
      .required("Please specify"),
    parent2_firstName: yup.string(),
    parent2_lastName: yup.string(),
    parent2_homePhone: yup
      .string()
      .matches(phoneRegex, "Phone must be in the form xxx-xxx-xxxx."),
    parent2_cellPhone: yup
      .string()
      .matches(phoneRegex, "Phone must be in the form xxx-xxx-xxxx."),
    parent2_employer: yup.string(),
    parent2_occupation: yup.string(),
    parent2_workPhone: yup
      .string()
      .matches(phoneRegex, "Phone must be in the form xxx-xxx-xxxx."),
  });

  const emergenyContactsAndAuthorizedPickupValidationSchema = yup
    .object()
    .shape({
      emergencyContact1_name: yup
        .string()
        .required("Emergency contact name is required"),
      emergencyContact1_phone: yup
        .string()
        .required("Emergency contact phone number is required")
        .matches(phoneRegex, "Phone must be in the form xxx-xxx-xxxx."),
      emergencyContact2_name: yup
        .string()
        .required("Emergency contact name is required"),
      emergencyContact2_phone: yup
        .string()
        .required("Emergency contact phone number is required")
        .matches(phoneRegex, "Phone must be in the form xxx-xxx-xxxx."),
      emergencyContact3_name: yup.string(),
      emergencyContact3_phone: yup
        .string()
        .matches(phoneRegex, "Phone must be in the form xxx-xxx-xxxx."),
      emergencyContact4_name: yup.string(),
      emergencyContact4_phone: yup
        .string()
        .matches(phoneRegex, "Phone must be in the form xxx-xxx-xxxx."),
      emergencyContact5_name: yup.string(),
      emergencyContact5_phone: yup
        .string()
        .matches(phoneRegex, "Phone must be in the form xxx-xxx-xxxx."),
      emergencyContact6_name: yup.string(),
      emergencyContact6_phone: yup
        .string()
        .matches(phoneRegex, "Phone must be in the form xxx-xxx-xxxx."),

      age13_permission: yup.string().required("One option must be selected"),
    });

  const additionalHouseholdInfoValidationSchema = yup.object().shape({
    numPersonsInFam: yup
      .number()
      .required("Number of persons in family unit / household is required"),
    houseHoldIncome: yup
      .number()
      .required("Gross annual household income is required"),
  });

  const validationSchema = yup
    .object()
    .concat(parentInfoValidationSchema)
    .concat(emergenyContactsAndAuthorizedPickupValidationSchema)
    .concat(additionalHouseholdInfoValidationSchema);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
          <Header as="h1" textAlign="center">
            Membership Application
          </Header>
          <Header as="h3">
            Please fill out the application completely. BGCMA will NOT accept
            incomplete applications.
          </Header>
          <Divider horizontal content="Member Info" />
          <Header as="h4">Primary Parent/Guardian</Header>
          <Form size="big">
            <Form.Group>
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.parent1_firstName &&
                  errors.parent1_firstName !== undefined && {
                    content: errors.parent1_firstName,
                    pointing: "above",
                  }
                }
                width={5}
                placeholder="First Name"
                name="parent1_firstName"
                value={values.parent1_firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.parent1_lastName &&
                  errors.parent1_lastName !== undefined && {
                    content: errors.parent1_lastName,
                    pointing: "above",
                  }
                }
                width={5}
                placeholder="Last Name"
                name="parent1_lastName"
                value={values.parent1_lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.parent1_homePhone &&
                  errors.parent1_homePhone !== undefined && {
                    content: errors.parent1_homePhone,
                    pointing: "above",
                  }
                }
                width={6}
                placeholder="Home Phone #"
                name="parent1_homePhone"
                value={values.parent1_homePhone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
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

export default Page9;
