import React from "react";
import { Form, Container, Icon } from "semantic-ui-react";
import * as yup from "yup";
import { Formik } from "formik";
import { Persist } from "formik-persist";

/**
 * Pass in prevStep if the page number >= 1
 */
const SampleFormPage2 = ({ nextStep, prevStep, formStates, setFormStates }) => {
  const pageNo = 2; //Define the page number here
  const updateFormState = (values) => {
    // console.log("updating form state in sampleformpage2: ", values);
    console.log("current state of formStates in sampleformpage2: ", formStates);
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
    childFirstName: "",
    childLastName: "",
    actionType: "",
    date: "",
    applicationStatus: "",
  };

  const validationSchema = yup.object().shape({
    childFirstName: yup.string().required("First name is required"),
    childLastName: yup.string().required("Last name is required"),
    actionType: yup.string().required("Action type must be selected"),
    date: yup.date().required("Date is required"),
    applicationStatus: yup
      .string()
      .required("Application status must be selected"),
  });

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
          {JSON.stringify(values, null, 2)}
          <h1>{`Page number: ${pageNo}`}</h1>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                error={
                  touched.childFirstName &&
                  errors.childFirstName !== undefined && {
                    content: errors.childFirstName,
                    pointing: "above",
                  }
                }
                placeholder="First name"
                name="childFirstName"
                value={values.childFirstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                error={
                  touched.childLastName &&
                  errors.childLastName !== undefined && {
                    content: errors.childLastName,
                    pointing: "above",
                  }
                }
                placeholder="Last name"
                name="childLastName"
                value={values.childLastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Form.Input
              error={
                touched.date &&
                errors.date !== undefined && {
                  content: errors.date,
                  pointing: "above",
                }
              }
              name="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Date"
            />

            <Form.Group inline>
              <label>Action Type</label>
              <Form.Radio
                name="actionType"
                value="View"
                label="View"
                onBlur={handleBlur}
                onChange={(_, { value }) => setFieldValue("actionType", value)}
                checked={values.actionType === "View"}
                error={touched.actionType && errors.actionType !== undefined}
              />
              <Form.Radio
                name="actionType"
                value="Edit"
                label="Edit"
                onBlur={handleBlur}
                onChange={(_, { value }) => setFieldValue("actionType", value)}
                checked={values.actionType === "Edit"}
                error={
                  touched.actionType &&
                  errors.actionType !== undefined && {
                    content: errors.actionType,
                    pointing: "left",
                  }
                }
              />
            </Form.Group>

            <Form.Group inline>
              <label>Application Status</label>
              <Form.Radio
                label="Approved"
                name="applicationStatus"
                value="Approved"
                onChange={(_, { value }) =>
                  setFieldValue("applicationStatus", value)
                }
                onBlur={handleBlur}
                checked={values.applicationStatus === "Approved"}
                error={
                  touched.applicationStatus &&
                  errors.applicationStatus !== undefined
                }
              />
              <Form.Radio
                label="Pending"
                name="applicationStatus"
                value="Pending"
                onChange={(_, { value }) =>
                  setFieldValue("applicationStatus", value)
                }
                onBlur={handleBlur}
                checked={values.applicationStatus === "Pending"}
                error={
                  touched.applicationStatus &&
                  errors.applicationStatus !== undefined
                }
              />
              <Form.Radio
                label="Incomplete"
                name="applicationStatus"
                value="Incomplete"
                onChange={(_, { value }) =>
                  setFieldValue("applicationStatus", value)
                }
                onBlur={handleBlur}
                checked={values.applicationStatus === "Incomplete"}
                error={
                  touched.applicationStatus &&
                  errors.applicationStatus !== undefined && {
                    content: errors.applicationStatus,
                    pointing: "left",
                  }
                }
              />
            </Form.Group>

            {/**Previous and Next page buttons */}
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
                <Icon name="send" />
              </Form.Button>
            </Form.Group>
            <Persist name={`page${pageNo}`} />
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default SampleFormPage2;
