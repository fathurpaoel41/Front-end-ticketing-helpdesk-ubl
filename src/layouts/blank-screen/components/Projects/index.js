import { useState } from "react";
import Card from "@mui/material/Card";
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

export default function Projects() {

  return (
    <Card>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SuiBox>
          <SuiTypography variant="h6" gutterBottom>
            Judul
          </SuiTypography>
          <SuiBox display="flex" alignItems="center" lineHeight={0}>
            <SuiTypography variant="button" fontWeight="regular" color="text">
              content
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </Card>
  );
}
