import Grid from "@mui/material/Grid";
import SuiBox from "components/SuiBox";
import Card from "@mui/material/Card";
import SuiBadge from "components/SuiBadge";
import SuiTypography from "components/SuiTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import TableAndPagination from "MyComponent/TableAndPagination";
import { useEffect, useState } from "react";
import DashboardApi from "../../API/DashboardApi";
import TicketApi from "../../API/TicketApi";
import AuthApi from "../../API/AuthApi";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import user from "../../assets/images/user.png";



export default function DashboardITOperator() {
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)
    const [series, setSeries] = useState([])
    const [labels, setLabels] = useState([])
    const [dataChart, setDataChart] = useState([])
    const [role, setRole] = useState("")
    const [dataUser, setDataUser] = useState([])

    const ticketApi = new TicketApi();
    const dashboardApi = new DashboardApi()
    const authApi = new AuthApi()
    const columns = [
        { name: "id_ticket", align: "center" },
        { name: "tanggal_dibuat", align: "center" },
        { name: "kategori", align: "center" },
        { name: "assigned", align: "center" },
        { name: "status", align: "center" },
    ]

    useEffect(() => {
        const roleCheck = localStorage.getItem("role")
        checkUser()
        setRole(roleCheck)
        fetchDataTable()
        fetchDataChart()
    }, [])

    const checkUser = async () => {
        authApi.me().then(res => {
            setDataUser(res.data.data[0])
        })
    }

    const fetchDataTable = async () => {
        setLoading(true)
        let dataRow = []
        await ticketApi.getTicketInProgress().then((res) => {
            res.data.data.map((r) => {
                let colorBadge = null
                switch (r.status) {
                    case "Waiting Confirmation":
                        colorBadge = "info"
                        break
                    case "Confirmed":
                        colorBadge = "primary"
                        break
                    case "Progress":
                        colorBadge = "warning"
                    default:
                        colorBadge = "light"
                }
                let obj = {
                    id_ticket: r.id_ticket,
                    tanggal_dibuat: r.tanggal_dibuat,
                    id_user: r.id_user,
                    kategori: r.nama_kategori,
                    assigned: r.nama_assigned,
                    status: (
                        <SuiBadge variant="gradient" badgeContent={r.status} color={colorBadge} size="xs" container />
                    ),
                }
                dataRow.push(obj)
            })
        })
        setRows(dataRow)
        setLoading(false)
    }

    const fetchDataChart = () => {
        dashboardApi.categoryChart().then(res => {
            let labels = []
            let series = []
            let arrDataChart = []
            res?.data?.data?.map(r => {
                labels.push(r.category)
                series.push(r.count)
                let obj = {
                    category: r.category,
                    count: r.count
                }
                arrDataChart.push(obj)
            })
            setLabels(labels)
            setSeries(series)
            setDataChart(arrDataChart)
        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={12}>
                        {role == "IT Support" || role == "IT Operator" || role == "Administrator" ? (
                            <>
                                <Card>
                                    <VerticalBarChart
                                        title="Chart Category"
                                        chart={{
                                            labels: labels,
                                            datasets: [{
                                                label: "Chart Category",
                                                color: "dark",
                                                data: series,
                                            }],
                                        }}
                                    />
                                </Card><br />
                                <Card>
                                    <SuiBox p={2}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} lg={12}>
                                                <SuiBox display="flex" flexDirection="column" height="100%">
                                                    <SuiTypography variant="h4" fontWeight="bold" gutterBottom>
                                                        Data Terkini
                                                    </SuiTypography>
                                                </SuiBox>
                                            </Grid>
                                        </Grid>
                                    </SuiBox>
                                    <TableAndPagination
                                        columns={columns}
                                        rows={rows}
                                        loading={loading}
                                    />
                                </Card><br /></>) : (
                            <>
                                <Card>
                                    <SuiBox p={2}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} lg={12}>
                                                <SuiBox display="flex" flexDirection="column" height="100%">
                                                    <div className="h-100 d-flex align-items-center justify-content-center">
                                                        <div>
                                                            <center>
                                                                <SuiTypography variant="h3" color="text">
                                                                    <img src={user} /> <br />
                                                                    Selamat Datang, {dataUser.nama}
                                                                </SuiTypography>
                                                            </center>
                                                        </div>
                                                    </div>
                                                </SuiBox>
                                            </Grid>
                                        </Grid>
                                    </SuiBox>
                                </Card></>)}


                    </Grid>
                </Grid>
            </SuiBox>
            <Footer />
        </DashboardLayout >
    );
}
