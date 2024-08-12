import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export const Dashboard = (): JSX.Element => {
  const teste = () => {
    console.log("eu");
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={1.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} onClick={teste} sx={{ cursor: "pointer" }}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Meus serviços"
                count={281}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};
