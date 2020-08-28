import React, { useContext, useEffect } from "react";
import { Form, Container, Icon } from "semantic-ui-react";
import * as yup from "yup";
import { useFormik } from "formik";
import { DashboardDispatchContext } from "../../Context/DashboardDispatchContext";
import { useHistory } from "react-router-dom";

const SampleForm = ({ nextStep, prevStep, setFormStates, formStates }) => {
  const dashboardDispatch = useContext(DashboardDispatchContext);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      childFirstName: "",
      childLastName: "",
      actionType: "",
      date: "",
      applicationStatus: "",
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // const newApplication = {
      //   name: `${values.childFirstName} ${values.childLastName}`,
      //   date: values.date,
      //   action: values.actionType,
      //   applicationStatus: values.applicationStatus,
      // };
      // dashboardDispatch({ type: "NEW_APPLICATION", newApplication });
      // resetForm();
      // history.goBack();
      goToNextPage();
    },
    validationSchema: yup.object().shape({
      childFirstName: yup.string().required("First name is required"),
      childLastName: yup.string().required("Last name is required"),
      actionType: yup.string().required("Action type must be selected"),
      date: yup.date().required("Date is required"),
      applicationStatus: yup
        .string()
        .required("Application status must be selected"),
    }),
  });

  const updateFormState = () => {
    setFormStates((prevState) => {
      return {
        ...prevState,
        page1: formik.values,
      };
    });
  };

  const goToNextPage = () => {
    updateFormState();
    nextStep();
  };

  useEffect(() => {
    if (formStates.page1) {
      formik.setValues(formStates.page1);
    }
  }, [formStates.page1]);

  return (
    <Container textAlign="center" text>
      {JSON.stringify(formik.values)}
      <h1>Sample Form 1</h1>
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            error={
              formik.touched.childFirstName &&
              formik.errors.childFirstName !== undefined && {
                content: formik.errors.childFirstName,
                pointing: "above",
              }
            }
            placeholder="First name"
            name="childFirstName"
            value={formik.values.childFirstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Form.Input
            error={
              formik.touched.childLastName &&
              formik.errors.childLastName !== undefined && {
                content: formik.errors.childLastName,
                pointing: "above",
              }
            }
            placeholder="Last name"
            name="childLastName"
            value={formik.values.childLastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Group>

        <Form.Input
          error={
            formik.touched.date &&
            formik.errors.date !== undefined && {
              content: formik.errors.date,
              pointing: "above",
            }
          }
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Date"
        />

        <Form.Group inline>
          <label>Action Type</label>
          <Form.Radio
            name="actionType"
            value="View"
            label="View"
            onBlur={formik.handleBlur}
            onChange={(_, { value }) =>
              formik.setFieldValue("actionType", value)
            }
            checked={formik.values.actionType === "View"}
            error={
              formik.touched.actionType &&
              formik.errors.actionType !== undefined
            }
          />
          <Form.Radio
            name="actionType"
            value="Edit"
            label="Edit"
            onBlur={formik.handleBlur}
            onChange={(_, { value }) =>
              formik.setFieldValue("actionType", value)
            }
            checked={formik.values.actionType === "Edit"}
            error={
              formik.touched.actionType &&
              formik.errors.actionType !== undefined && {
                content: formik.errors.actionType,
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
              formik.setFieldValue("applicationStatus", value)
            }
            onBlur={formik.handleBlur}
            checked={formik.values.applicationStatus === "Approved"}
            error={
              formik.touched.applicationStatus &&
              formik.errors.applicationStatus !== undefined
            }
          />
          <Form.Radio
            label="Pending"
            name="applicationStatus"
            value="Pending"
            onChange={(_, { value }) =>
              formik.setFieldValue("applicationStatus", value)
            }
            onBlur={formik.handleBlur}
            checked={formik.values.applicationStatus === "Pending"}
            error={
              formik.touched.applicationStatus &&
              formik.errors.applicationStatus !== undefined
            }
          />
          <Form.Radio
            label="Incomplete"
            name="applicationStatus"
            value="Incomplete"
            onChange={(_, { value }) =>
              formik.setFieldValue("applicationStatus", value)
            }
            onBlur={formik.handleBlur}
            checked={formik.values.applicationStatus === "Incomplete"}
            error={
              formik.touched.applicationStatus &&
              formik.errors.applicationStatus !== undefined && {
                content: formik.errors.applicationStatus,
                pointing: "left",
              }
            }
          />
        </Form.Group>
        {/* <Form.Button type="submit" onClick={formik.handleSubmit} primary>
          Create
        </Form.Button> */}
        <Form.Group inline widths="equal">
          <Form.Button
            type="submit"
            onClick={formik.handleSubmit}
            primary
            floated="right"
            compact
          >
            <Icon name="arrow right" />
          </Form.Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default SampleForm;
