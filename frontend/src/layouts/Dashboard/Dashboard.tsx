import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { DashboardModel } from "models/dashboard.model";
import { DashboardI } from "models/imp/dashboardI.model";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dashboardService from "services/dashboard.service";

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const nav = (url: string) => {
    navigate(url);
  };

  const [totalValues, setTotalValues] = useState<DashboardModel>(new DashboardI());

  useEffect(() => {
    const getTotalValues = async () => {
      try {
        const { values } = await dashboardService.getTotalValues();
        setTotalValues(values);
      } catch (error) {
        console.error(error);
      }
    };
    getTotalValues();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar title="Dashboard" />
      <MDBox mt={1.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} onClick={() => nav("/procurar-servico")} sx={{ cursor: "pointer" }}>
              <ComplexStatisticsCard color="info" icon="search" title="Procurar Serviços" />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} onClick={() => nav("/novo-servico")} sx={{ cursor: "pointer" }}>
              <ComplexStatisticsCard color="success" icon="" title="Novo Serviço" />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5} onClick={() => nav("/servicos")} sx={{ cursor: "pointer" }}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Meus serviços"
                count={totalValues.totalMyServices}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};
