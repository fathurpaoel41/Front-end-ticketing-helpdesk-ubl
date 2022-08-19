import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"

export default function Validation() {

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email address format").required("Email is required"),
        password: Yup.string().min(3, "Password must be 3 characters at minimum").required("Password is required")
    });
    return (
        <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SuiBox>
                    <SuiTypography variant="h6" gutterBottom>
                        Contoh Table
                    </SuiTypography>
                </SuiBox>
                <SuiBox>
                    <Formik
                        initialValues={
                            {
                                email: "",
                                password: ""
                            }
                        }
                        validationSchema={LoginSchema}
                        onSubmit={values => {
                            alert(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Field name="email" className="form-control" />
                                {
                                    errors.email && touched.email ? (<div>{errors.email}</div>) : null
                                }
                                <Field name="password" />
                                {
                                    errors.password && touched.password ? (<div>{errors.password}</div>) : null
                                }
                                <button type="submit" className="btn btn-success" onClick={() => { console.log({ errors }) }}>Submit</button>
                            </Form>
                        )}

                    </Formik>
                </SuiBox>
            </SuiBox>
        </Card>
    )
}