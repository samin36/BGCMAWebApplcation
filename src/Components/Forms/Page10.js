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
const Page10 = ({ nextStep, prevStep, setFormStates }) => {
    const pageNo = 10; //Define the page number here
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
        brightFromStart: "",
        parentOrientation: "",
        firstAidPermission: "",
        medicalPermission: "",
        afterSchoolTravel: "",
        fieldTrips: "",
        waiverAgreement: "",
        childName: "",
        parentSignature: "", 
        date: "",
    };

    const exemptionAndParentOrientationValidationSchema = yup.object().shape({
        brightFromStart: yup.string().required("This section is required"),
        parentOrientation: yup.string().required("This section is required"),
    });

    const medicalValidationSchema = yup.object().shape({
        firstAidPermission: yup.string().required("This section is required"),
        medicalPermission: yup.string().required("This section is required"),
    });

    const transportationValidationSchema = yup.object().shape({
        afterSchoolTravel: yup.string().required("This section is required"),
        fieldTrips: yup.string().required("This section is required"),
    });

    const holdHarmlessAndLiabilityValidationSchema = yup.object().shape({
        waiverAgreement: yup.string().required("This section is required"),
    })

    const signatureValidationSchema = yup.object().shape({
        childName: yup.string().required("Child's name is required"),
        parentSignature: yup.string().required("Parent's signature is required"), 
        date: yup
            .string()
            .required("Date is required as MM/DD/YYYY")
            .matches(dateRegex, "Date must be in the form MM/DD/YYYY"),
    });

    const validationSchema = yup
        .object()
        .concat(exemptionAndParentOrientationValidationSchema)
        .concat(medicalValidationSchema)
        .concat(transportationValidationSchema)
        .concat(holdHarmlessAndLiabilityValidationSchema)
        .concat(signatureValidationSchema);
    
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
                        Forms and Waivers
                    </Header>
                    <Header as="h3">
                        PLEASE READ CAREFULLY SELECT FROM THE OPTIONS BELOW
                    </Header>
                    <Divider horizontal content="NOTICE OF EXEMPTION AND PARENT ORIENTATION" />

                    <Form.Group>
                        <Grid>
                            <Grid.Column width={6}>
                                <Segment textAlign="left" size="big">
                                    <Form.Group grouped>
                                        <label>Bright From the Start Notice of Exemption</label>
                                        <Icon name="asterisk" color="red" size="small" corner />
                                        <Form.Radio
                                            name="brightFromStart"
                                            value="I acknowledge that I have been informed that this program is not a licensed childcare facility. I also understand this program is not required to be licensed by the Georgia Department of Early Care and Learning and this program is exempt from state licensure requirements."
                                            label="I acknowledge that I have been informed that this program is not a licensed childcare facility. I also understand this program is not required to be licensed by the Georgia Department of Early Care and Learning and this program is exempt from state licensure requirements."
                                            onBlur={handleBlur}
                                            onChange={(_, { value }) =>
                                                setFieldValue("brightFromStart", value)
                                            }
                                            checked={values.brightFromStart === "I acknowledge that I have been informed that this program is not a licensed childcare facility. I also understand this program is not required to be licensed by the Georgia Department of Early Care and Learning and this program is exempt from state licensure requirements."}
                                            error={
                                                touched.brightFromStart && errors.brightFromStart !== undefined
                                            }
                                        />
                                    </Form.Group>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Segment textAlign="left" size="big">
                                    <Form.Group grouped>
                                        <label>Parent Orientation/Remind Communications</label>
                                        <Icon name="asterisk" color="red" size="small" corner /> 
                                        <Form.Radio
                                            name="parentOrientation"
                                            value="I understand that attending Parent Orientation is MANDATORY, and I agree to adhere to and abide by the policies of the Clubs as stated in the orientation guide. I also agree to further review Club policies with my child, assuming responsibility for their appropriate behavior while in attendance at the Boys and Girls Club. I understand that it is MANDATORY to opt-in to the Club Remind Class to receive important Club/Org communications. NOTE: The Member/Parent Orientation guide is available per download on our website and/or per request at the front desk of each Club."
                                            label="I understand that attending Parent Orientation is MANDATORY, and I agree to adhere to and abide by the policies of the Clubs as stated in the orientation guide. I also agree to further review Club policies with my child, assuming responsibility for their appropriate behavior while in attendance at the Boys and Girls Club. I understand that it is MANDATORY to opt-in to the Club Remind Class to receive important Club/Org communications. NOTE: The Member/Parent Orientation guide is available per download on our website and/or per request at the front desk of each Club."
                                            onBlur={handleBlur}
                                            onChange={(_, { value }) =>
                                                setFieldValue("parentOrientation", value)
                                            }
                                            checked={values.parentOrientation === "I understand that attending Parent Orientation is MANDATORY, and I agree to adhere to and abide by the policies of the Clubs as stated in the orientation guide. I also agree to further review Club policies with my child, assuming responsibility for their appropriate behavior while in attendance at the Boys and Girls Club. I understand that it is MANDATORY to opt-in to the Club Remind Class to receive important Club/Org communications. NOTE: The Member/Parent Orientation guide is available per download on our website and/or per request at the front desk of each Club."}
                                            error={
                                                touched.parentOrientation && errors.parentOrientation !== undefined
                                            }
                                        />
                                    </Form.Group>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </Form.Group>
                    <Divider horizontal content="MEDICAL" />
                    <Form.Group>
                        <Grid>
                            <Grid.Column width={6}>
                                <Segment textAlign="left" size="big">
                                    <Form.Group grouped>
                                        <label>In the event of an emergency, the Club must have written consent to seek medical treatment for your child.</label>
                                        <Icon name="asterisk" color="red" size="small" corner />
                                        <Form.Radio
                                            name="firstAidPermission"
                                            value="I authorize administration of basic first aid."
                                            label="I authorize administration of basic first aid."
                                            onBlur={handleBlur}
                                            onChange={(_, { value }) =>
                                                setFieldValue("firstAidPermission", value)
                                            }
                                            checked={values.firstAidPermission === "I authorize administration of basic first aid."}
                                            error={
                                                touched.firstAidPermission && errors.firstAidPermission !== undefined
                                            }
                                        />
                                        <Form.Radio
                                            name="firstAidPermission"
                                            value="I DO NOT authorize administration of basic first aid."
                                            label="I DO NOT authorize administration of basic first aid."
                                            onBlur={handleBlur}
                                            onChange={(_, { value }) =>
                                                setFieldValue("firstAidPermission", value)
                                            }
                                            checked={values.firstAidPermission === "I DO NOT authorize administration of basic first aid."}
                                            error={
                                                touched.firstAidPermission && errors.firstAidPermission !== undefined
                                            }
                                        />
                                    </Form.Group>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Segment textAlign="left" size="big">
                                    <Form.Group grouped>
                                        <label>In the event of an emergency, the Club must have written consent to seek medical treatment for your child.</label>
                                        <Icon name="asterisk" color="red" size="small" corner /> 
                                        <Form.Radio
                                            name="medicalPermission"
                                            value="I give BGCMA permission to seek medical treatment for my child. I understand that treatment may include emergency
                                            transportation, x-rays or surgery in some circumstances for my child, and I agree to assume responsibility for charges
                                            associated with this or any other treatment given to my child."
                                            label="I give BGCMA permission to seek medical treatment for my child. I understand that treatment may include emergency
                                            transportation, x-rays or surgery in some circumstances for my child, and I agree to assume responsibility for charges
                                            associated with this or any other treatment given to my child."
                                            onBlur={handleBlur}
                                            onChange={(_, { value }) =>
                                                setFieldValue("medicalPermission", value)
                                            }
                                            checked={values.medicalPermission === "I give BGCMA permission to seek medical treatment for my child. I understand that treatment may include emergency transportation, x-rays or surgery in some circumstances for my child, and I agree to assume responsibility for charges associated with this or any other treatment given to my child."}
                                            error={
                                                touched.medicalPermission && errors.medicalPermission !== undefined
                                            }
                                        />
                                        <Form.Radio
                                            name="medicalPermission"
                                            value="I DO NOT give BGCMA permission to seek medical treatment for my child."
                                            label="I DO NOT give BGCMA permission to seek medical treatment for my child."
                                            onBlur={handleBlur}
                                            onChange={(_, { value }) =>
                                                setFieldValue("medicalPermission", value)
                                            }
                                            checked={values.medicalPermission === "I DO NOT give BGCMA permission to seek medical treatment for my child."}
                                            error={
                                                touched.medicalPermission && errors.medicalPermission !== undefined
                                            }
                                        />
                                    </Form.Group>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </Form.Group>
                    <Divider horizontal content="Transportation" />
                    <Form.Group>
                        <Grid>
                            <Grid.Column width={6}>
                                <Segment textAlign="left" size="big">
                                    <Form.Group grouped>
                                        <label>After School Travel: From School and Travel To Home (When space is available on van routes)</label>
                                        <Icon name="asterisk" color="red" size="small" corner />
                                        <Form.Radio
                                            name="afterSchoolTravel"
                                            value="I authorize service from my child's school to the Club for the current school year. I understand that BGCMA reserves the right to remove my child from the van service."
                                            label="I authorize service from my child's school to the Club for the current school year. I understand that BGCMA reserves the right to remove my child from the van service."
                                            onBlur={handleBlur}
                                            onChange={(_, { value }) =>
                                                setFieldValue("afterSchoolTravel", value)
                                            }
                                            checked={values.afterSchoolTravel === "I authorize service from my child's school to the Club for the current school year. I understand that BGCMA reserves the right to remove my child from the van service."}
                                            error={
                                                touched.afterSchoolTravel && errors.afterSchoolTravel !== undefined
                                            }
                                        />
                                    </Form.Group>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Segment textAlign="left" size="big">
                                    <Form.Group grouped>
                                        <label>Field Trips/Special Events/Summer Travel</label>
                                        <Icon name="asterisk" color="red" size="small" corner /> 
                                        <Form.Radio
                                            name="fieldTrips"
                                            value="I authorize travel with the BGCMA to any field trip or outing that I sign my child up for during the SCHOOL YEAR AND /OR SUMMER PROGRAM. I understand that BGCMA reserves the right to remove my child from the van service."
                                            label="I authorize travel with the BGCMA to any field trip or outing that I sign my child up for during the SCHOOL YEAR AND /OR SUMMER PROGRAM. I understand that BGCMA reserves the right to remove my child from the van service."
                                            onBlur={handleBlur}
                                            onChange={(_, { value }) =>
                                                setFieldValue("fieldTrips", value)
                                            }
                                            checked={values.fieldTrips === "I authorize travel with the BGCMA to any field trip or outing that I sign my child up for during the SCHOOL YEAR AND /OR SUMMER PROGRAM. I understand that BGCMA reserves the right to remove my child from the van service."}
                                            error={
                                                touched.fieldTrips && errors.fieldTrips !== undefined
                                            }
                                        />
                                        <Form.Radio
                                            name="fieldTrips"
                                            value="I DO NOT authorize ANY travel with BGCMA. By selecting this option, your child CANNOT PARTICIPATE in ANY offsite trips."
                                            label="I DO NOT authorize ANY travel with BGCMA. By selecting this option, your child CANNOT PARTICIPATE in ANY offsite trips."
                                            onBlur={handleBlur}
                                            onChange={(_, { value }) =>
                                                setFieldValue("fieldTrips", value)
                                            }
                                            checked={values.fieldTrips === "I DO NOT authorize ANY travel with BGCMA. By selecting this option, your child CANNOT PARTICIPATE in ANY offsite trips."}
                                            error={
                                                touched.fieldTrips && errors.fieldTrips !== undefined
                                            }
                                        />
                                    </Form.Group>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </Form.Group>
                    <Divider horizontal content="HOLD HARMLESS AND LIABILITY RELEASE" />
                    <Form.Group inline>
                        <Grid>
                            <Grid.Column>
                                <Segment textAlign="left" size="big">
                                    <Form.Group grouped>
                                        <label>WAIVER AGREEMENT</label>
                                        <Icon name="asterisk" color="red" size="small" corner />
                                        <Form.Radio 
                                            name="waiverAgreement"
                                            value="I voluntarily submit my child for registration as a member at BGCMA. Activities at the Club may include, but are not limited to BGCMA SWIM, WEIGHT ROOM and other SPORTS/REC ACTIVITIES, which at my discretion may choose to allow my child to participate in. I will hold harmless BGCMA, Department of Human Services and their subsidiaries/affiliates from any claim by me or my child or any entity on behalf of myself or my child arising out of my child's participation in the program. I further state that I am of lawful age and legally competent to sign this agreement, and that my signing this agreement is my own free act. I also understand and agree that the terms herein are contractual, and they are not a mere recital or simply for information purposes. I have read, understand, and fully informed myself of the contents of this agreement. I assume responsibility for my child's physical condition and capability to perform under the program."
                                            label="I voluntarily submit my child for registration as a member at BGCMA. Activities at the Club may include, but
                                            are not limited to BGCMA SWIM, WEIGHT ROOM and other SPORTS/REC ACTIVITIES, which at my discretion may choose to allow
                                            my child to participate in. I will hold harmless BGCMA, Department of Human Services and their subsidiaries/affiliates from
                                            any claim by me or my child or any entity on behalf of myself or my child arising out of my child's participation in the 
                                            program. I further state that I am of lawful age and legally competent to sign this agreement, and that my signing this 
                                            agreement is my own free act. I also understand and agree that the terms herein are contractual, and they are not a mere
                                            recital or simply for information purposes. I have read, understand, and fully informed myself of the contents of this agreement. 
                                            I assume responsibility for my child's physical condition and capability to perform under the program."
                                            onBlur={handleBlur}
                                            onChange={(_, { value }) =>
                                                setFieldValue("waiverAgreement", value)
                                            }
                                            checked={values.waiverAgreement === "I voluntarily submit my child for registration as a member at BGCMA. Activities at the Club may include, but are not limited to BGCMA SWIM, WEIGHT ROOM and other SPORTS/REC ACTIVITIES, which at my discretion may choose to allow my child to participate in. I will hold harmless BGCMA, Department of Human Services and their subsidiaries/affiliates from any claim by me or my child or any entity on behalf of myself or my child arising out of my child's participation in the program. I further state that I am of lawful age and legally competent to sign this agreement, and that my signing this agreement is my own free act. I also understand and agree that the terms herein are contractual, and they are not a mere recital or simply for information purposes. I have read, understand, and fully informed myself of the contents of this agreement. I assume responsibility for my child's physical condition and capability to perform under the program."}
                                            error={
                                                touched.waiverAgreement && errors.waiverAgreement !== undefined
                                            }
                                        />
                                    </Form.Group>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </Form.Group>
                    <Divider/>
                    <Form.Group inline>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <Segment textAlign="left" size="big">
                                        <Form.Group>
                                            <label>I represent that I am the below-named parent/guardian, that I am over the age of 21, that I have read the foregoing and fully
                                            understand the contents thereof, that the consideration that I have received for this Agreement, Release and Waiver is fair and 
                                            equitable, and that I hereby give this Agreement, Release and Waiver of my own free choice. This Agreement, Release and 
                                            Waiver shall ensure to the benefit of the successors, assigns, licensees and legal representatives of the Companies and shall 
                                            be binding upon my heirs, executors, assigns and legal representatives. I request that my son/daughter be admitted into 
                                            membership and I grant permission for my child to participate in current and future programs, including virtual programming and 
                                            support with virtual school. I have explained the rules to my son/daughter and agree that BGCMA will not be responsible for any 
                                            accident to him/her while on the premises of BGCMA or while engaged in any of its activities away from BGCMA. BGCMA 
                                            participates in the USDA snack program. USDA is an equal opportunity provider and employer. I understand that BGCMA has 
                                            adopted a Safe Passage Policy that prohibits members from coming and going as they please. I understand that once a child 
                                            has entered the building, they will not be allowed to leave until a parent/guardian/authorized person arrives to retrieve them. I 
                                            understand that the Club is not a licensed day care facility and that staff will not physically restrain children who insist on leaving 
                                            without parent/guardian permission. I have read and agree to abide by the BGCMA policies stated in the Parent Handbook. I 
                                            understand that failure to abide by the policies in the handbook may result in the removal of my child from the Club programs.</label>
                                        </Form.Group>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Form.Group>
                                        <Form.Input //Child's Name__ Parent/Guardian's Signature__ Date__
                                            icon={<Icon name="asterisk" size="small" color = "red" />}
                                            error={
                                                touched.childName &&
                                                errors.childName !== undefined && {
                                                    content: errors.childName,
                                                    pointing: "above",
                                                }
                                            }
                                            width={4}
                                            placeholder="Child's Name"
                                            name="childName"
                                            value={values.childName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Form.Group>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Form.Group>
                                        <Form.Input 
                                            fluid
                                            icon={<Icon name="asterisk" size="small" color = "red" />}
                                            error={
                                                touched.parentSignature &&
                                                errors.parentSignature !== undefined && {
                                                    content: errors.parentSignature,
                                                    pointing: "above",
                                                }
                                            }
                                            width={8}
                                            placeholder="Parent/Guardian's Signature"
                                            name="parentSignature"
                                            value={values.parentSignature}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Form.Group>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Form.Group>
                                        <Form.Input 
                                            icon={<Icon name="asterisk" size="small" color = "red" />}
                                            error={
                                                touched.date &&
                                                errors.date !== undefined && {
                                                    content: errors.date,
                                                    pointing: "above",
                                                }
                                            }
                                            width={4}
                                            placeholder="Date"
                                            name="date"
                                            value={values.date}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </Form.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form.Group>
                    <Divider hidden/>

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
                    <Persist name ={`page${pageNo}`} />
                </Container>
            )}
        </Formik>
    )

};

export default Page10;