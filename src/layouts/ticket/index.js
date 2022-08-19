import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Dashboard layout components

// Data
import TableTicket from "../ticket/components/table-ticket/TableTicket"
import { useLocation } from "react-router-dom"
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";

export default function Ticket() {
    const [showAlert, setShowAlert] = useState(true)
    const location = useLocation()
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox py={3}>
                {location.state != null && showAlert ? <Alert onClose={() => { setShowAlert(false) }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                    {location.state.message}
                </Alert> : ""}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={12}>
                        <TableTicket />
                    </Grid>
                </Grid>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    );
}
