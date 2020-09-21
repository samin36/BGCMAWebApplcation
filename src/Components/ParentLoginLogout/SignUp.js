import React, { useState } from "react";

import {
  Form,
  Container,
  Icon,
  Image,
  Divider,
  Header,
} from "semantic-ui-react";
import CustomModal from "../CustomModal";

import * as yup from "yup";
import { Formik } from "formik";

import firebase from "../../Firebase/firebase";

const initialValues = {
  firstName: "",
  lastName: "",
  emailAddress: "",
  confirmEmailAddress: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  emailAddress: yup
    .string()
    .required("Email is required")
    .email("Please make sure email is formatted correctly"),
  confirmEmailAddress: yup
    .string()
    .oneOf([yup.ref("emailAddress"), null], "Emails do not match"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match"),
});

const SignUp = () => {
  const [signUpError, setSignUpError] = useState(null);

  firebase.authChange((user) => {
    if (user) {
      console.log(user);
      sessionStorage.setItem("isAuthenticated", "true");
      window.location.reload();
    } else {
      sessionStorage.clear();
    }
  });

  const onSignUp = async (
    { firstName, lastName, emailAddress, password },
    setSubmitting
  ) => {
    try {
      const resp = await firebase.register(
        emailAddress,
        password,
        firstName,
        lastName
      );
      console.log("successfully registered user: ", resp);
      setSubmitting(false);
    } catch (err) {
      setSignUpError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const { firstName, lastName, emailAddress, password } = values;
        onSignUp(
          { firstName, lastName, emailAddress, password },
          setSubmitting
        );
        // setSubmitting(false);
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
        <Container
          fluid
          textAlign="center"
          style={{ background: "#E5E9F2", height: "100vh", padding: "4em 0" }}
        >
          <Container
            textAlign="center"
            style={{ background: "#EFF2F7", padding: "2em" }}
            text
          >
            <Image src="/Images/bgcmalogo.png" size="large" centered />
            <Divider hidden />
            <Header
              content="Registration"
              as="h1"
              style={{ fontSize: "3em" }}
            />
            <Form size="big">
              <Form.Group widths="equal">
                <Form.Input
                  icon={<Icon name="asterisk" size="small" color="red" />}
                  error={
                    touched.firstName &&
                    errors.firstName !== undefined && {
                      content: errors.firstName,
                      pointing: "above",
                    }
                  }
                  placeholder="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Form.Input
                  icon={<Icon name="asterisk" size="small" color="red" />}
                  error={
                    touched.lastName &&
                    errors.lastName !== undefined && {
                      content: errors.lastName,
                      pointing: "above",
                    }
                  }
                  placeholder="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Group>
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.emailAddress &&
                  errors.emailAddress !== undefined && {
                    content: errors.emailAddress,
                    pointing: "above",
                  }
                }
                placeholder="Email Address"
                name="emailAddress"
                value={values.emailAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.confirmEmailAddress &&
                  errors.confirmEmailAddress !== undefined && {
                    content: errors.confirmEmailAddress,
                    pointing: "above",
                  }
                }
                placeholder="Confirm Email Address"
                name="confirmEmailAddress"
                value={values.confirmEmailAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.password &&
                  errors.password !== undefined && {
                    content: errors.password,
                    pointing: "above",
                  }
                }
                placeholder="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.confirmPassword &&
                  errors.confirmPassword !== undefined && {
                    content: errors.confirmPassword,
                    pointing: "above",
                  }
                }
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Button
                size="big"
                type="submit"
                circular
                onClick={handleSubmit}
                primary
                disabled={isSubmitting}
                content="Sign Up"
                style={{ padding: ".75em 2em" }}
                loading={isSubmitting}
              />
            </Form>
            {signUpError && (
              <CustomModal
                isError={true}
                bodyMessage={signUpError}
                okAction={() => setSignUpError(null)}
              />
            )}
          </Container>
        </Container>
      )}
    </Formik>
  );
};

export default SignUp;
