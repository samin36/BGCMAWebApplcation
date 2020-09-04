import React from "react";
import { Form, Container, Icon, Header } from "semantic-ui-react";
import * as yup from "yup";
import {Field, Formik} from "formik";
import { Persist } from "formik-persist";
import { dateRegex } from "../../Regex/regex";
import {
    paragraph1,
    paragraph2,
    paragraph3,
    paragraph4,
    paragraph5,
    paragraph6,
    paragraph7,
    paragraph8
} from "../../PageText/page8text";

/**
 * Pass in prevStep if the page number >= 1
 */
const Page8 = ({ nextStep, prevStep, setFormStates }) => {
    const pageNo = 8; //Define the page number here
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
        mediaPermission: true,
        schoolDataRelease: true,
        generalTravelPermissions: true,
        clubMaskDownZone: true,
    };

    const validationSchema = yup.object().shape({
        mediaPermission: yup
            .boolean()
            .required("This selection is required"),
        schoolDataRelease: yup
            .boolean()
            .required("This selection is required"),
        generalTravelPermissions: yup
            .boolean()
            .required("This selection is required"),
        clubMaskDownZone: yup
            .boolean()
            .required("This selection is required")
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
                <Container textAlign="center">
                    {/* {JSON.stringify(values, null, 2)} */}
                    <Header textAlign="center" as="h1">
                        <b>
                            Member Assessment Permission Form
                        </b>
                    </Header>

                    <Header as="h3" textAlign="left">
                        {paragraph1}
                        {paragraph2}
                    </Header>
                    <Form size="big">
                        <Form.Group>
                            <Field as="select" name="memberAssessments">
                                <option value={true}>I give my child Media Permission </option>
                                <option value={false}>I DO NOT give my child Media Permission.</option>
                                value={values.mediaPermission}
                            </Field>
                        </Form.Group>
                    </Form>

                    <Header as="h3" textAlign="left">
                        {paragraph3}
                        {paragraph4}
                    </Header>
                    <Form size="big">
                        <Form.Group>
                            <Field as="select" name="memberAssessments">
                                <option value={true}>I give permission to the BGCMA to request academic information from my child’s school district.</option>
                                <option value={false}>I DO NOT give permission to BGCMA to request academic information from my child’s school district.</option>
                                value={values.schoolDataRelease}
                            </Field>
                        </Form.Group>
                    </Form>

                    <Header as="h3" textAlign="left">
                        {paragraph5}
                        {paragraph6}
                    </Header>
                    <Form size="big">
                        <Form.Group>
                            <Field as="select" name="memberAssessments">
                                <option value={true}>I give my child General Travel Permission.</option>
                                <option value={false}> I DO NOT give my child General Travel Permission.</option>
                                value={values.generalTravelPermissions}
                            </Field>
                        </Form.Group>
                    </Form>

                    <Header as="h3" textAlign="left">
                        {paragraph7}
                        {paragraph8}
                    </Header>
                    <Form size="big">
                        <Form.Group>
                            <Field as="select" name="memberAssessments">
                                <option value={true}>I give permission for my child to remove their mask during the Mask Down time.</option>
                                <option value={false}>I DO NOT give permission for my child to remove their mask during the Mask Down time</option>
                                value={values.clubMaskDownZone}
                            </Field>
                        </Form.Group>
                    </Form>

                    <Form>
                        <Form.Group widths="equal">
                            <Form.Button
                                onClick={goToPrevPage}
                                primary
                                floated="left"
                                disabled={isSubmitting}
                                icon="arrow left"
                                style={{ padding: ".75em 2em" }}
                            />
                            <Form.Button
                                type="submit"
                                onClick={handleSubmit}
                                primary
                                floated="right"
                                disabled={isSubmitting}
                                icon="arrow right"
                                style={{ padding: ".75em 2em" }}
                            />
                        </Form.Group>
                        <Persist name={`page${pageNo}`} />
                    </Form>
                </Container>
            )}
        </Formik>
    );
};

export default Page8;