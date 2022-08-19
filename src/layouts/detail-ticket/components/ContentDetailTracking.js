import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Grid from "@mui/material/Grid";
import TimelineItem from "examples/Timeline/TimelineItem";

export default function ContentDetailTracking({ dataTracking }) {

    function conditionalIcon(value) {
        let valueIcon = ""
        switch (value) {
            case "Waiting Confimation":
                valueIcon = "notifications"
                break
            case "Confirmed":
                valueIcon = "payment"
                break
            case "Progress":
                valueIcon = "shopping_cart"
                break
            case "Done":
                value = "payment"
                break
            case "Rejected":
                value = "shopping_cart"
                break
            default:
                valueIcon = "notifications";
        }
        return valueIcon
    }
    return (
        <div>
            <Card>
                <SuiBox p={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={12}>
                            <SuiTypography variant="h4" fontWeight="bold" gutterBottom>
                                Detail Ticket
                            </SuiTypography>
                            <SuiBox>
                                {dataTracking.map((res, idx) => {
                                    return <div key={idx}><TimelineItem
                                        color="success"
                                        icon={conditionalIcon(res.status)}
                                        title={res.status}
                                        dateTime={res.created_at}
                                    /></div>
                                })}
                            </SuiBox>
                        </Grid>
                    </Grid>
                </SuiBox>
            </Card>
        </div>
    );
}