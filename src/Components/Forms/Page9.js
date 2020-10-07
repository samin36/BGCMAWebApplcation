import React from "react";
import {
  Form,
  Container,
  Icon,
  Header,
  Segment,
  Grid,
  Divider,
} from "semantic-ui-react";
import * as yup from "yup";
import { Formik } from "formik";
import { Persist } from "formik-persist";
import { phoneRegex } from "../../Regex/regex";

/**
 * Pass in prevStep if the page number >= 1
 */
const Page9 = ({
  nextStep,
  prevStep,
  setFormStates,
  setCancel,
  initialData,
}) => {
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
  }

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
      //validationSchema={validationSchema}
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
        <Container textAlign="center" fluid style={{ padding: "0 10em" }}>
          <Header as="h1">Parent/Guardian Information</Header>
          <Divider horizontal content="PRIMARY PARENT/GUARDIAN" />
          <Form size="big">
            <Form.Group widths="equal">
              <Form.Input //First Name__ Last Name__ Home #__ Cell #__
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.parent1_firstName &&
                  errors.parent1_firstName !== undefined && {
                    content: errors.parent1_firstName,
                    pointing: "above",
                  }
                }
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
                placeholder="Home Phone #"
                name="parent1_homePhone"
                value={values.parent1_homePhone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.parent1_cellPhone &&
                  errors.parent1_cellPhone !== undefined && {
                    content: errors.parent1_cellPhone,
                    pointing: "above",
                  }
                }
                placeholder="Cell Phone #"
                name="parent1_cellPhone"
                value={values.parent1_cellPhone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input //Employer__ Occupation__ Work #__
                error={
                  touched.parent1_employer &&
                  errors.parent1_employer !== undefined && {
                    content: errors.parent1_employer,
                    pointing: "above",
                  }
                }
                placeholder="Employer"
                name="parent1_employer"
                value={values.parent1_employer}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.parent1_occupation &&
                  errors.parent1_occupation !== undefined && {
                    content: errors.parent1_occupation,
                    pointing: "above",
                  }
                }
                placeholder="Occupation"
                name="parent1_occupation"
                value={values.parent1_occupation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.parent1_workPhone &&
                  errors.parent1_workPhone !== undefined && {
                    content: errors.parent1_workPhone,
                    pointing: "above",
                  }
                }
                placeholder="Work Phone #"
                name="parent1_workPhone"
                value={values.parent1_workPhone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group grouped>
              <Grid>
                <Grid.Column>
                  <Segment textAlign="left" size="big">
                    <Form.Group>
                      <label>
                        Do you receive vouchers from the housing authority in
                        your community or do you live in public housing?
                      </label>
                      <Icon name="asterisk" color="red" size="small" corner />
                      <Form.Radio
                        name="parent1_vouchersOrPublicHousing"
                        value="Yes"
                        label="Yes"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue(
                            "parent1_vouchersOrPublicHousing",
                            value
                          )
                        }
                        checked={
                          values.parent1_vouchersOrPublicHousing === "Yes"
                        }
                        error={
                          touched.parent1_vouchersOrPublicHousing &&
                          errors.parent1_vouchersOrPublicHousing !==
                            undefined && {
                            content: errors.parent1_vouchersOrPublicHousing,
                            pointing: "above",
                          }
                        }
                      />
                      {values.parent1_vouchersOrPublicHousing === "Yes" && (
                        <Form.TextArea
                          as={Form.Input}
                          error={
                            touched.parent1_vouchersOrPublicHousingYes &&
                            errors.parent1_vouchersOrPublicHousingYes !==
                              undefined && {
                              content:
                                errors.parent1_vouchersOrPublicHousingYes,
                              pointing: "above",
                            }
                          }
                          placeholder="Please list the name of the housing authority where you receive assistance: "
                          name="parent1_vouchersOrPublicHousingYes"
                          value={values.parent1_vouchersOrPublicHousingYes}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={
                            values.parent1_vouchersOrPublicHousing !== "Yes"
                          }
                        />
                      )}
                      <Form.Radio
                        name="parent1_vouchersOrPublicHousing"
                        value="No"
                        label="No"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue(
                            "parent1_vouchersOrPublicHousing",
                            value
                          )
                        }
                        checked={
                          values.parent1_vouchersOrPublicHousing === "No"
                        }
                        error={
                          touched.parent1_vouchersOrPublicHousing &&
                          errors.parent1_vouchersOrPublicHousing !== undefined
                        }
                      />
                    </Form.Group>
                  </Segment>
                </Grid.Column>
              </Grid>
            </Form.Group>

            <Divider horizontal content="Secondary Parent/Guardian" />

            <Form.Group widths="equal">
              <Form.Input //First Name__ Last Name__ Home #__ Cell #__
                error={
                  touched.parent2_firstName &&
                  errors.parent2_firstName !== undefined && {
                    content: errors.parent2_firstName,
                    pointing: "above",
                  }
                }
                placeholder="First Name"
                name="parent2_firstName"
                value={values.parent2_firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.parent2_lastName &&
                  errors.parent2_lastName !== undefined && {
                    content: errors.parent2_lastName,
                    pointing: "above",
                  }
                }
                placeholder="Last Name"
                name="parent2_lastName"
                value={values.parent2_lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.parent2_homePhone &&
                  errors.parent2_homePhone !== undefined && {
                    content: errors.parent2_homePhone,
                    pointing: "above",
                  }
                }
                placeholder="Home Phone #"
                name="parent2_homePhone"
                value={values.parent2_homePhone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.parent2_cellPhone &&
                  errors.parent2_cellPhone !== undefined && {
                    content: errors.parent2_cellPhone,
                    pointing: "above",
                  }
                }
                placeholder="Cell Phone #"
                name="parent2_cellPhone"
                value={values.parent2_cellPhone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input //Employer__ Occupation__ Work #__
                error={
                  touched.parent2_employer &&
                  errors.parent2_employer !== undefined && {
                    content: errors.parent2_employer,
                    pointing: "above",
                  }
                }
                placeholder="Employer"
                name="parent2_employer"
                value={values.parent2_employer}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.parent2_occupation &&
                  errors.parent2_occupation !== undefined && {
                    content: errors.parent2_occupation,
                    pointing: "above",
                  }
                }
                placeholder="Occupation"
                name="parent2_occupation"
                value={values.parent2_occupation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.parent2_workPhone &&
                  errors.parent2_workPhone !== undefined && {
                    content: errors.parent2_workPhone,
                    pointing: "above",
                  }
                }
                placeholder="Work Phone #"
                name="parent2_workPhone"
                value={values.parent2_workPhone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Divider />
            <Header as="h1">
              Emergency Contacts and Authorized to pick up member from Club
            </Header>
            <Header as="h3">
              NOTE: At least 2 contacts that are not the Parent/Guardian are
              REQUIRED below.
            </Header>

            <Form.Group>
              <Form.Input //First (required) emergency contact
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.emergencyContact1_name &&
                  errors.emergencyContact1_name !== undefined && {
                    content: errors.emergencyContact1_name,
                    pointing: "above",
                  }
                }
                width={10}
                placeholder="Emergency Contact Name"
                name="emergencyContact1_name"
                value={values.emergencyContact1_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.emergencyContact1_phone &&
                  errors.emergencyContact1_phone !== undefined && {
                    content: errors.emergencyContact1_phone,
                    pointing: "above",
                  }
                }
                width={6}
                placeholder="Emergency Contact Phone #"
                name="emergencyContact1_phone"
                value={values.emergencyContact1_phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input //Second (required) emergency contact
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.emergencyContact2_name &&
                  errors.emergencyContact2_name !== undefined && {
                    content: errors.emergencyContact2_name,
                    pointing: "above",
                  }
                }
                width={10}
                placeholder="Emergency Contact Name"
                name="emergencyContact2_name"
                value={values.emergencyContact2_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.emergencyContact2_phone &&
                  errors.emergencyContact2_phone !== undefined && {
                    content: errors.emergencyContact2_phone,
                    pointing: "above",
                  }
                }
                width={6}
                placeholder="Emergency Contact Phone #"
                name="emergencyContact2_phone"
                value={values.emergencyContact2_phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group>
              <Form.Input //Third emergency contact
                error={
                  touched.emergencyContact3_name &&
                  errors.emergencyContact3_name !== undefined && {
                    content: errors.emergencyContact3_name,
                    pointing: "above",
                  }
                }
                width={10}
                placeholder="Emergency Contact Name"
                name="emergencyContact3_name"
                value={values.emergencyContact3_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.emergencyContact3_phone &&
                  errors.emergencyContact3_phone !== undefined && {
                    content: errors.emergencyContact3_phone,
                    pointing: "above",
                  }
                }
                width={6}
                placeholder="Emergency Contact Phone #"
                name="emergencyContact3_phone"
                value={values.emergencyContact3_phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input //Fourth emergency contact
                error={
                  touched.emergencyContact4_name &&
                  errors.emergencyContact4_name !== undefined && {
                    content: errors.emergencyContact4_name,
                    pointing: "above",
                  }
                }
                width={10}
                placeholder="Emergency Contact Name"
                name="emergencyContact4_name"
                value={values.emergencyContact4_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.emergencyContact4_phone &&
                  errors.emergencyContact4_phone !== undefined && {
                    content: errors.emergencyContact4_phone,
                    pointing: "above",
                  }
                }
                width={6}
                placeholder="Emergency Contact Phone #"
                name="emergencyContact4_phone"
                value={values.emergencyContact4_phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group>
              <Form.Input //Fifth emergency contact
                error={
                  touched.emergencyContact5_name &&
                  errors.emergencyContact5_name !== undefined && {
                    content: errors.emergencyContact5_name,
                    pointing: "above",
                  }
                }
                width={10}
                placeholder="Emergency Contact Name"
                name="emergencyContact5_name"
                value={values.emergencyContact5_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.emergencyContact5_phone &&
                  errors.emergencyContact5_phone !== undefined && {
                    content: errors.emergencyContact5_phone,
                    pointing: "above",
                  }
                }
                width={6}
                placeholder="Emergency Contact Phone #"
                name="emergencyContact5_phone"
                value={values.emergencyContact5_phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                error={
                  touched.emergencyContact6_name &&
                  errors.emergencyContact6_name !== undefined && {
                    content: errors.emergencyContact6_name,
                    pointing: "above",
                  }
                }
                width={10}
                placeholder="Emergency Contact Name"
                name="emergencyContact6_name"
                value={values.emergencyContact6_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.emergencyContact6_phone &&
                  errors.emergencyContact6_phone !== undefined && {
                    content: errors.emergencyContact6_phone,
                    pointing: "above",
                  }
                }
                width={6}
                placeholder="Emergency Contact Phone #"
                name="emergencyContact6_phone"
                value={values.emergencyContact6_phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Group grouped>
              <Grid>
                <Grid.Column width={16}>
                  <Segment textAlign="left" size="big">
                    <Form.Group grouped>
                      <label>
                        Authorization to leave premises unescorted:{" "}
                      </label>
                      <Icon name="asterisk" color="red" size="small" corner />
                      <Form.Radio
                        name="age13_permission"
                        value="My child is younger than 13 years old but has my permission to walk/leave the Club with older siblings/friends listed in the authorized pick up."
                        label="My child is younger than 13 years old but has my permission to walk/leave the Club with older siblings/friends listed in the authorized pick up."
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("age13_permission", value)
                        }
                        checked={
                          values.age13_permission ===
                          "My child is younger than 13 years old but has my permission to walk/leave the Club with older siblings/friends listed in the authorized pick up."
                        }
                        error={
                          touched.age13_permission &&
                          errors.age13_permission !== undefined
                        }
                      />
                      <Form.Radio
                        name="age13_permission"
                        value="My child is younger than 13 years old but DOES NOT have my permission to walk/leave the Club."
                        label="My child is younger than 13 years old but DOES NOT have my permission to walk/leave the Club."
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("age13_permission", value)
                        }
                        checked={
                          values.age13_permission ===
                          "My child is younger than 13 years old but DOES NOT have my permission to walk/leave the Club."
                        }
                        error={
                          touched.age13_permission &&
                          errors.age13_permission !== undefined
                        }
                      />
                      <Form.Radio
                        name="age13_permission"
                        value="My child is 13 years or older and has my permission to check him/herself out of the Club."
                        label="My child is 13 years or older and has my permission to check him/herself out of the Club."
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("age13_permission", value)
                        }
                        checked={
                          values.age13_permission ===
                          "My child is 13 years or older and has my permission to check him/herself out of the Club."
                        }
                        error={
                          touched.age13_permission &&
                          errors.age13_permission !== undefined
                        }
                      />
                      <Form.Radio
                        name="age13_permission"
                        value="My child is 13 years or older but DOES NOT have my permission to check him/herself out of the Club."
                        label="My child is 13 years or older but DOES NOT have my permission to check him/herself out of the Club."
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("age13_permission", value)
                        }
                        checked={
                          values.age13_permission ===
                          "My child is 13 years or older but DOES NOT have my permission to check him/herself out of the Club."
                        }
                        error={
                          touched.age13_permission &&
                          errors.age13_permission !== undefined
                        }
                      />
                    </Form.Group>
                  </Segment>
                </Grid.Column>
              </Grid>
            </Form.Group>

            <Header as="h4">
              NOTE: If there are any legal situations regarding unauthorized
              pick-ups/visitations, please provide that information to the Club
              (i.e. court orders).
            </Header>

            <Divider horizontal content="Additional Household Info" />

            <Form.Group>
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.numPersonsInFam &&
                  errors.numPersonsInFam !== undefined && {
                    content: errors.numPersonsInFam,
                    pointing: "above",
                  }
                }
                width={8}
                placeholder="Number of Persons in Family Unit (# in household)"
                name="numPersonsInFam"
                value={values.numPersonsInFam}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.houseHoldIncome &&
                  errors.houseHoldIncome !== undefined && {
                    content: errors.houseHoldIncome,
                    pointing: "above",
                  }
                }
                width={10}
                placeholder="Gross Annual Household Income (before taxes and deductions)"
                name="houseHoldIncome"
                value={values.houseHoldIncome}
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
                disabled={isSubmitting}
                icon="arrow left"
                content={`Page ${pageNo - 1}`}
                labelPosition="left"
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

export default Page9;
