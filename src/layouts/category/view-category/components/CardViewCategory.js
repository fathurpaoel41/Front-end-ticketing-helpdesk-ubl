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

export default function CardViewCategory({ idKategori }) {

    const [valueKategori, setValueKategori] = useState(null)

    let navigate = useNavigate()
    const categoryApi = new CategoryApi()

    const validationSchema = Yup.object().shape({
        nama_kategori: Yup.string().min(3, "Minimal 3 karakter").required("Kategori harus diisi"),
    });

    useEffect(() => {
        getKategori()
    }, [])

    async function getKategori() {
        categoryApi.getCategory(idKategori).then(res => {
            console.log(res)
            setValueKategori(res.data.data[0])
        }).catch(err => {
            console.log(err);
            alert("gagal")
        })
    }

    async function handleSubmit(values) {
        await categoryApi.updateCategory(idKategori, values).then(res => {
            if (res) {
                navigate("/kategori", {
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
                                    View Kategori
                                </SuiTypography>
                                {valueKategori !== null ? (
                                    <SuiBox >
                                        <Formik
                                            initialValues={{ nama_kategori: valueKategori.nama_kategori }}
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
                                                                    <input type="text" value={props.values.nama_kategori} className={form.errors.nama_kategori && form.touched.nama_kategori ? "form-control is-invalid" : "form-control"} name="nama_kategori" {...field} />
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