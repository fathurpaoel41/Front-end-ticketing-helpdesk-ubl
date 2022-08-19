import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Grid from "@mui/material/Grid";

//consume API
import DivisiApi from "../../../../API/DivisiApi";
import UserApi from "../../../../API/UserApi";

//FormikValidation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"

import { useNavigate } from "react-router-dom"


export default function CardInputUser() {

    const [getDivisi, setGetDivisi] = useState([])
    const [statusEmail, setStatusEmail] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

    let navigate = useNavigate()
    const divisiApi = new DivisiApi()
    const userApi = new UserApi()

    useEffect(() => {
        getAllDivisi()
    }, [])

    async function getAllDivisi() {
        let arrDivisi = []
        await divisiApi.readAllDivisi().then(r => {
            r.data.data.data.map(res => {
                let obj = {
                    id_divisi: res.id_divisi,
                    nama_divisi: res.nama_divisi
                }
                arrDivisi.push(obj)
            })
        })
        setGetDivisi(arrDivisi)
    }

    const validationSchema = Yup.object().shape({
        nama: Yup.string().min(5, "Minimal 5 karakter").required("Nama harus diisi"),
        divisi: Yup.string().min(5, "Minimal 5 karakter").required("Divisi harus Diisi"),
        email: Yup.string().email("Email tidak Valid").required("Problem Detail harus Diisi"),
        password: Yup.string().min(3, "minimal 3 karakter").required('Password is required'),
        passwordConfirmation: Yup.string().required("Password Confirmation harus diisi")
            .oneOf([Yup.ref('password'), null], 'Passwords Harus Sama')
    });

    async function handleSubmit(values) {
        let body = { email: values.email }
        userApi.checkEmail(body).then(res => {
            if (res.data.status) {
                setStatusEmail(false)
                userApi.addUser(values).then(res => {
                    if (res) {
                        navigate("/user-list", {
                            state: {
                                message: "Data Berhasil Diinput"
                            }
                        })
                    } else {
                        alert("gagal")
                    }
                })
            } else {
                setStatusEmail(true)
            }
        })
    }

    const handleShowPassword = () => setShowPassword(!showPassword)
    const handleShowPasswordConfirmation = () => setShowPasswordConfirmation(!showPasswordConfirmation)

    return (
        <div>
            <Card>
                <SuiBox p={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6}>
                            <SuiBox display="flex" flexDirection="column" height="100%">
                                <SuiTypography variant="h4" fontWeight="bold" gutterBottom>
                                    Input User
                                </SuiTypography>
                                <SuiBox >
                                    <Formik
                                        initialValues={{ nama: "", email: "", divisi: "", password: "", passwordConfirmation: "" }}
                                        validationSchema={validationSchema}
                                        validateOnChange={true}
                                        validateOnBlur={true}
                                        onSubmit={values => {
                                            handleSubmit(values)
                                        }}
                                    >

                                        {(props) => (
                                            <Form>
                                                <Field name="nama">
                                                    {({ field, form }) => (
                                                        <>
                                                            <SuiBox>
                                                                <label>
                                                                    <SuiTypography variant="h6" gutterBottom>
                                                                        Input Nama
                                                                    </SuiTypography>
                                                                </label>
                                                                <input autoComplete type="text" className={form.errors.nama && form.touched.nama ? "form-control is-invalid" : "form-control"} name="nama" {...field} />
                                                                {form.errors.nama && form.touched.nama ? (<SuiTypography component="label" variant="caption" fontWeight="bold">
                                                                    <span style={{ color: '#d9534f' }}>{form.errors.nama && form.errors.nama ? form.errors.nama : ""}</span>
                                                                </SuiTypography>) : ""}
                                                            </SuiBox>
                                                        </>
                                                    )}
                                                </Field>
                                                <Field name="email">
                                                    {({ field, form }) => (
                                                        <>
                                                            <SuiBox>
                                                                <label>
                                                                    <SuiTypography variant="h6" gutterBottom>
                                                                        Input email
                                                                    </SuiTypography>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className={form.errors.email && form.touched.email ? "form-control is-invalid" : "form-control"}
                                                                    name="email"
                                                                    autoComplete
                                                                    {...field} />
                                                                {form.errors.email && form.touched.email ? (<SuiTypography component="label" variant="caption" fontWeight="bold">
                                                                    <span style={{ color: '#d9534f' }}>{form.errors.email && form.errors.email ? form.errors.email : ""}</span>
                                                                </SuiTypography>) : ""}
                                                                {statusEmail ? (<SuiTypography component="label" variant="caption" fontWeight="bold">
                                                                    <span style={{ color: '#d9534f' }}>Email sudah digunakan</span>
                                                                </SuiTypography>) : ""}
                                                            </SuiBox>
                                                        </>
                                                    )}
                                                </Field>
                                                <Field name="divisi">
                                                    {({ field, form }) => (
                                                        <>
                                                            <SuiBox>
                                                                <label>
                                                                    <SuiTypography variant="h6" gutterBottom>
                                                                        Input Divisi
                                                                    </SuiTypography>
                                                                </label>
                                                                <select className={form.errors.divisi && form.touched.divisi ? "form-select is-invalid" : "form-select"} name="divisi" {...field}>
                                                                    <option value="" selected disabled hidden>-- Pilih Divisi --</option>
                                                                    {getDivisi.map((res, idx) => {
                                                                        return <option key={idx} value={res.id_divisi}>{res.nama_divisi}</option>
                                                                    })}
                                                                </select>
                                                                {form.errors.divisi && form.touched.divisi ? (<SuiTypography component="label" variant="caption" fontWeight="bold">
                                                                    <span style={{ color: '#d9534f' }}>{form.errors.divisi && form.errors.divisi ? form.errors.divisi : ""}</span>
                                                                </SuiTypography>) : ""}
                                                            </SuiBox>
                                                        </>
                                                    )}
                                                </Field>
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
                                                                        className={form.errors.password && form.touched.password ? "form-control is-invalid" : "form-control"}
                                                                        name="password"
                                                                        autoComplete
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
                                                                        Input Password Confimation
                                                                    </SuiTypography>
                                                                </label>
                                                                <div class="input-group mb-3">
                                                                    <input
                                                                        type={showPasswordConfirmation ? "text" : "password"}
                                                                        className={form.errors.passwordConfirmation && form.touched.passwordConfirmation ? "form-control is-invalid" : "form-control"}
                                                                        name="passwordConfirmation"
                                                                        autoComplete
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
                                                <button className="btn btn-danger" type="reset">Reset <i class="fa fa-repeat" aria-hidden="true"></i></button>&nbsp;
                                                <button className="btn btn-primary" type="submit">Submit <i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                                            </Form>
                                        )}
                                    </Formik>
                                </SuiBox>
                            </SuiBox>
                        </Grid>
                    </Grid>
                </SuiBox>
            </Card>
        </div>
    );
}
