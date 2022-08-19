import { useState, useEffect, useInsertionEffect } from "react";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import TableAndPagination from "MyComponent/TableAndPagination";
import SuiBadge from "components/SuiBadge";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

//consume API
import DivisiApi from "../../../../API/DivisiApi"

//FormikValidation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"

import { useNavigate } from "react-router-dom"

export default function CardViewDivisi({ idDivisi }) {

    const [valueDivisi, setValueDivisi] = useState(null)

    let navigate = useNavigate()
    const divisiApi = new DivisiApi()

    const validationSchema = Yup.object().shape({
        nama_divisi: Yup.string().min(3, "Minimal 3 karakter").required("Divisi harus diisi"),
    });

    useEffect(() => {
        getDivisi()
    }, [])

    async function getDivisi() {
        divisiApi.getDivisi(idDivisi).then(res => {
            setValueDivisi(res.data.data[0])
        }).catch(err => {
            console.log(err);
            alert("gagal")
        })
    }

    async function handleSubmit(values) {
        await divisiApi.updateDivisi(idDivisi, values).then(res => {
            if (res) {
                navigate("/divisi", {
                    state: {
                        message: "Data Berhasil Diubah"
                    }
                })
            } else {
                alert("gagal")
            }
        }).catch(error => {
            console.log({ error })
            alert("gagal")
        })
    }

    return (
        <div>
            <Card>
                <SuiBox p={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6}>
                            <SuiBox display="flex" flexDirection="column" height="100%">
                                <SuiTypography variant="h4" fontWeight="bold" gutterBottom>
                                    View Divisi
                                </SuiTypography>
                                {valueDivisi !== null ? (
                                    <SuiBox >
                                        <Formik
                                            initialValues={{ nama_divisi: valueDivisi.nama_divisi }}
                                            validationSchema={validationSchema}
                                            validateOnChange={true}
                                            validateOnBlur={true}
                                            onSubmit={values => {
                                                handleSubmit(values)
                                            }}
                                        >

                                            {(props) => (
                                                <Form>
                                                    <Field name="nama_divisi">
                                                        {({ field, form }) => (
                                                            <>
                                                                <SuiBox>
                                                                    <label>
                                                                        <SuiTypography variant="h6" gutterBottom>
                                                                            Input Nama Divisi
                                                                        </SuiTypography>
                                                                    </label>
                                                                    <input type="text" value={props.values.nama_divisi} className={form.errors.nama_divisi && form.touched.nama_divisi ? "form-control is-invalid" : "form-control"} name="nama_divisi" {...field} />
                                                                    {form.errors.nama_divisi && form.touched.nama_divisi ? (<SuiTypography component="label" variant="caption" fontWeight="bold">
                                                                        <span style={{ color: '#d9534f' }}>{form.errors.nama_divisi && form.errors.nama_divisi ? form.errors.nama_divisi : ""}</span>
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
                                    </SuiBox>) : <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>}

                            </SuiBox>
                        </Grid>
                    </Grid>
                </SuiBox>
            </Card>
        </div>
    );
}