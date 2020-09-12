import React from "react";

import {
  Form,
  Container,
  Icon,
  Image,
  Divider,
  Header,
} from "semantic-ui-react";
import * as yup from "yup";
import { Formik } from "formik";

const initialValues = {
  emailAddress: "",
  password: "",
};

const validationSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .required("Email is required")
    .email("Please make sure email is formatted correctly"),
  password: yup.string().required("Password is required"),
});

function Login() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        alert(`submitted: ${JSON.stringify(values, null, 2)}`);
        setSubmitting(false);
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
            <Header content="Login" as="h1" style={{ fontSize: "3em" }} />
            <Form size="big">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.emailAddress &&
                  errors.emailAddress !== undefined && {
                    content: errors.emailAddress,
                    pointing: "above",
                  }
                }
                placeholder="Email"
                name="emailAddress"
                value={values.emailAddress}
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
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
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
                content="Login"
                style={{ padding: ".75em 2em" }}
              />
            </Form>
          </Container>
        </Container>
      )}
    </Formik>
  );
}

export default Login;
