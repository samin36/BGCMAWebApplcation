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
  //phoneRegex,
  ssnRegex,
  dateRegex,
  //zipCodeRegex,
} from "../../Regex/regex";
import {
  paragraph1,
  hr
} from "../../PageText/page12text";
/**
 * Pass in prevStep if the page number >= 1
 * Notes: <hr> to horizonatal line
 */
const FormTemplate = ({ nextStep, prevStep, setFormStates }) => {
  const pageNo = 12; //Define the page number here
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
      youthLastName: "",
      youthFirstName:"",
      youthMI: "",
      youthSSN: "",
      youthGender: "",
      documentDate: "",
      youthFosterCare: "",
      youthFosterCareEntry: "",
      youthUSCiti: "",
      youthGARes: "",
      youth3CateQuestion: "",
      youth3CateRadio: "",
      ATANF: "",
      BSNAP: "",
      CSSI: "",
      DPFK: "",
  };

  const section1ValidationSchema = yup.object().shape({
      youthLastName : yup.string().required("Child's Last Name is required"),
      youthFirstName: yup.string().required("Child's First Name is required"),
      youthMI :  yup.string().max(1, "Initial must be a single letter"),
      youthSSN : yup.string().required("Child's SSN is required").matches(ssnRegex, "SSN must be in the form xxx-xx-xxxx"),
      youthGender: yup.string().required("Gender must be selected"),
      documentDate: yup.string().required("Date is required as MM/DD/YYYY").matches(dateRegex,"Date must be in the form MM/DD/YYYY"),
      youthFosterCareEntry : yup.string(),
      youthFosterCare: yup.string().required("You must select either Yes or No."),
  });

  const section2ValidationSchema = yup.object().shape({
      youthUSCiti : yup.string().required("You must select either Yes or No."),
      youthGARes : yup.string().required("You must select either Yes or No."),
      youth3CateQuestion: yup.string().required("You must select either Yes or No."),
      youth3CateRadio: yup.string().required("You must select one of these 3 options."),
      ATANF : yup.string().required("You must select either Yes or No."),
      BSNAP : yup.string().required("You must select either Yes or No."),
      CSSI : yup.string().required("You must select either Yes or No."),
      DPFK : yup.string().required("You must select either Yes or No."),
  });

  const validationSchema = yup.object().concat(section1ValidationSchema).concat(section2ValidationSchema);

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
          {/*JSON.stringify(values, null, 2)*/}
          <Header textAlign="center" as="h2">
              Georgia Division of Family and Children Services
              Afterschool Care Program
              Youth Participation Eligibility Form
          </Header>
          <Header textAlign="center" as="h1">
            <b>
              Page 1 of 3- DFCS Afterschool Care Program Eligibility Form
            </b>
          </Header>
          <Header as="h4" textAlign="left">
            {paragraph1}
            {hr}
          </Header>
          <Form size="big">
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.youthLastName &&
                  errors.youthLastName !== undefined && {
                    content: errors.youthLastName,
                    pointing: "above",
                  }
                }
                placeholder="Youth Last Name"
                name="youthLastName"
                value={values.youthLastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.youthFirstName &&
                  errors.youthFirstName !== undefined && {
                    content: errors.youthFirstName,
                    pointing: "above",
                  }
                }
                placeholder="Youth First Name"
                name="youthFirstName"
                value={values.youthFirstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                // icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.youthMI &&
                  errors.youthMI !== undefined && {
                    content: errors.youthMI,
                    pointing: "above",
                  }
                }
                placeholder="Youth Middle Initial"
                name="youthMI"
                value={values.youthMI}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>              
            <Form.Group>
             <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.youthSSN &&
                  errors.youthSSN !== undefined && {
                    content: errors.youthSSN,
                    pointing: "above",
                  }
                }
                placeholder="SSN (Youth)"
                name="youthSSN"
                value={values.youthSSN}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Group grouped>
                      <label>Gender: </label>
                      <Icon name="asterisk" color="red" size="small" corner />
                      <Form.Radio
                        name="youthGender"
                        value="Female"
                        label="Female"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("youthGender", value)
                        }
                        checked={values.youthGender === "Female"}
                        error={
                          touched.youthGender &&
                          errors.youthGender !== undefined
                        }
                      />
                      <Form.Radio
                        name="youthGender"
                        value="Male"
                        label="Male"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("youthGender", value)
                        }
                        checked={values.youthGender === "Male"}
                        error={
                          touched.youthGender &&
                          errors.youthGender !== undefined
                        }
                      />
                      <Form.Radio
                        name="youthGender"
                        value="Non-Binary"
                        label="Non-Binary"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("youthGender", value)
                        }
                        checked={values.childGender === "Non-Binary"}
                        error={
                          touched.youthGender &&
                          errors.youthGender !== undefined && {
                            content: errors.youthGender,
                            pointing: "above",
                          }
                        }
                      />
                    </Form.Group>
            
            <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.documentDate &&
                  errors.documentDate !== undefined && {
                    content: errors.documentDate,
                    pointing: "above",
                  }
                }
                placeholder="Date (MM/DD/YYYY)"
                name="documentDate"
                value={values.documentDate}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            </Form.Group>
            <Form.Group grouped>
                      <b> Is the youth named above in Foster Care within the state of Georgia?</b>
                      <Icon name="asterisk" color="red" size="small" corner />
                      <Form.Radio
                        name="youthFosterCare"
                        value="Yes"
                        label="Yes"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("youthFosterCare", value)
                        }
                        checked={values.youthFosterCare === "Yes"}
                        error={
                          touched.youthFosterCare &&
                          errors.youthFosterCare !== undefined
                        }
                      />
                      <Form.Radio
                        name="youthFosterCare"
                        value="No"
                        label="No"
                        onBlur={handleBlur}
                        onChange={(_, { value }) =>
                          setFieldValue("youthFosterCare", value)
                        }
                        checked={values.youthFosterCare === "No"}
                        error={
                          touched.youthFosterCare &&
                          errors.youthFosterCare !== undefined
                        }
                      />
                <b>Note: If the youth is in Foster Care but not in the care of Georgia, please provide the state name.</b>
                <Form.Input
                error={
                  touched.youthFosterCareEntry &&
                  errors.youthFosterCareEntry !== undefined && {
                    content: errors.youthFosterCareEntry,
                    pointing: "above",
                  }
                }
                placeholder="Foster Care State Name"
                name="youthFosterCareEntry"
                value={values.youthFosterCareEntry}
                onChange={handleChange}
                onBlur={handleBlur}
                />
            </Form.Group>
            {hr}
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
