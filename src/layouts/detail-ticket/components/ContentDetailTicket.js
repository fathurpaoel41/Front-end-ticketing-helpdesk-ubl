import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import { useState, useEffect } from "react";
import UserApi from "API/UserApi";
import SuiBadge from "components/SuiBadge";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TicketApi from 'API/TicketApi';
import TrackingApi from 'API/TrackingApi';
import { useNavigate } from "react-router-dom"
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function ContentDetailTicket({ dataTicket }) {
    const [open, setOpen] = useState(false)
    const [openKerjakan, setOpenKerjakan] = useState(false)
    const [openDone, setOpenDone] = useState(false)
    const ticketApi = new TicketApi()
    const trackingApi = new TrackingApi()

    let navigate = useNavigate()

    const role = localStorage.getItem("role");
    const handleOpenApprove = () => setOpen(true);
    const handleCloseApprove = () => setOpen(false);
    const handleOpenKerjakan = () => setOpenKerjakan(true);
    const handleCloseKerjakan = () => setOpenKerjakan(false);
    const handleOpenDone = () => setOpenDone(true);
    const handleCloseDone = () => setOpenDone(false);

    const handleSubmitAssign = async (values) => {
        if (values.status == "Confirmed") {
            const obj = {
                id_ticket: dataTicket[0]?.id_ticket,
                assigned: values.assigned,
                status: values.status
            }
            await ticketApi.approvalTicket(obj).then(res => {
                if (res) {
                    navigate("/ticket", {
                        state: {
                            message: "Berhasil Assigned IT Support"
                        }
                    })
                } else {
                    alert("gagal")
                }
            }).catch(e => {
                alert("gagal")
                console.log({ error: e })
            })
        } else {
            const obj = {
                id_ticket: dataTicket[0]?.id_ticket,
                status: values.status,
                reason: values.reason,
            }
            await ticketApi.approvalTicket(obj).then(res => {
                if (res) {
                    navigate("/ticket", {
                        state: {
                            message: "Berhasil Mengubah Status ticket menjadi Rejected"
                        }
                    })
                } else {
                    alert("gagal")
                }
            }).catch(e => {
                alert("gagal")
                console.log({ error: e })
            })
        }

    }

    const handleSubmitKerjakan = () => {
        const obj = {
            id_ticket: dataTicket[0]?.id_ticket,
        }
        trackingApi.confirmTrackingProgress(obj).then(res => {
            if (res) {
                navigate("/ticket", {
                    state: {
                        message: "Berhasil Mengubah Status Ke Progress"
                    }
                })
            } else {
                alert("gagal")
            }
        })
    }

    const handleSubmitDone = (value) => {
        const body = {
            id_ticket: dataTicket[0]?.id_ticket,
            solusi: value
        }

        ticketApi.doneTicket(body).then(res => {
            if (res) {
                navigate("/ticket", {
                    state: {
                        message: "Berhasil Mengubah Status Ke Done"
                    }
                })
            } else {
                alert("gagal")
            }
        })
    }

    return (
        <>
            <div>
                <Card>
                    <SuiBox p={2}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={12}>
                                <SuiBox display="flex" flexDirection="column" height="100%">
                                    <SuiTypography variant="h4" fontWeight="bold" gutterBottom>
                                        {dataTicket !== undefined || null ?
                                            (<div style={{ justifyContent: "space-between", display: "flex" }}>
                                                <div>Detail Ticket</div>
                                                {role === "IT Operator" && dataTicket[0]?.status === "Waiting Confirmation" ? (<div><button class="btn btn-primary" onClick={handleOpenApprove}>Approve</button></div>) : ""}
                                                {role === "IT Support" && dataTicket[0]?.status === "Confirmed" ? (<div><button class="btn btn-warning" onClick={handleOpenKerjakan}>Kerjakan</button></div>) : ""}
                                                {role === "IT Support" && dataTicket[0]?.status === "Progress" ? (<div><button class="btn btn-success" onClick={handleOpenDone}>Done</button></div>) : ""}
                                            </div>) : ""}
                                    </SuiTypography>
                                    {dataTicket !== undefined || null ?
                                        (<SuiBox >
                                            <SuiTypography variant="h5">
                                                ID Ticket
                                            </SuiTypography>
                                            <SuiTypography variant="body2" color="text">
                                                {dataTicket[0]?.id_ticket}
                                            </SuiTypography>
                                            <br />
                                            <SuiTypography variant="h5">
                                                Kategori
                                            </SuiTypography>
                                            <SuiTypography variant="body2" color="text">
                                                {dataTicket[0]?.nama_kategori}
                                            </SuiTypography>
                                            <br />
                                            <SuiTypography variant="h5">
                                                Problem Detail
                                            </SuiTypography>
                                            <SuiTypography variant="body2" color="text">
                                                {dataTicket[0]?.problem_detail}
                                            </SuiTypography>
                                            <br />
                                            <SuiTypography variant="h5">
                                                Tanggal Dibuat
                                            </SuiTypography>
                                            <SuiTypography variant="body2" color="text">
                                                {dataTicket[0]?.tanggal_dibuat}
                                            </SuiTypography>
                                            <br />
                                            <SuiTypography variant="h5">
                                                Tanggal Solved
                                            </SuiTypography>
                                            <SuiTypography variant="body2" color="text">
                                                {dataTicket[0]?.tanggal_solved == null || "" ? "NULL" : dataTicket[0]?.tanggal_solved}
                                            </SuiTypography>
                                            <br />
                                            <SuiTypography variant="h5">
                                                Nama User
                                            </SuiTypography>
                                            <SuiTypography variant="body2" color="text">
                                                {dataTicket[0]?.nama_user == null || "" ? "NULL" : dataTicket[0]?.nama_user}
                                            </SuiTypography>
                                            <br />
                                            <SuiTypography variant="h5">
                                                Assigned
                                            </SuiTypography>
                                            <SuiTypography variant="body2" color="text">
                                                {dataTicket[0]?.nama_assigned == null || "" ? "NULL" : dataTicket[0]?.nama_assigned}
                                            </SuiTypography>
                                        </SuiBox>) : ""
                                    }
                                </SuiBox>
                            </Grid>
                        </Grid>
                    </SuiBox>
                </Card>
            </div >
            <ModalAssigned open={open} handleClose={handleCloseApprove} handleSubmit={handleSubmitAssign} />
            <ModalKerjakan open={openKerjakan} handleClose={handleCloseKerjakan} handleSubmit={handleSubmitKerjakan} />
            <ModalDone open={openDone} handleClose={handleCloseDone} handleSubmit={handleSubmitDone} />
        </>
    );
}

function ModalAssigned({ open, handleClose, handleSubmit }) {
    const [approve, setApprove] = useState(false)
    const [itSupport, setItSupport] = useState(null)
    const [userItSupport, setUserItSupport] = useState([])
    const [alasan, setAlasan] = useState("")

    const userApi = new UserApi()
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

    useEffect(() => {
        getUserItSupport()
    }, [])

    const getUserItSupport = () => {
        const obj = {
            divisi: "DVS002"
        }
        userApi.getUserDivisi(obj).then(res => { setUserItSupport(res?.data?.data) })
    }

    const handleItSupport = (e) => setItSupport(e.target.value)

    function setHandleSubmitAssigned() {
        let body = {
            assigned: itSupport,
            status: "Confirmed"
        }
        handleSubmit(body)
    }

    function handleSwitch(e) {
        setApprove(e.target.checked)
    }

    function handleAlasan(e) {
        setAlasan(e.target.value)
    }

    function setHandleSubmitAlasan() {
        let body = {
            reason: alasan,
            status: "Rejected"
        }
        handleSubmit(body)
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
                    Approve Ticket
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <p>Apakah anda ingin menyetujui ticket ini?</p>
                    <center>
                        Tidak Setuju&nbsp;<Switch color="primary" onChange={handleSwitch} />&nbsp;Setuju
                    </center>

                </Typography>

                {approve ? (
                    <>
                        <Typography id="modal-modal-title" variant="h4" component="h1">
                            Assigned IT Support
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <label>Pilih IT Support : </label><br />
                            <select className="form-select" onChange={handleItSupport} >
                                <option value="" selected>-- Pilih IT Support --</option>
                                {userItSupport.map((res, idx) => {
                                    return <option key={idx} value={res.id}>{res.nama}</option>
                                })}
                            </select>
                            <br />
                            <button className="btn btn-primary btn-sm" onClick={setHandleSubmitAssigned}>Submit</button>  <button className="btn btn-danger btn-sm" onClick={handleClose}>Close</button>
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <label>Input Alasan</label><br />
                            <textarea className="form-control" placeholder="Tulis Alasan" onChange={handleAlasan}></textarea>
                            <br />
                            <button className="btn btn-primary btn-sm" onClick={setHandleSubmitAlasan}>Submit</button>  <button className="btn btn-danger btn-sm" onClick={handleClose}>Close</button>
                        </Typography>
                    </>
                )
                }



            </Box>
        </Modal >
    )
}

function ModalKerjakan({ open, handleClose, handleSubmit }) {
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

    function setHandleSubmit() {
        handleSubmit(true)
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
                    Apakah anda yakin ingin mengerjakan ticket ini?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <button className="btn btn-primary btn-sm" onClick={setHandleSubmit}>Ya</button>  <button className="btn btn-danger btn-sm" onClick={handleClose}>Tidak</button>
                </Typography>
            </Box>
        </Modal >
    )
}

function ModalDone({ open, handleClose, handleSubmit }) {
    const [itSupport, setItSupport] = useState(null)
    const [solusi, setSolusi] = useState([])

    const userApi = new UserApi()
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

    const handleChangeSolusi = (e) => setSolusi(e.target.value)

    function setHandleSubmit() {
        handleSubmit(solusi)
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
                    Selesaikan Ticket
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <label>Input Solusi</label><br />
                    <textarea className="form-control" placeholder="Tulis solusi kedepan untuk user" onChange={handleChangeSolusi}></textarea>
                    <br />
                    <button className="btn btn-primary btn-sm" onClick={setHandleSubmit}>Submit</button>  <button className="btn btn-danger btn-sm" onClick={handleClose}>Close</button>
                </Typography>
            </Box>
        </Modal >
    )
}