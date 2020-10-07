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
const Page13 = ({
  nextStep,
  prevStep,
  setFormStates,
  setCancel,
  initialData,
  isView,
  saveAndExitApplication,
}) => {
  const pageNo = 13; //Define the page number here
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
      familyUnitSize: "",
      yealyIncome: "",
      monthlyIncome: "",

      person1Name: "",
      person1Relationship: "",
      person1Birth: "",
      person1IncomeSource: "",
      person1grossMonthlyIncome: "",
      person1howOften: "",
      person2Name: "",
      person2Relationship: "",
      person2Birth: "",
      person2IncomeSource: "",
      person2grossMonthlyIncome: "",
      person2howOften: "",

      person3Name: "",
      person3Relationship: "",
      person3Birth: "",
      person3IncomeSource: "",
      person3grossMonthlyIncome: "",
      person3howOften: "",
      person4Name: "",
      person4Relationship: "",
      person4Birth: "",
      person4IncomeSource: "",
      person4grossMonthlyIncome: "",
      person4howOften: "",
      person5Name: "",
      person5Relationship: "",
      person5Birth: "",
      person5IncomeSource: "",
      person5grossMonthlyIncome: "",
      person5howOften: "",
      person6Name: "",
      person6Relationship: "",
      person6Birth: "",
      person6IncomeSource: "",
      person6grossMonthlyIncome: "",
      person6howOften: "",
    };
  }

  const page13validationSchema = yup.object().shape({
    familyUnitSize: yup.number().required("Family unit size is required"),
    yealyIncome: yup.number().required("Yearly income is required"),
    monthlyIncome: yup.number().required("Monthly income is required"),

    person1Name: yup
      .string()
      .required("Your first, middle, and last name is required"),
    person1Relationship: yup.string().required("Self is required"),
    person1Birth: yup
      .string()
      .required("Birthdate is required as MM/DD/YYYY")
      .matches(dateRegex, "Date must be in the form MM/DD/YYYY"),
    person1IncomeSource: yup.string().required("Source of income is required"),
    person1grossMonthlyIncome: yup
      .number()
      .required("Gross monthly income is required"),
    person1howOften: yup.string().required("How often recieved is required"),

    person2Name: yup
      .string()
      .required("Your first, middle, and last name is required"),
    person2Relationship: yup.string().required("Child is required"),
    person2Birth: yup
      .string()
      .required("Birthdate is required as MM/DD/YYYY")
      .matches(dateRegex, "Date must be in the form MM/DD/YYYY"),
    person2IncomeSource: yup.string().required("Source of income is required"),
    person2grossMonthlyIncome: yup
      .number()
      .required("Gross monthly income is required"),
    person2howOften: yup.string().required("How often recieved is required"),

    person3Birth: yup
      .string()
      .matches(dateRegex, "Date must be in the form MM/DD/YYYY"),
    person4Birth: yup
      .string()
      .matches(dateRegex, "Date must be in the form MM/DD/YYYY"),
    person5Birth: yup
      .string()
      .matches(dateRegex, "Date must be in the form MM/DD/YYYY"),
    person6Birth: yup
      .string()
      .matches(dateRegex, "Date must be in the form MM/DD/YYYY"),

    person3grossMonthlyIncome: yup.number(),
    person4grossMonthlyIncome: yup.number(),
    person5grossMonthlyIncome: yup.number(),
    person6grossMonthlyIncome: yup.number(),
  });

  const validationSchema = yup.object().concat(page13validationSchema);

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
            <b>Page 2 of 3 - DFCS AfterSchool Care Program Elgibility Form</b>
          </Header>
          <Header as="h2" textAlign="left">
            <b>Section 3</b>
          </Header>
          <Header as="h4" textAlign="left">
            {paragraph1}
          </Header>
          <Header textAlign="center" as="h1">
            <b>
              <u>
                Family Income Elgibility for the DFCS Afterschool Care Program
                Income Elgibility Guide
              </u>
            </b>
          </Header>
          <center>
            <img
              src={require("../../PageText/page13Section2Table.jpg")}
              width="1000"
              height=""
              alt="chart describing poverty level"
            />
          </center>
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
              <b>Section 4</b>
            </Header>
            <Header as="h4" textAlign="left">
              {paragraph4}
            </Header>
            <Header as="h2" textAlign="left">
              <b>Household Composition and Income</b>
            </Header>
            <Header as="h2" textAlign="left">
              <b>Gross Monthly Income is income before taxes and deductions</b>
            </Header>
            <Form.Group widths="2">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.person1Name &&
                  errors.person1Name !== undefined && {
                    content: errors.person1Name,
                    pointing: "above",
                  }
                }
                placeholder="Full Name"
                name="person1Name"
                value={values.person1Name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.person1Relationship &&
                  errors.person1Relationship !== undefined && {
                    content: errors.person1Relationship,
                    pointing: "above",
                  }
                }
                placeholder="Self"
                name="person1Relationship"
                value={values.person1Relationship}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.person1Birth &&
                  errors.person1Birth !== undefined && {
                    content: errors.person1Birth,
                    pointing: "above",
                  }
                }
                placeholder="Birth Date"
                name="person1Birth"
                value={values.person1Birth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.person1IncomeSource &&
                  errors.person1IncomeSource !== undefined && {
                    content: errors.person1IncomeSource,
                    pointing: "above",
                  }
                }
                placeholder="Income Source"
                name="person1IncomeSource"
                value={values.person1IncomeSource}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.person1grossMonthlyIncome &&
                  errors.person1grossMonthlyIncome !== undefined && {
                    content: errors.person1grossMonthlyIncome,
                    pointing: "above",
                  }
                }
                placeholder="Amount (Gross Monthly Income)"
                name="person1grossMonthlyIncome"
                value={values.person1grossMonthlyIncome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.person1howOften &&
                  errors.person1howOften !== undefined && {
                    content: errors.person1howOften,
                    pointing: "above",
                  }
                }
                placeholder="How often"
                name="person1howOften"
                value={values.person1howOften}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.person2Name &&
                  errors.person2Name !== undefined && {
                    content: errors.person2Name,
                    pointing: "above",
                  }
                }
                placeholder="Full Name"
                name="person2Name"
                value={values.person2Name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.person2Relationship &&
                  errors.person2Relationship !== undefined && {
                    content: errors.person2Relationship,
                    pointing: "above",
                  }
                }
                placeholder="Child"
                name="person2Relationship"
                value={values.person2Relationship}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.person2Birth &&
                  errors.person2Birth !== undefined && {
                    content: errors.person2Birth,
                    pointing: "above",
                  }
                }
                placeholder="Birth Date"
                name="person2Birth"
                value={values.person2Birth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.person2IncomeSource &&
                  errors.person2IncomeSource !== undefined && {
                    content: errors.person2IncomeSource,
                    pointing: "above",
                  }
                }
                placeholder="Income Source"
                name="person2IncomeSource"
                value={values.person2IncomeSource}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.person2grossMonthlyIncome &&
                  errors.person2grossMonthlyIncome !== undefined && {
                    content: errors.person2grossMonthlyIncome,
                    pointing: "above",
                  }
                }
                placeholder="Amount (Gross Monthly Income)"
                name="person2grossMonthlyIncome"
                value={values.person2grossMonthlyIncome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.person2howOften &&
                  errors.person2howOften !== undefined && {
                    content: errors.person2howOften,
                    pointing: "above",
                  }
                }
                placeholder="How often"
                name="person2howOften"
                value={values.person2howOften}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Input
                error={
                  touched.person3Name &&
                  errors.person3Name !== undefined && {
                    content: errors.person3Name,
                    pointing: "above",
                  }
                }
                placeholder="Full Name"
                name="person3Name"
                value={values.person3Name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person3Relationship &&
                  errors.person3Relationship !== undefined && {
                    content: errors.person3Relationship,
                    pointing: "above",
                  }
                }
                placeholder="Relationship"
                name="person3Relationship"
                value={values.person3Relationship}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person3Birth &&
                  errors.person3Birth !== undefined && {
                    content: errors.person3Birth,
                    pointing: "above",
                  }
                }
                placeholder="Birth Date"
                name="person3Birth"
                value={values.person3Birth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person3IncomeSource &&
                  errors.person3IncomeSource !== undefined && {
                    content: errors.person3IncomeSource,
                    pointing: "above",
                  }
                }
                placeholder="Income Source"
                name="person3IncomeSource"
                value={values.person3IncomeSource}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person3grossMonthlyIncome &&
                  errors.person3grossMonthlyIncome !== undefined && {
                    content: errors.person3grossMonthlyIncome,
                    pointing: "above",
                  }
                }
                placeholder="Amount (Gross Monthly Income)"
                name="person3grossMonthlyIncome"
                value={values.person3grossMonthlyIncome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person3howOften &&
                  errors.person3howOften !== undefined && {
                    content: errors.person3howOften,
                    pointing: "above",
                  }
                }
                placeholder="How often"
                name="person3howOften"
                value={values.person3howOften}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Input
                error={
                  touched.person4Name &&
                  errors.person4Name !== undefined && {
                    content: errors.person4Name,
                    pointing: "above",
                  }
                }
                placeholder="Full Name"
                name="person4Name"
                value={values.person4Name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person4Relationship &&
                  errors.person4Relationship !== undefined && {
                    content: errors.person4Relationship,
                    pointing: "above",
                  }
                }
                placeholder="Relationship"
                name="person4Relationship"
                value={values.person4Relationship}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person4Birth &&
                  errors.person4Birth !== undefined && {
                    content: errors.person4Birth,
                    pointing: "above",
                  }
                }
                placeholder="Birth Date"
                name="person4Birth"
                value={values.person4Birth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person4IncomeSource &&
                  errors.person4IncomeSource !== undefined && {
                    content: errors.person4IncomeSource,
                    pointing: "above",
                  }
                }
                placeholder="Income Source"
                name="person4IncomeSource"
                value={values.person4IncomeSource}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person4grossMonthlyIncome &&
                  errors.person4grossMonthlyIncome !== undefined && {
                    content: errors.person4grossMonthlyIncome,
                    pointing: "above",
                  }
                }
                placeholder="Amount (Gross Monthly Income)"
                name="person4grossMonthlyIncome"
                value={values.person4grossMonthlyIncome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person4howOften &&
                  errors.person4howOften !== undefined && {
                    content: errors.person4howOften,
                    pointing: "above",
                  }
                }
                placeholder="How often"
                name="person4howOften"
                value={values.person4howOften}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Input
                error={
                  touched.person5Name &&
                  errors.person5Name !== undefined && {
                    content: errors.person5Name,
                    pointing: "above",
                  }
                }
                placeholder="Full Name"
                name="person5Name"
                value={values.person5Name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person5Relationship &&
                  errors.person5Relationship !== undefined && {
                    content: errors.person5Relationship,
                    pointing: "above",
                  }
                }
                placeholder="Relationship"
                name="person5Relationship"
                value={values.person5Relationship}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person5Birth &&
                  errors.person5Birth !== undefined && {
                    content: errors.person5Birth,
                    pointing: "above",
                  }
                }
                placeholder="Birth Date"
                name="person5Birth"
                value={values.person5Birth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person5IncomeSource &&
                  errors.person5IncomeSource !== undefined && {
                    content: errors.person5IncomeSource,
                    pointing: "above",
                  }
                }
                placeholder="Income Source"
                name="person5IncomeSource"
                value={values.person5IncomeSource}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person5grossMonthlyIncome &&
                  errors.person5grossMonthlyIncome !== undefined && {
                    content: errors.person5grossMonthlyIncome,
                    pointing: "above",
                  }
                }
                placeholder="Amount (Gross Monthly Income)"
                name="person5grossMonthlyIncome"
                value={values.person5grossMonthlyIncome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person5howOften &&
                  errors.person5howOften !== undefined && {
                    content: errors.person5howOften,
                    pointing: "above",
                  }
                }
                placeholder="How often"
                name="person5howOften"
                value={values.person5howOften}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Group widths="2">
              <Form.Input
                error={
                  touched.person6Name &&
                  errors.person6Name !== undefined && {
                    content: errors.person6Name,
                    pointing: "above",
                  }
                }
                placeholder="Full Name"
                name="person6Name"
                value={values.person6Name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person6Relationship &&
                  errors.person6Relationship !== undefined && {
                    content: errors.person6Relationship,
                    pointing: "above",
                  }
                }
                placeholder="Relationship"
                name="person6Relationship"
                value={values.person6Relationship}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person6Birth &&
                  errors.person6Birth !== undefined && {
                    content: errors.person6Birth,
                    pointing: "above",
                  }
                }
                placeholder="Birth Date"
                name="person6Birth"
                value={values.person6Birth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person6IncomeSource &&
                  errors.person6IncomeSource !== undefined && {
                    content: errors.person6IncomeSource,
                    pointing: "above",
                  }
                }
                placeholder="Income Source"
                name="person6IncomeSource"
                value={values.person6IncomeSource}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person6grossMonthlyIncome &&
                  errors.person6grossMonthlyIncome !== undefined && {
                    content: errors.person6grossMonthlyIncome,
                    pointing: "above",
                  }
                }
                placeholder="Amount (Gross Monthly Income)"
                name="person6grossMonthlyIncome"
                value={values.person6grossMonthlyIncome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.person6howOften &&
                  errors.person6howOften !== undefined && {
                    content: errors.person6howOften,
                    pointing: "above",
                  }
                }
                placeholder="How often"
                name="person6howOften"
                value={values.person6howOften}
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

export default Page13;
