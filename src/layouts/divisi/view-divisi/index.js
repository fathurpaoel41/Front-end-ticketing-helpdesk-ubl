import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CardViewDivisi from "./components/CardViewDivisi";
import { useParams } from "react-router-dom"

export default function ViewDivisi() {
    let { idDivisi } = useParams()

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={12}>
                        <CardViewDivisi idDivisi={idDivisi} />
                    </Grid>
                </Grid>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    );
}
