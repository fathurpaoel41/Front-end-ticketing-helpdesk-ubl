import Table from "examples/Tables/Table";
import SuiPagination from "components/SuiPagination";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import { useEffect } from "react";


export default function TableAndPagination({
    columns,
    rows,
    currentPage,
    lastPage,
    handleNextPaginate,
    handlePrevPaginate,
    handleClickOnNumber,
    loading = true
}) {

    useEffect(() => {
    }, [rows])

    function dataPagination() {
        const dataPagination = []
        for (let i = 0; i < lastPage; i++) {
            dataPagination.push(i)
        }
        return dataPagination
    }

    function prevPaginate() {
        if (currentPage !== 1) {
            handlePrevPaginate(currentPage - 1)
        }
    }

    function nextPaginate() {
        if (currentPage !== lastPage) {
            handleNextPaginate(currentPage + 1)
        }
    }

    const clickOnNumber = (nomor) => {
        handleClickOnNumber(nomor)
    }

    return (
        <>
            <Card>
                <SuiBox
                    sx={{
                        "& .MuiTableRow-root:not(:last-child)": {
                            "& td": {
                                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                    `${borderWidth[1]} solid ${borderColor}`,
                            },
                        },
                    }}
                >
                    <Table columns={columns} rows={rows} />
                </SuiBox>
                <div style={{ float: 'left', marginTop: "5px", marginLeft: "5px", marginBottom: "5px" }}>
                    <SuiPagination item >
                        <span onClick={prevPaginate}><Icon>keyboard_arrow_left</Icon></span>
                    </SuiPagination>
                    {dataPagination().map((res, idx) => {
                        let nomor = res + 1
                        let actived = nomor === currentPage ? true : false
                        return (
                            <span key={idx} onClick={() => { clickOnNumber(nomor) }}>
                                <SuiPagination item active={actived}>{nomor}</SuiPagination>
                            </span>
                        )
                    })}
                    <SuiPagination item >
                        <span onClick={nextPaginate}><Icon >keyboard_arrow_right</Icon></span>
                    </SuiPagination>
                    <span style={{ float: 'right', marginTop: "5px", marginRight: "10px", marginBottom: "5px" }}>
                        <SuiBox display="flex" alignItems="center" lineHeight={0}>
                            <SuiTypography variant="button" fontWeight="regular" color="text">
                                {loading ? <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div> : "Done"}
                            </SuiTypography>
                        </SuiBox>
                    </span>
                </div>
            </Card>
        </>
    )
}