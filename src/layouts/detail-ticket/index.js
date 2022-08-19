import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Typography from '@mui/material/Typography';

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import { useNavigate, useParams } from 'react-router-dom';
import ContentDetailTicket from "./components/ContentDetailTicket";
import ContentDetailTracking from "./components/ContentDetailTracking";
import TicketApi from "../../API/TicketApi"
import { useEffect, useState } from "react";
import TrackingApi from "../../API/TrackingApi"
import FeedbackApi from "../../API/FeedbackApi"

export default function DetailTicket() {
    let { idTicket } = useParams()
    const ticketApi = new TicketApi()
    const trackingApi = new TrackingApi()
    const feedbackApi = new FeedbackApi()
    let navigate = useNavigate()
    const [dataTicket, setDataTicket] = useState(null)
    const [dataTracking, setDataTracking] = useState(null)
    const [feedback, setFeedback] = useState("")


    const checkRole = () => {
        const role = localStorage.getItem('role')
        if (role === "IT Support" || role === "Administrator" || role === "IT Operator") {
            return false
        } else {
            return true
        }
    }

    const setHandleSubmitFeedback = () => {
        let body = {
            id_ticket: idTicket,
            feedback: feedback
        }

        feedbackApi.addFeedback(body).then(res => {
            if (res) {
                navigate("/ticket", {
                    state: {
                        message: "Berhasil Menambahkan Feedback"
                    }
                })
            } else {
                alert("gagal")
            }
        })
    }

    const handleChangeFeedback = (e) => setFeedback(e.target.value)

    useEffect(() => {
        ticketApi.readTicketByIdTicket(idTicket).then(res => {
            setDataTicket(res.data.data)
        })
        trackingApi.readAllTracking(idTicket).then(res => {
            setDataTracking(res.data.data)
        })
    }, [])


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox py={3}>
                <Grid container spacing={3}>
                    {dataTracking !== null && dataTicket !== null ? (
                        <>
                            <Grid item xs={12} md={6} lg={8}>
                                <ContentDetailTicket dataTicket={dataTicket} />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <ContentDetailTracking dataTracking={dataTracking} />
                            </Grid>

                            {dataTicket[0]?.solusi !== null ? (
                                <Grid item xs={12} md={6} lg={6}>
                                    <Card>
                                        <SuiBox p={2}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} lg={12}>
                                                    <SuiTypography variant="h4" fontWeight="bold" gutterBottom>
                                                        Solusi
                                                    </SuiTypography>
                                                    <SuiTypography variant="body2" color="text">
                                                        <p align="justify">{dataTicket[0]?.solusi}</p>
                                                    </SuiTypography>
                                                </Grid>
                                            </Grid>
                                        </SuiBox>
                                    </Card>
                                </Grid>
                            ) : ""}


                            {checkRole() && dataTicket[0]?.status == "Done" ? (
                                <Grid item xs={12} md={6} lg={6}>
                                    <Card>
                                        <SuiBox p={2}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} lg={12}>
                                                    <SuiTypography variant="h4" fontWeight="bold" gutterBottom>
                                                        Feedback
                                                    </SuiTypography>
                                                    <SuiTypography variant="body2" color="text">
                                                        {dataTicket[0].feedback == null ?
                                                            (<><label>Input Feedback</label>
                                                                <textarea className="form-control" placeholder="Tulis solusi kedepan untuk IT Support" onChange={handleChangeFeedback}></textarea>
                                                                <br />
                                                                <button className="btn btn-primary btn-sm" onClick={setHandleSubmitFeedback} disabled={feedback.length > 0 ? false : true}>Submit</button></>)
                                                            :
                                                            (<p align="justify">{dataTicket[0]?.feedback}</p>)}
                                                    </SuiTypography>
                                                </Grid>
                                            </Grid>
                                        </SuiBox>
                                    </Card>
                                </Grid>
                            ) : ""}
                            {dataTicket[0].feedback != null && dataTicket[0]?.status == "Done" && !checkRole() ? (
                                <Grid item xs={12} md={6} lg={6}>
                                    <Card>
                                        <SuiBox p={2}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} lg={12}>
                                                    <SuiTypography variant="h4" fontWeight="bold" gutterBottom>
                                                        Feedback
                                                    </SuiTypography>
                                                    <SuiTypography variant="body2" color="text">
                                                        {dataTicket[0].feedback == null ?
                                                            (<><label>Input Feedback</label>
                                                                <textarea className="form-control" placeholder="Tulis solusi kedepan untuk IT Support" onChange={handleChangeFeedback}></textarea>
                                                                <br />
                                                                <button className="btn btn-primary btn-sm" onClick={setHandleSubmitFeedback} disabled={feedback.length > 0 ? false : true}>Submit</button></>)
                                                            :
                                                            (<p align="justify">{dataTicket[0]?.feedback}</p>)}
                                                    </SuiTypography>
                                                </Grid>
                                            </Grid>
                                        </SuiBox>
                                    </Card>
                                </Grid>
                            ) : ""}
                            {dataTicket[0].reason != null && (
                                <Grid item xs={12} md={6} lg={6}>
                                    <Card>
                                        <SuiBox p={2}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} lg={12}>
                                                    <SuiTypography variant="h4" fontWeight="bold" gutterBottom>
                                                        Reason Rejected
                                                    </SuiTypography>
                                                    <SuiTypography variant="body2" color="text">
                                                        <p align="justify">{dataTicket[0]?.reason}</p>
                                                    </SuiTypography>
                                                </Grid>
                                            </Grid>
                                        </SuiBox>
                                    </Card>
                                </Grid>
                            )}
                        </>)
                        : <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    }

                </Grid>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    );
}
