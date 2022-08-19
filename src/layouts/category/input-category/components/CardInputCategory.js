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
import CategoryApi from "../../../../API/CategoryApi"

//FormikValidation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom"

export default function CardViewCategory() {
    let navigate = useNavigate()
    const categoryApi = new CategoryApi()

    const validationSchema = Yup.object().shape({
        nama_kategori: Yup.string().min(3, "Minimal 3 karakter").required("Kategori harus diisi"),
    });

    async function handleSubmit(values) {
        await categoryApi.addCategory(values).then(res => {
            if (res.data.status) {
                navigate("/kategori", {
                    state: {
                        message: "Data Berhasil Ditambah"
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
                                    Tambah Kategori
                                </SuiTypography>
                                <SuiBox >
                                    <Formik
                                        initialValues={{ nama_kategori: "" }}
                                        validationSchema={validationSchema}
                                        validateOnChange={true}
                                        validateOnBlur={true}
                                        onSubmit={values => {
                                            handleSubmit(values)
                                        }}
                                    >

                                        {(props) => (
                                            <Form>
                                                <Field name="nama_kategori">
                                                    {({ field, form }) => (
                                                        <>
                                                            <SuiBox>
                                                                <label>
                                                                    <SuiTypography variant="h6" gutterBottom>
                                                                        Input Nama Kategori
                                                                    </SuiTypography>
                                                                </label>
                                                                <input type="text" className={form.errors.nama_kategori && form.touched.nama_kategori ? "form-control is-invalid" : "form-control"} name="nama_kategori" {...field} />
                                                                {form.errors.nama_kategori && form.touched.nama_kategori ? (<SuiTypography component="label" variant="caption" fontWeight="bold">
                                                                    <span style={{ color: '#d9534f' }}>{form.errors.nama_kategori && form.errors.nama_kategori ? form.errors.nama_kategori : ""}</span>
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