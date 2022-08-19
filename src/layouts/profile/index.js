import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import Header from "layouts/profile/components/Header";
import { useEffect, useState } from "react"
import AuthApi from "API/AuthApi";
import UserApi from "API/UserApi";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"
import Switch from '@mui/material/Switch';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function Overview() {
  const authApi = new AuthApi()
  const userApi = new UserApi()

  const [profile, setProfile] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    authApi.me().then((res) => {
      setProfile(res.data.data)
    })
  }, [])

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(3, "minimal 3 karakter").required('Password harus diisi'),
    passwordConfirmation: Yup.string().required("Password Confirmation harus diisi")
      .oneOf([Yup.ref('password'), null], 'Passwords Harus Sama')
  });

  const handleShowPassword = () => setShowPassword(!showPassword)
  const handleShowPasswordConfirmation = () => setShowPasswordConfirmation(!showPasswordConfirmation)
  const handleChangeSwitch = (event) => setChecked(event.target.checked)

  const handleSubmitChangePassword = (values) => {
    let body = {
      nama: profile[0].nama,
      divisi: profile[0].divisi,
      password: values.password
    }
    let idUser = localStorage.getItem('id_user')
    userApi.editUser(idUser, body).then(res => {
      if (res) {
        setShowAlert(true)
        setChecked(false)
      } else {
        alert("gagal")
      }
    })
  }

  return (
    <DashboardLayout>
      {profile !== null ? (<Header nama={profile[0].nama} />) : (<Header />)}
      <SuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
        </Grid>
        {showAlert ? <Alert onClose={() => { setShowAlert(false) }} icon={<CheckIcon fontSize="inherit" />} severity="success">
          Password Berhasil Diubah
        </Alert> : ""}
      </SuiBox>
      <SuiBox mb={3}>
        {profile !== null ? (<Card>
          <SuiBox pt={2} px={2}>
            <SuiBox mb={0.5}>
              <SuiTypography variant="h6" fontWeight="medium">
                Email
              </SuiTypography>
            </SuiBox>
            <SuiBox mb={1}>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                {profile[0].email}
              </SuiTypography>
            </SuiBox>

            <SuiBox mb={0.5}>
              <SuiTypography variant="h6" fontWeight="medium">
                Divisi
              </SuiTypography>
            </SuiBox>
            <SuiBox mb={1}>
              <SuiTypography variant="button" fontWeight="regular" color="text">
                {profile[0].nama_divisi}
              </SuiTypography>
            </SuiBox>
            <SuiBox mb={0.5}>
              <SuiTypography variant="h6" fontWeight="medium">
                Ganti Password &nbsp;
                <Switch
                  checked={checked}
                  onChange={handleChangeSwitch}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </SuiTypography>
            </SuiBox>
            {checked && (<Grid item xs={12} lg={6}>
              <Formik
                initialValues={{ password: "", passwordConfirmation: "" }}
                validationSchema={validationSchema}
                validateOnChange={true}
                validateOnBlur={true}
                onSubmit={values => {
                  handleSubmitChangePassword(values)
                }}
              >

                {(props) => (
                  <Form>
                    <Field name="password">
                      {({ field, form }) => (
                        <>
                          <SuiBox>
                            <label>
                              <SuiTypography variant="h6" gutterBottom>
                                Input Password
                              </SuiTypography>
                            </label>
                            <div class="input-group mb-3">
                              <input
                                type={showPassword ? "text" : "password"}
                                className={form.errors.password && form.touched.password ? "form-control is-invalid " : "form-control"}
                                name="password"
                                aria-label="Recipient's username" aria-describedby="basic-addon2"
                                {...field}
                              />
                              <span
                                class="input-group-text"
                                style={{ cursor: 'pointer' }}
                                id="basic-addon2"
                                onClick={handleShowPassword}>
                                <i class={showPassword ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true" />
                              </span>
                            </div>
                            {form.errors.password && form.touched.password ? (<SuiTypography component="label" variant="caption" fontWeight="bold">
                              <span style={{ color: '#d9534f' }}>{form.errors.password && form.errors.password ? form.errors.password : ""}</span>
                            </SuiTypography>) : ""}
                          </SuiBox>
                        </>
                      )}
                    </Field>
                    <Field name="passwordConfirmation">
                      {({ field, form }) => (
                        <>
                          <SuiBox>
                            <label>
                              <SuiTypography variant="h6" gutterBottom>
                                Input Password Confirmation
                              </SuiTypography>
                            </label>
                            <div class="input-group mb-3">
                              <input
                                type={showPasswordConfirmation ? "text" : "password"}
                                className={form.errors.passwordConfirmation && form.touched.passwordConfirmation ? "form-control is-invalid" : "form-control"}
                                name="passwordConfirmation"
                                {...field}
                              />
                              <span
                                class="input-group-text"
                                style={{ cursor: 'pointer' }}
                                id="basic-addon2"
                                onClick={handleShowPasswordConfirmation}>
                                <i class={showPasswordConfirmation ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true" />
                              </span>
                            </div>
                            {form.errors.passwordConfirmation && form.touched.passwordConfirmation ? (<SuiTypography component="label" variant="caption" fontWeight="bold">
                              <span style={{ color: '#d9534f' }}>{form.errors.passwordConfirmation && form.errors.passwordConfirmation ? form.errors.passwordConfirmation : ""}</span>
                            </SuiTypography>) : ""}
                          </SuiBox>
                        </>
                      )}
                    </Field>
                    <br />
                    <button className="btn btn-danger" type="reset">Reset <i class="fa fa-repeat" aria-hidden="true"></i></button> &nbsp;
                    <button className="btn btn-primary" type="submit">Ubah <i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                  </Form>
                )}
              </Formik>
            </Grid>)}

          </SuiBox>
          <SuiBox p={2}>
          </SuiBox>
        </Card>) : ""}

      </SuiBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
