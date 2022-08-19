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
import UserApi from "../../../API/UserApi";
import DivisiApi from "API/DivisiApi";

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function TableListUser() {
    const columns = [
        { name: "id", align: "center" },
        { name: "email", align: "center" },
        { name: "nama", align: "center" },
        { name: "divisi", align: "center" },
        { name: "action", align: "center" }
    ]

    let navigate = useNavigate()

    const [rows, setRows] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [lastPage, setLastPage] = useState(0)
    const [loading, setLoading] = useState(true)

    const [openModalUser, setOpenModalUser] = useState(false);
    const [openModalRemoveUser, setOpenModalRemoveUser] = useState(false);
    const [bodyFilterUser, setBodyFilterUser] = useState(null);
    const [filterUser, setFilterUser] = useState(false);
    const [idUserRemove, setIdUserRemove] = useState(0);
    const [namaUserRemove, setNamaUserRemove] = useState("");
    const [openAlertRemove, setOpenAlertRemove] = useState(false)
    const [messageAlert, setMessageAlert] = useState("")

    const handleModalUserOpen = () => setOpenModalUser(true);
    const handleModalUserClose = () => setOpenModalUser(false);
    const handleCloseModalRemoveUser = () => setOpenModalRemoveUser(false);


    const userApi = new UserApi()

    useEffect(() => {
        fetchDataApi()
    }, [])

    async function fetchDataApi(page = 1) {
        setLoading(true)
        let dataRow = []
        await userApi.readAllUser(page).then((res) => {
            res?.data?.data?.data?.map((r) => {
                let obj = {
                    id: r.id,
                    email: r.email,
                    nama: r.nama,
                    divisi: r.nama_divisi,
                    action: (
                        <>
                            <button className="btn btn-primary btn-sm" onClick={() => handleDetailUser(r.id)}><i className="fa fa-eye"></i></button>&nbsp;
                            <button className="btn btn-danger btn-sm" onClick={() => handleRemoveUser(r.id, r.nama)}><i className="fa fa-trash"></i></button>
                        </>
                    )
                }
                dataRow.push(obj)
                setCurrentPage(res.data.data.current_page)
                setLastPage(res.data.data.last_page)
            })
        })
        setRows(dataRow)
        setLoading(false)
    }

    async function fetchFilterUser(body, page) {
        setLoading(true)
        let dataRow = []
        await userApi.filterUser(body, page).then((res) => {
            console.log({ filterUser: res })
            res?.data?.data?.data?.map((r) => {
                let obj = {
                    id: r.id,
                    email: r.email,
                    nama: r.nama,
                    divisi: r.divisi,
                    action: (
                        <>
                            <button className="btn btn-primary btn-sm" onClick={() => handleDetailUser(r.id)}><i className="fa fa-eye"></i></button>&nbsp;
                            <button className="btn btn-danger btn-sm" onClick={() => handleRemoveUser(r.id, r.nama)}><i className="fa fa-trash"></i></button>
                        </>
                    )
                }
                dataRow.push(obj)
                setCurrentPage(res.data.data.current_page)
                setLastPage(res.data.data.last_page)
            })
        })
        setRows(dataRow)
        setLoading(false)
        setFilterUser(true)
        handleModalUserClose()
    }

    const prevPaginate = (number) => filterUser ? fetchFilterUser(bodyFilterUser, number) : fetchDataApi(number)
    const nextPaginate = (number) => filterUser ? fetchFilterUser(bodyFilterUser, number) : fetchDataApi(number)
    const clickOnNumber = (number) => filterUser ? fetchFilterUser(bodyFilterUser, number) : fetchDataApi(number)

    function handleDetailUser(id) {
        navigate(`/user-list/${id}`, { replace: true })
    }

    function handleRemoveUser(id, nama) {
        setIdUserRemove(id)
        setNamaUserRemove(nama)
        setOpenModalRemoveUser(true)
    }

    async function handleButtonModalRemoveUser(idUser) {
        await userApi.removeUser(idUser).then(res => {
            setOpenAlertRemove(true)
            setMessageAlert(`Data ${idUser} Berhasil Dihapus`)
            fetchDataApi(1)
        }).catch((error) => {
            setOpenAlertRemove(true)
            setMessageAlert(`Data ${idUser} Gagal Dihapus`)
            fetchDataApi(1)
        })
        handleCloseModalRemoveUser()
    }

    function handleInputUser() {
        navigate("/user-list/input-user", { replace: true })
    }

    function handleFilterUser(body) {
        setBodyFilterUser(body)
        fetchFilterUser(body)
    }

    return (
        <div>
            {openAlertRemove ? <Alert onClose={() => { setOpenAlertRemove(false) }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                {messageAlert}
            </Alert> : ""}
            <Card>
                <SuiBox p={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={12}>
                            <SuiBox display="flex" flexDirection="column" height="100%">
                                <SuiTypography variant="h4" fontWeight="bold" gutterBottom>
                                    Data User
                                </SuiTypography>
                                <SuiBox >
                                    <SuiTypography variant="body2" color="text">
                                        <button className="btn btn-warning btn-sm" title="Filter User" onClick={handleModalUserOpen}><i className="fa fa-filter" ></i></button>&nbsp;<button title="Input User" className="btn btn-success btn-sm" onClick={handleInputUser}><i className="fa fa-pencil-square-o" ></i></button>
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
            <ModalFilterUser
                open={openModalUser}
                handleClose={handleModalUserClose}
                handleFilter={handleFilterUser}
            />
            <ModalRemoveUser
                openModalRemoveUser={openModalRemoveUser}
                handleCloseModalRemoveUser={handleCloseModalRemoveUser}
                handleButtonModalRemoveUser={handleButtonModalRemoveUser}
                idUser={idUserRemove}
                namaUserRemove={namaUserRemove}
            />
        </div>
    );
}

function ModalFilterUser({ open, handleClose, handleFilter }) {
    const [valueDivisi, setValueDivisi] = useState("")
    const [getDivisi, setGetDivisi] = useState([])

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
        getAllDivisi()
        return () => {
            setValueDivisi("")
        }
    }, [])

    async function getAllDivisi() {
        let arrCategory = []
        const divisiApi = new DivisiApi()
        await divisiApi.readAllDivisiSelected().then(r => {
            r.data.data.map(res => {
                let obj = {
                    nama_divisi: res.nama_divisi,
                    id_divisi: res.id_divisi
                }
                arrCategory.push(obj)
                setGetDivisi(arrCategory)
            })
        })
    }

    function setHandleFilter() {
        let body = {
            divisi: valueDivisi,
        }
        setValueDivisi("")
        handleFilter(body)
    }

    const handleChangeDivisi = (e) => setValueDivisi(e.target.value)


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
                    <label>Divisi : </label><br />
                    <select className="form-select" defaultValue="" onChange={handleChangeDivisi} >
                        <option value="">-- Pilih Divisi --</option>
                        {getDivisi.map((res, idx) => {
                            return <option key={idx} value={res.id_divisi}>{res.nama_divisi}</option>
                        })}
                    </select>
                    <br />
                    <button className="btn btn-primary btn-sm" onClick={setHandleFilter}>Filter</button>  <button className="btn btn-danger btn-sm" onClick={handleClose}>Close</button>
                </Typography>
            </Box>
        </Modal >
    )
}

function ModalRemoveUser({ openModalRemoveUser, handleCloseModalRemoveUser, handleButtonModalRemoveUser, idUser, namaUserRemove }) {
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
        console.log(idUser)
    }, [])

    const setHandleSubmit = () => {
        handleButtonModalRemoveUser(idUser)
    }

    return (
        <Modal
            open={openModalRemoveUser}
            onClose={handleCloseModalRemoveUser}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h1">
                    Hapus Data User
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Apakah Anda yakin ingin menghapus {namaUserRemove} ? <br />
                    <button className="btn btn-primary btn-sm" onClick={setHandleSubmit}>Ya</button>  <button className="btn btn-danger btn-sm" onClick={handleCloseModalRemoveUser}>Tidak</button>
                </Typography>
            </Box>
        </Modal >
    )
}