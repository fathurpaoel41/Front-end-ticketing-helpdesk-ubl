import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import TableAndPagination from "MyComponent/TableAndPagination";
import SuiBadge from "components/SuiBadge";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom"

//consume API
import TicketApi from "../../../../API/TicketApi";
import CategoryApi from "../../../../API/CategoryApi"

export default function TableTicket() {
    const columns = [
        { name: "no", align: "center" },
        { name: "id_ticket", align: "center" },
        { name: "tanggal_dibuat", align: "center" },
        { name: "tanggal_solved", align: "center" },
        { name: "nama_user", align: "center" },
        { name: "kategori", align: "center" },
        { name: "assigned", align: "center" },
        { name: "status", align: "center" },
        { name: "action", align: "center" }
    ]

    let navigate = useNavigate()

    const [rows, setRows] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [lastPage, setLastPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [bodyFilter, setBodyFilter] = useState(null);
    const [filter, setFilter] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const ticketApi = new TicketApi()

    useEffect(() => {
        fetchDataApi()
    }, [])

    const fetchDataApi = async (page = 1) => {
        setLoading(true)
        let dataRow = []
        let role = localStorage.getItem('role')
        let body = undefined
        console.log({ role })
        switch (role) {
            case "IT Support":
                body = {
                    assigned: parseInt(localStorage.getItem("id_user"))
                }
                break
            case "IT Operator":
                break
            case "Administrator":
                break
            default:
                body = {
                    id_user: parseInt(localStorage.getItem("id_user"))
                }
        }

        await ticketApi.readTicketClient(page, body).then((res) => {
            let i = (page * 10) - 9
            res.data?.data?.data?.map((r) => {
                let colorBadge = null
                switch (r.status) {
                    case "Waiting Confirmation":
                        colorBadge = "secondary"
                        break
                    case "Confirmed":
                        colorBadge = "primary"
                        break
                    case "Progress":
                        colorBadge = "warning"
                        break
                    case "Done":
                        colorBadge = "Success"
                        break
                    case "Rejected":
                        colorBadge = "error"
                        break
                    default:
                        colorBadge = "light"
                }
                let obj = {
                    no: i++,
                    id_ticket: r.id_ticket,
                    tanggal_dibuat: r.tanggal_dibuat,
                    tanggal_solved: r.tanggal_solved === null || "" ? "NULL" : r.tanggal_solved,
                    nama_user: r.nama_user,
                    kategori: r.nama_kategori,
                    assigned: r.nama_assigned === null || "" ? "NULL" : r.nama_assigned,
                    status: (
                        <SuiBadge variant="gradient" badgeContent={r.status} color={colorBadge} size="xs" container />
                    ),
                    action: (
                        <button className="btn btn-primary btn-sm" onClick={() => handleDetailTicket(r.id_ticket)}><i className="fa fa-eye"></i></button>
                    )
                }
                dataRow.push(obj)
                setCurrentPage(res.data.data.current_page)
                setLastPage(res.data.data.last_page)
            })
        })
        // }

        setRows(dataRow)
        setLoading(false)
    }

    async function filterTicket(body, page = 1) {
        setLoading(true)
        let dataRow = []
        let finalBody = body
        const role = localStorage.getItem('role')
        let obj = undefined

        switch (role) {
            case "IT Support":
                obj = {
                    assigned: parseInt(localStorage.getItem("id_user"))
                }
                finalBody = Object.assign(body, obj)
                console.log(1)
                break
            case "IT Operator":
                console.log(2)
                break
            case "Administrator":
                console.log(3)
                break
            default:
                console.log(4)
                obj = {
                    id_user: parseInt(localStorage.getItem("id_user"))
                }
                finalBody = Object.assign(body, obj)
        }

        await ticketApi.filterTicket(finalBody, page).then((res) => {
            let i = (page * 10) - 9
            res?.data?.data?.data?.map((r) => {
                let colorBadge = null
                switch (r.status) {
                    case "Waiting Confirmation":
                        colorBadge = "secondary"
                        break
                    case "Confirmed":
                        colorBadge = "primary"
                        break
                    case "Progress":
                        colorBadge = "warning"
                        break
                    case "Done":
                        colorBadge = "Success"
                        break
                    case "Rejected":
                        colorBadge = "error"
                        break
                    default:
                        colorBadge = "light"
                }
                let obj = {
                    no: i++,
                    id_ticket: r.id_ticket,
                    tanggal_dibuat: r.tanggal_dibuat,
                    tanggal_solved: r.tanggal_solved === null || "" ? "NULL" : r.tanggal_solved,
                    nama_user: r.nama_user,
                    kategori: r.nama_kategori,
                    assigned: r.nama_assigned === null || "" ? "NULL" : r.nama_assigned,
                    status: (
                        <SuiBadge variant="gradient" badgeContent={r.status} color={colorBadge} size="xs" container />
                    ),
                    action: (
                        <button className="btn btn-primary btn-sm" onClick={() => handleDetailTicket(r.id_ticket)}><i className="fa fa-eye"></i></button>
                    )
                }
                dataRow.push(obj)
                setCurrentPage(res.data.data.current_page)
                setLastPage(res.data.data.last_page)
            })
        })
        setRows(dataRow)
        setLoading(false)
        setFilter(true)
        handleClose()
    }

    const prevPaginate = (number) => filter ? filterTicket(bodyFilter, number) : fetchDataApi(number)
    const nextPaginate = (number) => filter ? filterTicket(bodyFilter, number) : fetchDataApi(number)
    const clickOnNumber = (number) => filter ? filterTicket(bodyFilter, number) : fetchDataApi(number)

    function handleFilter(body) {
        filterTicket(body)
        setBodyFilter(body)
    }

    function handleInputTicket() {
        navigate("/ticket/input-ticket", { replace: true })
    }

    function handleDetailTicket(idTicket) {
        navigate(`/ticket/${idTicket}`, { replace: true })
    }

    return (
        <div>
            <Card>
                <SuiBox p={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6}>
                            <SuiBox display="flex" flexDirection="column" height="100%">
                                <SuiTypography variant="h4" fontWeight="bold" gutterBottom>
                                    Data Ticket
                                </SuiTypography>
                                <SuiBox >
                                    <SuiTypography variant="body2" color="text">
                                        <button className="btn btn-warning btn-sm" title="Filter Ticket" onClick={handleOpen}><i className="fa fa-filter" ></i></button>&nbsp;<button title="Input Ticket" className="btn btn-success btn-sm" onClick={handleInputTicket}><i className="fa fa-pencil-square-o" ></i></button>
                                    </SuiTypography>
                                </SuiBox>
                            </SuiBox>
                        </Grid>
                    </Grid>
                </SuiBox>
                <TableAndPagination
                    columns={columns}
                    rows={rows}
                    currentPage={currentPage}
                    lastPage={lastPage}
                    handlePrevPaginate={prevPaginate}
                    handleNextPaginate={nextPaginate}
                    handleClickOnNumber={clickOnNumber}
                    loading={loading}
                />
            </Card>
            <ModalFilter open={open} handleClose={handleClose} handleFilter={handleFilter} />
        </div>
    );
}

function ModalFilter({ open, handleClose, handleFilter }) {
    const [tanggalDibuatAwal, setTanggalDibuatAwal] = useState("")
    const [tanggalDibuatAkhir, setTanggalDibuatAkhir] = useState("")
    const [tanggalSolvedAwal, setTanggalSolvedAwal] = useState("")
    const [tanggalSolvedAkhir, setTanggalSolvedAkhir] = useState("")
    const [kategori, setKategori] = useState("")
    const [status, setStatus] = useState("")
    const [getCategory, setGetCategory] = useState([])

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
        getAllCategory()
    }, [])

    async function getAllCategory() {
        let arrCategory = []
        const categoryApi = new CategoryApi()
        await categoryApi.getAllCategory().then(r => {
            r.data.data.data.map(res => {
                let obj = {
                    nama_kategori: res.nama_kategori,
                    id_kategori: res.id_kategori
                }
                arrCategory.push(obj)
                setGetCategory(arrCategory)
            })
        })
    }

    function setHandleFilter() {
        let body = {
            tanggal_dibuat_awal: tanggalDibuatAwal,
            tanggal_dibuat_akhir: tanggalDibuatAkhir,
            tanggal_solved_awal: tanggalSolvedAwal,
            tanggal_solved_akhir: tanggalSolvedAkhir,
            kategori: kategori,
            status: status
        }
        handleFilter(body)
    }

    const handleKategori = (e) => setKategori(e.target.value)
    const handleTanggalDibuatAwal = (e) => setTanggalDibuatAwal(e.target.value)
    const handleTanggalDibuatAkhir = (e) => setTanggalDibuatAkhir(e.target.value)
    const handleTanggalSolvedAwal = (e) => setTanggalSolvedAwal(e.target.value)
    const handleTanggalSolvedAkhir = (e) => setTanggalSolvedAkhir(e.target.value)
    const handleStatus = (e) => setStatus(e.target.value)

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h1">
                    Sort Data Ticket
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <label>Status : </label><br />
                    <select className="form-select" onChange={handleStatus} >
                        <option value="" selected>-- Pilih Status --</option>
                        <option value="Waiting Confirmation" selected={status === "Waiting Confirmation" ? true : false}>Waiting Confimation</option>
                        <option value="Confirmed" selected={status === "Confirmed" ? true : false}>Confirmed</option>
                        <option value="Progress" selected={status === "Progress" ? true : false}>Progress</option>
                        <option value="Done" selected={status === "Done" ? true : false}>Done</option>
                    </select>
                    <label>Kategori : </label><br />
                    <select className="form-select" onChange={handleKategori} >
                        <option value="" selected>-- Pilih Kategori --</option>
                        {getCategory.map((res, idx) => {
                            return <option key={idx} value={res.id_kategori} selected={kategori === res.id_kategori ? true : false}>{res.nama_kategori}</option>
                        })}
                    </select>
                    <label>Tanggal Dibuat : </label><br />
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <h6>Start :</h6> <input type="date" value={tanggalDibuatAwal} className="form-control" name="tanggal_dibuat_awal" onChange={handleTanggalDibuatAwal} />
                            </Grid>
                            <Grid item xs={6}>
                                <h6>End :</h6> <input type="date" value={tanggalDibuatAkhir} className="form-control" name="tanggal_dibuat_akhir" onChange={handleTanggalDibuatAkhir} />
                            </Grid>
                        </Grid>
                    </Box>
                    <label>Tanggal Solved : </label><br />
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <h6>Start :</h6> <input type="date" value={tanggalSolvedAwal} className="form-control" name="tanggal_solved_awal" onChange={handleTanggalSolvedAwal} />
                            </Grid>
                            <Grid item xs={6}>
                                <h6>End :</h6> <input type="date" value={tanggalSolvedAkhir} className="form-control" name="tanggal_solved_akhir" onChange={handleTanggalSolvedAkhir} />
                            </Grid>
                        </Grid>
                    </Box>
                    <br />
                    <button className="btn btn-primary btn-sm" onClick={setHandleFilter}>Filter</button>  <button className="btn btn-danger btn-sm" onClick={handleClose}>Close</button>
                </Typography>
            </Box>
        </Modal >
    )
}