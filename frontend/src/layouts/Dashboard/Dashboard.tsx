import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const nav = () => {
    navigate("/novo-servico");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar title="Dashboard" />
      <MDBox mt={1.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} onClick={nav} sx={{ cursor: "pointer" }}>
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
