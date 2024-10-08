import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import servicesService from "services/services-service";
import ServiceImage from "./components/ServiceImage";
import Footer from "examples/Footer";
import ServiceInfo from "./components/ServiceInfo";

export const EditService = (): JSX.Element => {
  const { serviceId } = useParams();
  const [service, setService] = useState();

  useEffect(() => {
    const getServiceById = async () => {
      try {
        const { service } = await servicesService.getById(Number(serviceId));
        setService(service);
      } catch (error) {
        setService(null);
        console.error(error);
      }
    };

    getServiceById();
  }, []);

  const handleUpdate = () => {
    console.log("Atualizei");
  };
  return (
    <DashboardLayout>
      <DashboardNavbar titleToBradcrumb="Serviços" title="Editar Serviço" />
      {service && (
        <MDBox my={3}>
          <MDBox mb={6}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} lg={6}>
                <MDTypography variant="h4" fontWeight="medium">
                  Faça as alterações abaixo
                </MDTypography>
                <MDBox mt={1} mb={2}>
                  <MDTypography variant="body2" color="text">
                    Insira as informações atualizadas do serviço.
                  </MDTypography>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <ServiceImage service={service} />
            </Grid>
            <Grid item xs={12} lg={8}>
              <ServiceInfo service={service} onUpdate={handleUpdate} />
            </Grid>
          </Grid>
        </MDBox>
      )}
      <Footer />
    </DashboardLayout>
  );
};
