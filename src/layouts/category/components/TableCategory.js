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
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CategoryApi from "../../../API/CategoryApi"

export default function TableCategory() {
    const columns = [
        { name: "id_kategori", align: "center" },
        { name: "nama_kategori", align: "center" },
        { name: "action", align: "center" },

    ]

    let navigate = useNavigate()

    //table
    const [rows, setRows] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [lastPage, setLastPage] = useState(0)
    const [loading, setLoading] = useState(true)

    const [openModalUser, setOpenModalUser] = useState(false);
    const [openModalRemoveKategori, setOpenModalRemoveKategori] = useState(false);
    const [idKategoriRemove, setIdKategoriRemove] = useState(0);
    const [openAlertRemove, setOpenAlertRemove] = useState(false)
    const [messageAlert, setMessageAlert] = useState("")

    const handleCloseModalRemoveKategori = () => setOpenModalRemoveKategori(false);


    const categoryApi = new CategoryApi()

    useEffect(() => {
        fetchDataApi()
    }, [])

    async function fetchDataApi(page = 1) {
        setLoading(true)
        let dataRow = []
        await categoryApi.getAllCategory(page).then((res) => {
            res?.data?.data?.data?.map((r) => {
                let obj = {
                    id_kategori: r.id_kategori,
                    nama_kategori: r.nama_kategori,
                    action: (
                        <>
                            <button className="btn btn-primary btn-sm" onClick={() => handleDetailKategori(r.id_kategori)}><i className="fa fa-eye"></i></button>&nbsp;
                            <button className="btn btn-danger btn-sm" onClick={() => handleRemoveKategori(r.id_kategori)}><i className="fa fa-trash"></i></button>
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

    function handleDetailKategori(idKategori) {
        navigate(`/kategori/${idKategori}`, { replace: true })
    }

    function handleRemoveKategori(idKategori) {
        setIdKategoriRemove(idKategori)
        setOpenModalRemoveKategori(true)
    }

    async function handleButtonModalRemoveKategori(idKategori) {
        await categoryApi.deleteCategory(idKategori).then(res => {
            setOpenAlertRemove(true)
            setMessageAlert(`Data ${idKategori} Berhasil Dihapus`)
            fetchDataApi(1)
        }).catch((error) => {
            setOpenAlertRemove(true)
            setMessageAlert(`Data ${idKategori} Gagal Dihapus`)
            fetchDataApi()
        })
        handleCloseModalRemoveKategori()
    }

    function handleInputKategori() {
        navigate("/kategori/input-kategori", { replace: true })
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
                                    Data Category
                                </SuiTypography>
                                <SuiBox >
                                    <SuiTypography variant="body2" color="text">
                                        <button title="Input Kategori" className="btn btn-success btn-sm" onClick={handleInputKategori}><i className="fa fa-pencil-square-o" ></i></button>
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
            <ModalRemoveKategori
                openModalRemoveKategori={openModalRemoveKategori}
                handleCloseModalRemoveKategori={handleCloseModalRemoveKategori}
                handleButtonModalRemoveKategori={handleButtonModalRemoveKategori}
                idKategori={idKategoriRemove}
            />
        </div>
    );
}

function ModalRemoveKategori({ openModalRemoveKategori, handleCloseModalRemoveKategori, handleButtonModalRemoveKategori, idKategori }) {
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
        handleButtonModalRemoveKategori(idKategori)
    }

    return (
        <Modal
            open={openModalRemoveKategori}
            onClose={handleCloseModalRemoveKategori}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h1">
                    Hapus Data Kategori
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Apakah Anda yakin ingin menghapus {idKategori} ? <br />
                    <button className="btn btn-primary btn-sm" onClick={setHandleSubmit}>Ya</button>  <button className="btn btn-danger btn-sm" onClick={handleCloseModalRemoveKategori}>Tidak</button>
                </Typography>
            </Box>
        </Modal >
    )
}