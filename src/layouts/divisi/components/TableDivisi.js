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
import DivisiApi from "../../../API/DivisiApi";


import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function TableDivisi() {
    const columns = [
        { name: "id_divisi", align: "center" },
        { name: "nama_divisi", align: "center" },
        { name: "action", align: "center" },

    ]

    let navigate = useNavigate()

    //table
    const [rows, setRows] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [lastPage, setLastPage] = useState(0)
    const [loading, setLoading] = useState(true)

    const [openModalUser, setOpenModalUser] = useState(false);
    const [openModalRemoveDivisi, setOpenModalRemoveDivisi] = useState(false);
    const [idDivisiRemove, setIdDivisiRemove] = useState(0);
    const [openAlertRemove, setOpenAlertRemove] = useState(false)
    const [messageAlert, setMessageAlert] = useState("")

    const handleCloseModalRemoveDivisi = () => setOpenModalRemoveDivisi(false);


    const divisiApi = new DivisiApi()

    useEffect(() => {
        fetchDataApi()
    }, [])

    async function fetchDataApi(page = 1) {
        setLoading(true)
        let dataRow = []
        await divisiApi.readAllDivisi(page).then((res) => {
            console.log({ divisi: res })
            res?.data?.data?.data?.map((r) => {
                console.log({ r })
                let obj = {
                    id_divisi: r.id_divisi,
                    nama_divisi: r.nama_divisi,
                    action: (
                        <>
                            <button className="btn btn-primary btn-sm" onClick={() => handleDetailDivisi(r.id_divisi)}><i className="fa fa-eye"></i></button>&nbsp;
                            <button className="btn btn-danger btn-sm" onClick={() => handleRemoveDivisi(r.id_divisi)}><i className="fa fa-trash"></i></button>
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

    const prevPaginate = (number) => fetchDataApi(number)
    const nextPaginate = (number) => fetchDataApi(number)
    const clickOnNumber = (number) => fetchDataApi(number)

    function handleDetailDivisi(idDivisi) {
        navigate(`/divisi/${idDivisi}`, { replace: true })
    }

    function handleRemoveDivisi(idDivisi) {
        setIdDivisiRemove(idDivisi)
        setOpenModalRemoveDivisi(true)
    }

    async function handleButtonModalRemoveDivisi(idDivisi) {
        await divisiApi.deleteDivisi(idDivisi).then(res => {
            setOpenAlertRemove(true)
            setMessageAlert(`Data ${idDivisi} Berhasil Dihapus`)
            fetchDataApi(1)
        }).catch((error) => {
            setOpenAlertRemove(true)
            setMessageAlert(`Data ${idDivisi} Gagal Dihapus`)
            fetchDataApi()
        })
        handleCloseModalRemoveDivisi()
    }

    function handleInputDivisi() {
        navigate("/divisi/input-divisi", { replace: true })
    }

    return (
        <div><br />
            {openAlertRemove ? <Alert onClose={() => { setOpenAlertRemove(false) }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                {messageAlert}
            </Alert> : ""}
            <Card>
                <SuiBox p={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6}>
                            <SuiBox display="flex" flexDirection="column" height="100%">
                                <SuiTypography variant="h4" fontWeight="bold" gutterBottom>
                                    Data Divisi
                                </SuiTypography>
                                <SuiBox >
                                    <SuiTypography variant="body2" color="text">
                                        <button title="Input Divisi" className="btn btn-success btn-sm" onClick={handleInputDivisi}><i className="fa fa-pencil-square-o" ></i></button>
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
            <ModalRemoveDivisi
                openModalRemoveDivisi={openModalRemoveDivisi}
                handleCloseModalRemoveDivisi={handleCloseModalRemoveDivisi}
                handleButtonModalRemoveDivisi={handleButtonModalRemoveDivisi}
                idDivisi={idDivisiRemove}
            />
        </div>
    );
}

function ModalRemoveDivisi({ openModalRemoveDivisi, handleCloseModalRemoveDivisi, handleButtonModalRemoveDivisi, idDivisi }) {
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
    }, [])

    const setHandleSubmit = () => {
        handleButtonModalRemoveDivisi(idDivisi)
    }

    return (
        <Modal
            open={openModalRemoveDivisi}
            onClose={handleCloseModalRemoveDivisi}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h1">
                    Hapus Data Divisi
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Apakah Anda yakin ingin menghapus {idDivisi} ? <br />
                    <button className="btn btn-primary btn-sm" onClick={setHandleSubmit}>Ya</button>  <button className="btn btn-danger btn-sm" onClick={handleCloseModalRemoveDivisi}>Tidak</button>
                </Typography>
            </Box>
        </Modal >
    )
}