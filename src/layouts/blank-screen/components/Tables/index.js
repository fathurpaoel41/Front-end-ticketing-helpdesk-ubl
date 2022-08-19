import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import Table from "examples/Tables/Table";
import axios from "axios"
import SuiPagination from "components/SuiPagination";
import Icon from "@mui/material/Icon";
import TableAndPagination from "MyComponent/TableAndPagination";

export default function Tables() {
    const columns = [
        { name: "id_ticket", align: "center" },
        { name: "tanggal_dibuat", align: "center" },
        { name: "id_user", align: "center" },
        { name: "kategori", align: "center" },
        { name: "assigned", align: "center" },
        { name: "status", align: "center" },
    ]

    const [rows, setRows] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [lastPage, setLastPage] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDataApi()
    }, [])

    const fetchDataApi = async (page = 1) => {
        setLoading(true)
        let dataRow = []
        console.log({ page })
        await axios.get(`http://localhost:8000/api/dashboard/get-all-ticket?page=${page}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            res.data.data.data.map((r) => {
                let obj = {
                    id_ticket: r.id_ticket,
                    tanggal_dibuat: r.tanggal_dibuat,
                    id_user: r.id_user,
                    kategori: r.kategori,
                    assigned: r.assigned,
                    status: r.status
                }
                dataRow.push(obj)
                setCurrentPage(res.data.data.current_page)
                setLastPage(res.data.data.last_page)
            })
        })
        setRows(dataRow)
        setLoading(false)
    }

    function prevPaginate(number) {
        fetchDataApi(number)
    }

    function nextPaginate(number) {
        fetchDataApi(number)
    }

    function clickOnNumber(number) {
        fetchDataApi(number)
    }

    return (
        <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SuiBox>
                    <SuiTypography variant="h6" gutterBottom>
                        Contoh Table
                    </SuiTypography>
                </SuiBox>
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
    );
}