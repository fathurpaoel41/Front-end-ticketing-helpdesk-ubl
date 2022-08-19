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
import TicketApi from "../../../../API/TicketApi";
import CategoryApi from "../../../../API/CategoryApi"

//FormikValidation
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"

import { useNavigate } from "react-router-dom"

export default function CardInputTicket() {

    const [openModal, setOpenModal] = useState(false)
    const [getCategory, setGetCategory] = useState([])
    const [bodyTicket, setBodyTicket] = useState(null)
    const [modalLoading, setModalLoading] = useState(false)

    let navigate = useNavigate()
    const ticketApi = new TicketApi()

    useEffect(() => {
        getAllCategory()
    }, [])

    async function getAllCategory() {
        let arrCategory = []
        const categoryApi = new CategoryApi()
        await categoryApi.getAllCategory().then(r => {
            r.data.data.data.map(res => {
                let obj = {
                    id_kategori: res.id_kategori,
                    nama_kategori: res.nama_kategori
                }
                arrCategory.push(obj)
            })
        })
        setGetCategory(arrCategory)
    }

    const LoginSchema = Yup.object().shape({
        kategori: Yup.string().required("Kategori harus diisi"),
        problem_detail: Yup.string().min(5, "Minimal 5 karakter").required("Problem Detail harus Diisi")
    });

    const handleOpenModal = () => setOpenModal(!openModal)

    async function handleSubmit(status, values) {
        setBodyTicket(values)
        if (status) {
            setModalLoading(true)
            await ticketApi.inputTicketClient(bodyTicket).then(res => {
                if (res) {
                    navigate("/ticket", {
                        state: {
                            message: "Data Berhasil Diinput"
                        }
                    })
                } else {
                    alert("gagal")
                }
                setModalLoading(false)
            })
        } else {
            handleOpenModal()
        }
    }

    return (
        <div>
            <Card>
                <SuiBox p={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6}>
                            <SuiBox display="flex" flexDirection="column" height="100%">
                                <SuiTypography variant="h4" fontWeight="bold" gutterBottom>
                                    Input Ticket
                                </SuiTypography>
                                <SuiBox >
                                    <Formik
                                        initialValues={{ kategori: "", problem_detail: "" }}
                                        validationSchema={LoginSchema}
                                        validateOnChange={true}
                                        validateOnBlur={true}
                                        onSubmit={values => {
                                            handleSubmit(false, values)
                                        }}
                                    >

                                        {(props) => (
                                            <Form>
                                                <Field name="kategori">
                                                    {({ field, form }) => (
                                                        <>
                                                            <SuiBox>
                                                                <label>
                                                                    <SuiTypography variant="h6" gutterBottom>
                                                                        Input Ticket
                                                                    </SuiTypography>
                                                                </label>
                                                                <select className={form.errors.kategori && form.touched.kategori ? "form-select is-invalid" : "form-select"} name="kategori" {...field}>
                                                                    <option value="" selected disabled hidden>-- Pilih Status --</option>
                                                                    {getCategory.map((res, idx) => {
                                                                        return <option key={idx} value={res.id_kategori}>{res.nama_kategori}</option>
                                                                    })}
                                                                </select>
                                                                {form.errors.kategori && form.touched.kategori ? (<SuiTypography component="label" variant="caption" fontWeight="bold">
                                                                    <span style={{ color: '#d9534f' }}>{form.errors.kategori && form.errors.kategori ? form.errors.kategori : ""}</span>
                                                                </SuiTypography>) : ""}
                                                            </SuiBox>
                                                        </>
                                                    )}
                                                </Field>
                                                <Field name="problem_detail">
                                                    {({ field, form }) => (
                                                        <>
                                                            <SuiBox>
                                                                <label>
                                                                    <SuiTypography variant="h6" gutterBottom>
                                                                        Problem Detail
                                                                    </SuiTypography>
                                                                </label>
                                                                <textarea className={form.errors.problem_detail && form.touched.problem_detail ? "form-control is-invalid" : "form-control"} name="problem_detail" placeholder="Tulis Problem Detail" {...field}></textarea>
                                                                {form.errors.problem_detail && form.touched.problem_detail ? (<SuiTypography component="label" variant="caption" fontWeight="bold">
                                                                    <span style={{ color: '#d9534f' }}>{form.errors.problem_detail && form.touched.problem_detail ? form.errors.problem_detail : ""}</span>
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
            <ModalSubmit open={openModal} handleClose={handleOpenModal} handleSubmitTicket={handleSubmit} modalLoading={modalLoading} />
        </div>
    );
}

function ModalSubmit({ open, handleClose, handleSubmitTicket, modalLoading }) {

    const [buttonSend, setButtonSend] = useState(true)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    function handleCheckbox(e) {
        setButtonSend(!buttonSend)
    }

    useEffect(() => {
        return () => {
            setButtonSend(true)
        }
    }, [open, handleClose])

    function setHandleSubmitTicket() {
        handleSubmitTicket(true)
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h1">
                    Alert
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <SuiBox>
                        <div style={{ width: '330px', height: '200px', overflowY: 'scroll', marginBottom: '20px' }}>
                            <p align="justify" style={{ width: "300px" }}>
                                <ol>
                                    <li>Dengan ini saya setuju untuk menyerahkan barang yang ingin di perbaiki</li>
                                    <li>Detail data yang diinput tidak dapat diubah, Pastikan data diinput dengan benar dan sesuai dengan keadaan yang diinputkan</li>
                                    <li>Para teknisi akan melakukan pengerjaan sesuai antrian</li>
                                    <li>Apabila kesalahan akibat Human Error maka karyawan sendiri yang harus bertanggung jawab</li>
                                </ol>
                            </p>
                        </div>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value={true} onChange={handleCheckbox} />
                        <label for="vehicle1">Saya Setuju</label>
                    </SuiBox>
                    <button className="btn btn-danger" onClick={handleClose}>Close <i class="fa fa-times-circle" aria-hidden="true"></i></button>&nbsp;
                    <button className="btn btn-primary" type="submit" onClick={setHandleSubmitTicket} disabled={buttonSend}>Submit <i class="fa fa-paper-plane" aria-hidden="true"></i></button>&nbsp;
                    {modalLoading && <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>}
                </Typography>
            </Box>
        </Modal >
    )
}
