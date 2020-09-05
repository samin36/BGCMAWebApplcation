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
import {
  phoneRegex,
  ssnRegex,
  dateRegex,
  zipCodeRegex,
} from "../../Regex/regex";

/**
 * Pass in prevStep if the page number >= 1
 */
const Page6 = ({ nextStep, prevStep, setFormStates, setCancel }) => {
  const pageNo = 6; //Define the page number here
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
    nameOfClub: "",
    childFirstName: "",
    childMiddleInitial: "",
    childLastName: "",
    childBirthdate: "",
    childAge: "",
    childGender: "",
    childRace: "",
    childCellPhone: "",
    childSSN: "",
    childSchoolDistrict: "",
    childSchoolName: "",
    childGrade: "",
    childAbsences: "",
    clubMemberFor: "",
    parentEmail: "",
    parentCellPhone: "",
    streetAddress: "",
    zipCode: "",
    county: "",
    city: "",
    memberFromSingleParentHousehold: "",
    genderOfHeadOfHousehold: "",
    memberReceives: "",
    memberLivesWith: "",
    memberLivesWithOther: "",
    primaryLanguageSpokenInHome: "",
    militaryHousehold: "",
    liveOnBase: "",
    memberAllergies: "",
    memberAllergiesOther: "",
    memberMedications: "",
    memberMedicationsOther: "",
    memberPescriptionMedication: "",
    memberPescriptionMedicationNames: "",
    memberPrescriptionClubHours: "",
    physicianName: "",
    physicianCellPhone: "",
    insuranceCompany: "",
    insuranceCompanyPolicyNumber: "",
  };

  const memberInfoValidationSchema = yup.object().shape({
    nameOfClub: yup.string(),
    childFirstName: yup.string().required("Child's First name is required"),
    childMiddleInitial: yup.string().max(1, "Initial must be a single letter"),
    childLastName: yup.string().required("Child's Last name is required"),
    childBirthdate: yup
      .string()
      .required("Birthdate is required as MM/DD/YYYY")
      .matches(dateRegex, "Date must be in the form MM/DD/YYYY"),
    childAge: yup
      .number()
      .min(6, "Minimum age is 6")
      .max(18, "Maximum age is 18")
      .required("Child's Age is required"),
    childGender: yup.string().required("Gender must be selected"),
    childRace: yup.string().required("Race must be selected"),
    childCellPhone: yup
      .string()
      .matches(phoneRegex, "Phone must be in the form xxx-xxx-xxxx."),
    childSSN: yup
      .string()
      .required("Child's SSN is required")
      .matches(ssnRegex, "SSN must be in the form xxx-xx-xxxx"),
    childSchoolDistrict: yup
      .string()
      .required("Child's School district is required"),
    childSchoolName: yup.string().required("Child's school name is required"),
    childGrade: yup
      .number()
      .required("Child's grade (as a number) is required."),
    childAbsences: yup
      .number()
      .required("Total number of absences are required"),
    clubMemberFor: yup
      .string()
      .required("Club Member duration must be selected"),
    parentEmail: yup
      .string()
      .required("Parent's email is required")
      .email("Please make sure email is formatted correctly"),
    parentCellPhone: yup
      .string()
      .matches(phoneRegex, "Phone must be in the form xxx-xxx-xxxx"),
    streetAddress: yup.string().required("Street address is required"),
    zipCode: yup
      .string()
      .required("Zip code is required")
      .matches(
        zipCodeRegex,
        "Please make sure your zip code is formatted correctly"
      ),
    county: yup.string().required("County is required"),
    city: yup.string().required("City is required"),
  });

  const householdInfoValidationSchema = yup.object().shape({
    memberFromSingleParentHousehold: yup
      .string()
      .required("Please select Yes or No"),
    genderOfHeadOfHousehold: yup.string().required("Please select a gender"),
    memberReceives: yup
      .string()
      .required("Please select from one of the options"),
    memberLivesWith: yup
      .string()
      .required(
        "Please select from one of the options. For other, please specify"
      ),
    memberLivesWithOther: yup.string(),
    primaryLanguageSpokenInHome: yup
      .string()
      .required("Language spoken in home is required"),
    militaryHousehold: yup
      .string()
      .required("Please select from one of the options"),
    liveOnBase: yup.string().required("Please select Yes or No"),
  });

  const memberMedicalProfileValidationSchema = yup.object().shape({
    memberAllergies: yup
      .string()
      .required("Please select any allergies. For other, please specify"),
    memberAllergiesOther: yup
      .string()
      .default("None")
      .required("Please specify"),
    memberMedications: yup
      .string()
      .required(
        "Please select any medical conditions. For other, please specify"
      ),
    memberMedicationsOther: yup.string(),
    memberPescriptionMedication: yup
      .string()
      .required("Please select Yes or No"),
    memberPescriptionMedicationNames: yup.string(),

    memberPrescriptionClubHours: yup.string(),
    physicianName: yup.string().required("Physician's name is required"),
    physicianCellPhone: yup
      .string()
      .required("Physician's phone is required")
      .matches(phoneRegex, "Phone number must be in the form xxx-xxx-xxxx"),
    insuranceCompany: yup
      .string()
      .required("Name of insurance company is required"),
    insuranceCompanyPolicyNumber: yup
      .number()
      .required("Insurance policy number is required"),
  });

  const validationSchema = yup
    .object()
    .concat(memberInfoValidationSchema)
    .concat(householdInfoValidationSchema)
    .concat(memberMedicalProfileValidationSchema);

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
        <Container textAlign="center" fluid style={{ padding: "0 10em" }}>
          <Header as="h1" textAlign="center">
            Membership Application
          </Header>
          <Header as="h3">
            Please fill out the application completely. BGCMA will NOT accept
            incomplete applications.
          </Header>
          <Divider horizontal content="Member Info" />
          <Form size="big">
            <Form.Group widths="equal" inline>
              <Form.Input
                label="Has your child ever been a member at another club?"
                labelPosition="left"
                error={
                  touched.nameOfClub &&
                  errors.nameOfClub !== undefined && {
                    content: errors.nameOfClub,
                    pointing: "above",
                  }
                }
                placeholder="Name of club"
                name="nameOfClub"
                value={values.nameOfClub}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.childFirstName &&
                  errors.childFirstName !== undefined && {
                    content: errors.childFirstName,
                    pointing: "above",
                  }
                }
                width={6}
                placeholder="First Name"
                name="childFirstName"
                value={values.childFirstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.childMiddleInitial &&
                  errors.childMiddleInitial !== undefined && {
                    content: errors.childMiddleInitial,
                    pointing: "above",
                  }
                }
                width={4}
                placeholder="Middle Initial"
                name="childMiddleInitial"
                value={values.childMiddleInitial}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.childLastName &&
                  errors.childLastName !== undefined && {
                    content: errors.childLastName,
                    pointing: "above",
                  }
                }
                width={6}
                placeholder="Last Name"
                name="childLastName"
                value={values.childLastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.childBirthdate &&
                  errors.childBirthdate !== undefined && {
                    content: errors.childBirthdate,
                    pointing: "above",
                  }
                }
                placeholder="Birthdate (MM/DD/YYYY)"
                name="childBirthdate"
                value={values.childBirthdate}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.childAge &&
                  errors.childAge !== undefined && {
                    content: errors.childAge,
                    pointing: "above",
                  }
                }
                placeholder="Age"
                name="childAge"
                value={values.childAge}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.childCellPhone &&
                  errors.childCellPhone !== undefined && {
                    content: errors.childCellPhone,
                    pointing: "above",
                  }
                }
                placeholder="Cell Phone (Youth)"
                name="childCellPhone"
                value={values.childCellPhone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.childSSN &&
                  errors.childSSN !== undefined && {
                    content: errors.childSSN,
                    pointing: "above",
                  }
                }
                placeholder="SSN (Youth)"
                name="childSSN"
                value={values.childSSN}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Grid>
              <Grid.Column width={4}>
                <Segment textAlign="left" size="big">
                  <Form.Group grouped>
                    <label>Race/Ethnicity: </label>
                    <Icon name="asterisk" color="red" size="small" corner />
                    <Form.Radio
                      name="childRace"
                      value="Black or African American"
                      label="Black or African American"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("childRace", value)
                      }
                      checked={values.childRace === "Black or African American"}
                      error={
                        touched.childRace && errors.childRace !== undefined
                      }
                    />
                    <Form.Radio
                      name="childRace"
                      value="White/Caucasian"
                      label="White/Caucasian"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("childRace", value)
                      }
                      checked={values.childRace === "White/Caucasian"}
                      error={
                        touched.childRace && errors.childRace !== undefined
                      }
                    />
                    <Form.Radio
                      name="childRace"
                      value="Hispanic/Latino"
                      label="Hispanic/Latino"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("childRace", value)
                      }
                      checked={values.childRace === "Hispanic/Latino"}
                      error={
                        touched.childRace && errors.childRace !== undefined
                      }
                    />
                    <Form.Radio
                      name="childRace"
                      value="Hawaiian/Pacific Islander"
                      label="Hawaiian/Pacific Islander"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("childRace", value)
                      }
                      checked={values.childRace === "Hawaiian/Pacific Islander"}
                      error={
                        touched.childRace && errors.childRace !== undefined
                      }
                    />
                    <Form.Radio
                      name="childRace"
                      value="Asian"
                      label="Asian"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("childRace", value)
                      }
                      checked={values.childRace === "Asian"}
                      error={
                        touched.childRace && errors.childRace !== undefined
                      }
                    />
                    <Form.Radio
                      name="childRace"
                      value="Native American"
                      label="Native American"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("childRace", value)
                      }
                      checked={values.childRace === "Native American"}
                      error={
                        touched.childRace && errors.childRace !== undefined
                      }
                    />
                    <Form.Radio
                      name="childRace"
                      value="Bi-Racial"
                      label="Bi-Racial"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("childRace", value)
                      }
                      checked={values.childRace === "Bi-Racial"}
                      error={
                        touched.childRace && errors.childRace !== undefined
                      }
                    />
                    <Form.Radio
                      name="childRace"
                      value="Multi-Racial"
                      label="Multi-Racial"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("childRace", value)
                      }
                      checked={values.childRace === "Multi-Racial"}
                      error={
                        touched.childRace && errors.childRace !== undefined
                      }
                    />
                    <Form.Radio
                      name="childRace"
                      value="Other Race"
                      label="Other Race"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("childRace", value)
                      }
                      checked={values.childRace === "Other Race"}
                      error={
                        touched.childRace &&
                        errors.childRace !== undefined && {
                          content: errors.childRace,
                          pointing: "above",
                        }
                      }
                    />
                  </Form.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column width={4} verticalAlign="middle">
                <Grid.Row>
                  <Segment textAlign="left" size="big">
                    <Form.Group grouped>
                      <label>Gender: </label>
                      <Icon name="asterisk" color="red" size="small" corner />
                      <Form.Radio
                        name="childGender"
                        value="Female"
                        label="Female"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("childGender", value)
                        }
                        checked={values.childGender === "Female"}
                        error={
                          touched.childGender &&
                          errors.childGender !== undefined
                        }
                      />
                      <Form.Radio
                        name="childGender"
                        value="Male"
                        label="Male"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("childGender", value)
                        }
                        checked={values.childGender === "Male"}
                        error={
                          touched.childGender &&
                          errors.childGender !== undefined
                        }
                      />
                      <Form.Radio
                        name="childGender"
                        value="Non-Binary"
                        label="Non-Binary"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("childGender", value)
                        }
                        checked={values.childGender === "Non-Binary"}
                        error={
                          touched.childGender &&
                          errors.childGender !== undefined && {
                            content: errors.childGender,
                            pointing: "above",
                          }
                        }
                      />
                    </Form.Group>
                  </Segment>
                </Grid.Row>
                <Grid.Row>
                  <Segment textAlign="left" size="big">
                    <Form.Group grouped>
                      <label>Club Member for:</label>
                      <Icon name="asterisk" color="red" size="small" corner />

                      <Form.Radio
                        name="clubMemberFor"
                        value="Less than 1 Year"
                        label="Less than 1 Year"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("clubMemberFor", value)
                        }
                        checked={values.clubMemberFor === "Less than 1 Year"}
                        error={
                          touched.clubMemberFor &&
                          errors.clubMemberFor !== undefined
                        }
                      />
                      <Form.Radio
                        name="clubMemberFor"
                        value="1-2 Years"
                        label="1-2 Years"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("clubMemberFor", value)
                        }
                        checked={values.clubMemberFor === "1-2 Years"}
                        error={
                          touched.clubMemberFor &&
                          errors.clubMemberFor !== undefined
                        }
                      />
                      <Form.Radio
                        name="clubMemberFor"
                        value="2 or More Years"
                        label="2 or More Years"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("clubMemberFor", value)
                        }
                        checked={values.clubMemberFor === "2 or More Years"}
                        error={
                          touched.clubMemberFor &&
                          errors.clubMemberFor !== undefined && {
                            content: errors.clubMemberFor,
                            pointing: "above",
                          }
                        }
                      />
                    </Form.Group>
                  </Segment>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={8} verticalAlign="middle">
                <Grid.Row divided stretched>
                  <Form.Input
                    icon={<Icon name="asterisk" size="small" color="red" />}
                    error={
                      touched.childSchoolDistrict &&
                      errors.childSchoolDistrict !== undefined && {
                        content: errors.childSchoolDistrict,
                        pointing: "above",
                      }
                    }
                    placeholder="School District"
                    name="childSchoolDistrict"
                    value={values.childSchoolDistrict}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Divider hidden />
                  <Form.Input
                    icon={<Icon name="asterisk" size="small" color="red" />}
                    error={
                      touched.childSchoolName &&
                      errors.childSchoolName !== undefined && {
                        content: errors.childSchoolName,
                        pointing: "above",
                      }
                    }
                    placeholder="School Name"
                    name="childSchoolName"
                    value={values.childSchoolName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Divider hidden />
                  <Form.Input
                    icon={<Icon name="asterisk" size="small" color="red" />}
                    error={
                      touched.childGrade &&
                      errors.childGrade !== undefined && {
                        content: errors.childGrade,
                        pointing: "above",
                      }
                    }
                    placeholder="Grade during 2020-21 School Year"
                    name="childGrade"
                    value={values.childGrade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Divider hidden />
                  <Form.Input
                    icon={<Icon name="asterisk" size="small" color="red" />}
                    error={
                      touched.childAbsences &&
                      errors.childAbsences !== undefined && {
                        content: errors.childAbsences,
                        pointing: "above",
                      }
                    }
                    placeholder="Total absences from school during 2019-2020 School Year"
                    name="childAbsences"
                    value={values.childAbsences}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid.Row>
              </Grid.Column>
            </Grid>
            <Divider hidden />
            <Form.Group>
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.streetAddress &&
                  errors.streetAddress !== undefined && {
                    content: errors.streetAddress,
                    pointing: "above",
                  }
                }
                width={10}
                placeholder="Street Address"
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
                width={6}
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.county &&
                  errors.county !== undefined && {
                    content: errors.county,
                    pointing: "above",
                  }
                }
                width={3}
                placeholder="County"
                name="county"
                value={values.county}
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
                width={3}
                placeholder="Zip Code"
                name="zipCode"
                value={values.zipCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.parentCellPhone &&
                  errors.parentCellPhone !== undefined && {
                    content: errors.parentCellPhone,
                    pointing: "above",
                  }
                }
                width={4}
                placeholder="Cell Phone (Parent)"
                name="parentCellPhone"
                value={values.parentCellPhone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.parentEmail &&
                  errors.parentEmail !== undefined && {
                    content: errors.parentEmail,
                    pointing: "above",
                  }
                }
                width={6}
                placeholder="Email Address (Parent)"
                name="parentEmail"
                value={values.parentEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Divider horizontal content="Household Info" />

            <Grid centered>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Grid.Row>
                    <Segment textAlign="left" size="big">
                      <Form.Group grouped>
                        <label>
                          Is Member from a Single Parent Household:{" "}
                        </label>
                        <Icon name="asterisk" color="red" size="small" corner />
                        <Form.Radio
                          name="memberFromSingleParentHousehold"
                          value="Yes"
                          label="Yes"
                          onBlur={handleBlur}
                          onChange={(_, { value }) =>
                            setFieldValue(
                              "memberFromSingleParentHousehold",
                              value
                            )
                          }
                          checked={
                            values.memberFromSingleParentHousehold === "Yes"
                          }
                          error={
                            touched.memberFromSingleParentHousehold &&
                            errors.memberFromSingleParentHousehold !==
                              undefined && {
                              content: errors.memberFromSingleParentHousehold,
                              pointing: "above",
                            }
                          }
                        />
                        <Form.Radio
                          name="memberFromSingleParentHousehold"
                          value="No"
                          label="No"
                          onBlur={handleBlur}
                          onChange={(_, { value }) =>
                            setFieldValue(
                              "memberFromSingleParentHousehold",
                              value
                            )
                          }
                          checked={
                            values.memberFromSingleParentHousehold === "No"
                          }
                          error={
                            touched.memberFromSingleParentHousehold &&
                            errors.memberFromSingleParentHousehold !== undefined
                          }
                        />
                      </Form.Group>
                    </Segment>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Segment textAlign="left" size="big">
                        <Form.Group grouped>
                          <label>Gender of Head of Household:</label>
                          <Icon
                            name="asterisk"
                            color="red"
                            size="small"
                            corner
                          />
                          <Form.Radio
                            name="genderOfHeadOfHousehold"
                            value="Male"
                            label="Male"
                            onBlur={handleBlur}
                            onChange={(_, { value }) =>
                              setFieldValue("genderOfHeadOfHousehold", value)
                            }
                            checked={values.genderOfHeadOfHousehold === "Male"}
                            error={
                              touched.genderOfHeadOfHousehold &&
                              errors.genderOfHeadOfHousehold !== undefined
                            }
                          />
                          <Form.Radio
                            name="genderOfHeadOfHousehold"
                            value="Female"
                            label="Female"
                            onBlur={handleBlur}
                            onChange={(_, { value }) =>
                              setFieldValue("genderOfHeadOfHousehold", value)
                            }
                            checked={
                              values.genderOfHeadOfHousehold === "Female"
                            }
                            error={
                              touched.genderOfHeadOfHousehold &&
                              errors.genderOfHeadOfHousehold !== undefined
                            }
                          />
                          <Form.Radio
                            name="genderOfHeadOfHousehold"
                            value="Non-Binary"
                            label="Non-Binary"
                            onBlur={handleBlur}
                            onChange={(_, { value }) =>
                              setFieldValue("genderOfHeadOfHousehold", value)
                            }
                            checked={
                              values.genderOfHeadOfHousehold === "Non-Binary"
                            }
                            error={
                              touched.genderOfHeadOfHousehold &&
                              errors.genderOfHeadOfHousehold !== undefined && {
                                content: errors.genderOfHeadOfHousehold,
                                pointing: "above",
                              }
                            }
                          />
                        </Form.Group>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Segment textAlign="left" size="big">
                    <Form.Group grouped>
                      <label>Member Lives With: </label>
                      <Icon name="asterisk" color="red" size="small" corner />
                      <Form.Radio
                        name="memberLivesWith"
                        value="Both Parents"
                        label="Both Parents"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberLivesWith", value)
                        }
                        checked={values.memberLivesWith === "Both Parents"}
                        error={
                          touched.memberLivesWith &&
                          errors.memberLivesWith !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberLivesWith"
                        value="Mother"
                        label="Mother"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberLivesWith", value)
                        }
                        checked={values.memberLivesWith === "Mother"}
                        error={
                          touched.memberLivesWith &&
                          errors.memberLivesWith !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberLivesWith"
                        value="Father"
                        label="Father"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberLivesWith", value)
                        }
                        checked={values.memberLivesWith === "Father"}
                        error={
                          touched.memberLivesWith &&
                          errors.memberLivesWith !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberLivesWith"
                        value="Aunt/Uncle"
                        label="Aunt/Uncle"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberLivesWith", value)
                        }
                        checked={values.memberLivesWith === "Aunt/Uncle"}
                        error={
                          touched.memberLivesWith &&
                          errors.memberLivesWith !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberLivesWith"
                        value="Grandparent(s)"
                        label="Grandparent(s)"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberLivesWith", value)
                        }
                        checked={values.memberLivesWith === "Grandparent(s)"}
                        error={
                          touched.memberLivesWith &&
                          errors.memberLivesWith !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberLivesWith"
                        value="Foster Care/DFACS"
                        label="Foster Care/DFACS"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberLivesWith", value)
                        }
                        checked={values.memberLivesWith === "Foster Care/DFACS"}
                        error={
                          touched.memberLivesWith &&
                          errors.memberLivesWith !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberLivesWith"
                        value="Other"
                        label="Other"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberLivesWith", value)
                        }
                        checked={values.memberLivesWith === "Other"}
                        error={
                          touched.memberLivesWith &&
                          errors.memberLivesWith !== undefined && {
                            content: errors.memberLivesWith,
                            pointing: "above",
                          }
                        }
                      />
                      {values.memberLivesWith === "Other" && (
                        <Form.Input
                          fluid
                          size="small"
                          error={
                            touched.memberLivesWithOther &&
                            errors.memberLivesWithOther !== undefined && {
                              content: errors.memberLivesWithOther,
                              pointing: "above",
                            }
                          }
                          placeholder="Specify other"
                          name="memberLivesWithOther"
                          value={values.memberLivesWithOther}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={values.memberLivesWith !== "Other"}
                        />
                      )}
                    </Form.Group>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Segment textAlign="left" size="big">
                    <Form.Group grouped>
                      <label>Military Household: </label>
                      <Icon name="asterisk" color="red" size="small" corner />
                      <Form.Radio
                        name="militaryHousehold"
                        value="No, not military"
                        label="No, not military"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("militaryHousehold", value)
                        }
                        checked={
                          values.militaryHousehold === "No, not military"
                        }
                        error={
                          touched.militaryHousehold &&
                          errors.militaryHousehold !== undefined
                        }
                      />
                      <Form.Radio
                        name="militaryHousehold"
                        value="Air Force"
                        label="Air Force"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("militaryHousehold", value)
                        }
                        checked={values.militaryHousehold === "Air Force"}
                        error={
                          touched.militaryHousehold &&
                          errors.militaryHousehold !== undefined
                        }
                      />
                      <Form.Radio
                        name="militaryHousehold"
                        value="Army"
                        label="Army"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("militaryHousehold", value)
                        }
                        checked={values.militaryHousehold === "Army"}
                        error={
                          touched.militaryHousehold &&
                          errors.militaryHousehold !== undefined
                        }
                      />
                      <Form.Radio
                        name="militaryHousehold"
                        value="Coast Guard"
                        label="Coast Guard"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("militaryHousehold", value)
                        }
                        checked={values.militaryHousehold === "Coast Guard"}
                        error={
                          touched.militaryHousehold &&
                          errors.militaryHousehold !== undefined
                        }
                      />
                      <Form.Radio
                        name="militaryHousehold"
                        value="Navy"
                        label="Navy"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("militaryHousehold", value)
                        }
                        checked={values.militaryHousehold === "Navy"}
                        error={
                          touched.militaryHousehold &&
                          errors.militaryHousehold !== undefined
                        }
                      />
                      <Form.Radio
                        name="militaryHousehold"
                        value="Marine Corps"
                        label="Marine Corps"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("militaryHousehold", value)
                        }
                        checked={values.militaryHousehold === "Marine Corps"}
                        error={
                          touched.militaryHousehold &&
                          errors.militaryHousehold !== undefined && {
                            content: errors.militaryHousehold,
                            pointing: "above",
                          }
                        }
                      />
                    </Form.Group>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Grid.Row>
                    <Segment textAlign="left" size="big">
                      <Form.Group grouped>
                        <label>Live on Base?</label>
                        <Icon name="asterisk" color="red" size="small" corner />
                        <Form.Radio
                          name="liveOnBase"
                          value="Yes"
                          label="Yes"
                          onBlur={handleBlur}
                          onChange={(_, { value }) =>
                            setFieldValue("liveOnBase", value)
                          }
                          checked={values.liveOnBase === "Yes"}
                          error={
                            touched.liveOnBase &&
                            errors.liveOnBase !== undefined
                          }
                        />
                        <Form.Radio
                          name="liveOnBase"
                          value="No"
                          label="No"
                          onBlur={handleBlur}
                          onChange={(_, { value }) =>
                            setFieldValue("liveOnBase", value)
                          }
                          checked={values.liveOnBase === "No"}
                          error={
                            touched.liveOnBase &&
                            errors.liveOnBase !== undefined && {
                              content: errors.liveOnBase,
                              pointing: "above",
                            }
                          }
                        />
                      </Form.Group>
                    </Segment>
                  </Grid.Row>
                  <Grid.Row>
                    <Segment textAlign="left" size="big">
                      <Form.Group grouped>
                        <label>Member Receives</label>
                        <Icon name="asterisk" color="red" size="small" corner />
                        <Form.Radio
                          name="memberReceives"
                          value="Free Lunch"
                          label="Free Lunch"
                          onBlur={handleBlur}
                          onChange={(_, { value }) =>
                            setFieldValue("memberReceives", value)
                          }
                          checked={values.memberReceives === "Free Lunch"}
                          error={
                            touched.memberReceives &&
                            errors.memberReceives !== undefined
                          }
                        />
                        <Form.Radio
                          name="memberReceives"
                          value="Reduced Lunch"
                          label="Reduced Lunch"
                          onBlur={handleBlur}
                          onChange={(_, { value }) =>
                            setFieldValue("memberReceives", value)
                          }
                          checked={values.memberReceives === "Reduced Lunch"}
                          error={
                            touched.memberReceives &&
                            errors.memberReceives !== undefined
                          }
                        />
                        <Form.Radio
                          name="memberReceives"
                          value="None"
                          label="None"
                          onBlur={handleBlur}
                          onChange={(_, { value }) =>
                            setFieldValue("memberReceives", value)
                          }
                          checked={values.memberReceives === "None"}
                          error={
                            touched.memberReceives &&
                            errors.memberReceives !== undefined && {
                              content: errors.memberReceives,
                              pointing: "above",
                            }
                          }
                        />
                      </Form.Group>
                    </Segment>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Form.Group grouped>
                    <Form.Input
                      fluid
                      icon={
                        <Icon name="asterisk" color="red" size="small" corner />
                      }
                      error={
                        touched.primaryLanguageSpokenInHome &&
                        errors.primaryLanguageSpokenInHome !== undefined && {
                          content: errors.primaryLanguageSpokenInHome,
                          pointing: "above",
                        }
                      }
                      placeholder="Primary language spoken in home"
                      name="primaryLanguageSpokenInHome"
                      value={values.primaryLanguageSpokenInHome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider horizontal content="Member's Medical Profile" />
            <Grid centered>
              <Grid.Row>
                <Grid.Column width={5}>
                  <Segment textAlign="left" size="big">
                    <Form.Group grouped>
                      <label>
                        Allergies or Dietary religious restrictions?
                      </label>
                      <Icon name="asterisk" color="red" size="small" corner />
                      <Form.Radio
                        name="memberAllergies"
                        value="Beef"
                        label="Beef"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberAllergies", value)
                        }
                        checked={values.memberAllergies === "Beef"}
                        error={
                          touched.memberAllergies &&
                          errors.memberAllergies !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberAllergies"
                        value="Pork"
                        label="Pork"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberAllergies", value)
                        }
                        checked={values.memberAllergies === "Pork"}
                        error={
                          touched.memberAllergies &&
                          errors.memberAllergies !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberAllergies"
                        value="Fish/Shellfish"
                        label="Fish/Shellfish"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberAllergies", value)
                        }
                        checked={values.memberAllergies === "Fish/Shellfish"}
                        error={
                          touched.memberAllergies &&
                          errors.memberAllergies !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberAllergies"
                        value="Milk/Dairy products"
                        label="Milk/Dairy products"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberAllergies", value)
                        }
                        checked={
                          values.memberAllergies === "Milk/Dairy products"
                        }
                        error={
                          touched.memberAllergies &&
                          errors.memberAllergies !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberAllergies"
                        value="Peanuts/Peanut butter"
                        label="Peanuts/Peanut butter"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberAllergies", value)
                        }
                        checked={
                          values.memberAllergies === "Peanuts/Peanut butter"
                        }
                        error={
                          touched.memberAllergies &&
                          errors.memberAllergies !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberAllergies"
                        value="Tree Nuts"
                        label="Tree Nuts"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberAllergies", value)
                        }
                        checked={values.memberAllergies === "Tree Nuts"}
                        error={
                          touched.memberAllergies &&
                          errors.memberAllergies !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberAllergies"
                        value="Wheat/Gluten"
                        label="Wheat/Gluten"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberAllergies", value)
                        }
                        checked={values.memberAllergies === "Wheat/Gluten"}
                        error={
                          touched.memberAllergies &&
                          errors.memberAllergies !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberAllergies"
                        value="Drug allergy"
                        label="Drug allergy (Provide name below)"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberAllergies", value)
                        }
                        checked={values.memberAllergies === "Drug allergy"}
                        error={
                          touched.memberAllergies &&
                          errors.memberAllergies !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberAllergies"
                        value="Other"
                        label="Other"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberAllergies", value)
                        }
                        checked={values.memberAllergies === "Other"}
                        error={
                          touched.memberAllergies &&
                          errors.memberAllergies !== undefined && {
                            content: errors.memberAllergies,
                            pointing: "above",
                          }
                        }
                      />
                      {(values.memberAllergies === "Other" ||
                        values.memberAllergies === "Drug allergy") && (
                        <Form.TextArea
                          as={Form.Input}
                          error={
                            touched.memberAllergiesOther &&
                            errors.memberAllergiesOther !== undefined && {
                              content: errors.memberAllergiesOther,
                              pointing: "above",
                            }
                          }
                          placeholder={
                            values.memberAllergies === "Drug allergy"
                              ? "Please specify any drug allergies"
                              : values.memberAllergies === "Other"
                              ? "Please specify other"
                              : null
                          }
                          name="memberAllergiesOther"
                          value={values.memberAllergiesOther}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={
                            values.memberAllergies !== "Other" &&
                            values.memberAllergies !== "Drug allergy"
                          }
                        />
                      )}
                    </Form.Group>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Segment textAlign="left" size="big">
                    <Form.Group grouped>
                      <label>Any special medical conditions?</label>
                      <Icon name="asterisk" color="red" size="small" corner />
                      <Form.Radio
                        name="memberMedications"
                        value="ADD/ADHD"
                        label="ADD/ADHD"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberMedications", value)
                        }
                        checked={values.memberMedications === "ADD/ADHD"}
                        error={
                          touched.memberMedications &&
                          errors.memberMedications !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberMedications"
                        value="Asthma"
                        label="Asthma"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberMedications", value)
                        }
                        checked={values.memberMedications === "Asthma"}
                        error={
                          touched.memberMedications &&
                          errors.memberMedications !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberMedications"
                        value="Diabetes"
                        label="Diabetes"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberMedications", value)
                        }
                        checked={values.memberMedications === "Diabetes"}
                        error={
                          touched.memberMedications &&
                          errors.memberMedications !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberMedications"
                        value="Emotional/Behavior disorder"
                        label="Emotional/Behavior disorder"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberMedications", value)
                        }
                        checked={
                          values.memberMedications ===
                          "Emotional/Behavior disorder"
                        }
                        error={
                          touched.memberMedications &&
                          errors.memberMedications !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberMedications"
                        value="Epilepsy/Seizure disorder"
                        label="Epilepsy/Seizure disorder"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberMedications", value)
                        }
                        checked={
                          values.memberMedications ===
                          "Epilepsy/Seizure disorder"
                        }
                        error={
                          touched.memberMedications &&
                          errors.memberMedications !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberMedications"
                        value="Gastrointenstinal disorder"
                        label="Gastrointenstinal disorder"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberMedications", value)
                        }
                        checked={
                          values.memberMedications ===
                          "Gastrointenstinal disorder"
                        }
                        error={
                          touched.memberMedications &&
                          errors.memberMedications !== undefined
                        }
                      />
                      <Form.Radio
                        name="memberMedications"
                        value="Other"
                        label="Other"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("memberMedications", value)
                        }
                        checked={values.memberMedications === "Other"}
                        error={
                          touched.memberMedications &&
                          errors.memberMedications !== undefined && {
                            content: errors.memberMedications,
                            pointing: "above",
                          }
                        }
                      />
                      {values.memberMedications === "Other" && (
                        <Form.TextArea
                          as={Form.Input}
                          error={
                            touched.memberMedicationsOther &&
                            errors.memberMedicationsOther !== undefined && {
                              content: errors.memberMedicationsOther,
                              pointing: "above",
                            }
                          }
                          placeholder="Please specify any other medical conditions"
                          name="memberMedicationsOther"
                          value={values.memberMedicationsOther}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={values.memberMedications !== "Other"}
                        />
                      )}
                    </Form.Group>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={6}>
                  <Grid.Row>
                    <Segment textAlign="left" size="big">
                      <Form.Group grouped>
                        <label>
                          Does member take any pescription medication?
                        </label>
                        <Icon name="asterisk" color="red" size="small" corner />
                        <Form.Radio
                          name="memberPescriptionMedication"
                          value="Yes"
                          label="Yes"
                          onBlur={handleBlur}
                          onChange={(_, { value }) =>
                            setFieldValue("memberPescriptionMedication", value)
                          }
                          checked={values.memberPescriptionMedication === "Yes"}
                          error={
                            touched.memberPescriptionMedication &&
                            errors.memberPescriptionMedication !==
                              undefined && {
                              content: errors.memberPescriptionMedication,
                              pointing: "above",
                            }
                          }
                        />
                        <Form.Radio
                          name="memberPescriptionMedication"
                          value="No"
                          label="No"
                          onBlur={handleBlur}
                          onChange={(_, { value }) =>
                            setFieldValue("memberPescriptionMedication", value)
                          }
                          checked={values.memberPescriptionMedication === "No"}
                          error={
                            touched.memberPescriptionMedication &&
                            errors.memberPescriptionMedication !== undefined
                          }
                        />
                        {values.memberPescriptionMedication === "Yes" && (
                          <Form.TextArea
                            as={Form.Input}
                            error={
                              touched.memberPescriptionMedicationNames &&
                              errors.memberPescriptionMedicationNames !==
                                undefined && {
                                content:
                                  errors.memberPescriptionMedicationNames,
                                pointing: "above",
                              }
                            }
                            placeholder="Please specify any other medical conditions"
                            name="memberPescriptionMedicationNames"
                            value={values.memberPescriptionMedicationNames}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={
                              values.memberPescriptionMedication === "No"
                            }
                          />
                        )}
                      </Form.Group>
                    </Segment>
                  </Grid.Row>
                  <Grid.Row>
                    <Segment
                      textAlign="left"
                      size="big"
                      disabled={values.memberPescriptionMedication !== "Yes"}
                    >
                      <Form.Group grouped>
                        <label>
                          Will member need to take prescription medication
                          during Club hours?
                        </label>
                        <Form.Radio
                          name="memberPrescriptionClubHours"
                          value="Yes"
                          label="Yes"
                          onBlur={handleBlur}
                          onChange={(_, { value }) =>
                            setFieldValue("memberPrescriptionClubHours", value)
                          }
                          checked={values.memberPrescriptionClubHours === "Yes"}
                          error={
                            touched.memberPrescriptionClubHours &&
                            errors.memberPrescriptionClubHours !==
                              undefined && {
                              content: errors.memberPrescriptionClubHours,
                              pointing: "above",
                            }
                          }
                        />
                        <Form.Radio
                          name="memberPrescriptionClubHours"
                          value="No"
                          label="No"
                          onBlur={handleBlur}
                          onChange={(_, { value }) =>
                            setFieldValue("memberPrescriptionClubHours", value)
                          }
                          checked={values.memberPrescriptionClubHours === "No"}
                          error={
                            touched.memberPrescriptionClubHours &&
                            errors.memberPrescriptionClubHours !== undefined
                          }
                        />
                      </Form.Group>
                    </Segment>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      icon={
                        <Icon name="asterisk" color="red" size="small" corner />
                      }
                      error={
                        touched.physicianName &&
                        errors.physicianName !== undefined && {
                          content: errors.physicianName,
                          pointing: "above",
                        }
                      }
                      placeholder="Physician Name"
                      name="physicianName"
                      value={values.physicianName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Form.Input
                      fluid
                      icon={
                        <Icon name="asterisk" color="red" size="small" corner />
                      }
                      error={
                        touched.physicianCellPhone &&
                        errors.physicianCellPhone !== undefined && {
                          content: errors.physicianCellPhone,
                          pointing: "above",
                        }
                      }
                      placeholder="Cell Phone (Physician)"
                      name="physicianCellPhone"
                      value={values.physicianCellPhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      icon={
                        <Icon name="asterisk" color="red" size="small" corner />
                      }
                      error={
                        touched.insuranceCompany &&
                        errors.insuranceCompany !== undefined && {
                          content: errors.insuranceCompany,
                          pointing: "above",
                        }
                      }
                      placeholder="Insurance Company Name"
                      name="insuranceCompany"
                      value={values.insuranceCompany}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Form.Input
                      fluid
                      icon={
                        <Icon name="asterisk" color="red" size="small" corner />
                      }
                      error={
                        touched.insuranceCompanyPolicyNumber &&
                        errors.insuranceCompanyPolicyNumber !== undefined && {
                          content: errors.insuranceCompanyPolicyNumber,
                          pointing: "above",
                        }
                      }
                      placeholder="Insurance Policy Number"
                      name="insuranceCompanyPolicyNumber"
                      value={values.insuranceCompanyPolicyNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Form.Group>
              <Form.Button
                size="large"
                onClick={() => goToPrevPage(values)}
                primary
                floated="left"
                disabled={isSubmitting}
                icon="arrow left"
                style={{ padding: ".75em 2em" }}
                width={12}
              />
              <Form.Button
                size="large"
                onClick={() => setCancel(true)}
                disabled={isSubmitting}
                content="Cancel"
                style={{ padding: ".75em 2em" }}
                color="red"
                width={2}
              />
              <Form.Button
                size="large"
                type="submit"
                onClick={handleSubmit}
                primary
                floated="right"
                disabled={isSubmitting}
                icon="arrow right"
                style={{ padding: ".75em 2em" }}
                width={2}
              />
            </Form.Group>
            <Persist name={`page${pageNo}`} />
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default Page6;
