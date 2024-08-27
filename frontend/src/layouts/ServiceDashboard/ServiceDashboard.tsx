import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import servicesService from "services/services-service";
import ServiceImages from "./components/ServiceImages";
import ServiceInfo from "./components/ServiceInfo";
import { ServiceFile } from "models/service-file.model";
import { Service } from "models/Service.model";

export const ServiceDashboard = (): JSX.Element => {
  const { serviceId } = useParams();
  const [service, setService] = useState({} as Service);
  const [otherServicesList, setOtherServicesList] = useState<Service[]>([{}] as Service[]);
  const [images, setImages] = useState({} as ServiceFile[]);

  useEffect(() => {
    const getServiceById = async () => {
      try {
        const { service } = await servicesService.getById(Number(serviceId));
        setService(service);
        setImages(service.images);
      } catch (error) {
        setService(null);
        setImages(null);
        console.error(error);
      }
    };

    const listOtherServices = async () => {
      try {
        const { services } = await servicesService.list(null, null, null, 1, false);
        setOtherServicesList(services);
      } catch (error) {
        setOtherServicesList(null);
        console.error(error);
      }
    };

    getServiceById();
    listOtherServices();
  }, []);

  if (!service) {
    return (
      <DashboardLayout>
        <DashboardNavbar titleToBradcrumb="Serviços" title="Meus Serviços" />
        <MDBox py={3}>
          <MDTypography>Carregando informações...</MDTypography>
        </MDBox>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar titleToBradcrumb="Serviços" title="Meus Serviços" />
      <MDBox py={3}>
        <Card sx={{ overflow: "visible" }}>
          <MDBox p={3}>
            <MDBox mb={3}>
              <MDTypography variant="h5" fontWeight="medium">
                Detalhes do serviço
              </MDTypography>
            </MDBox>

            <Grid container spacing={3}>
              <Grid item xs={12} lg={6} xl={5}>
                <ServiceImages images={images} />
              </Grid>
              <Grid item xs={12} lg={5} sx={{ mx: "auto" }}>
                <ServiceInfo service={service} />
              </Grid>
            </Grid>
            {otherServicesList && otherServicesList.length > 0 && (
              <MDBox mt={8} mb={2}>
                <MDBox mb={1} ml={2}>
                  <MDTypography variant="h5" fontWeight="medium">
                    Outros serviços do mesmo prestador
                  </MDTypography>
                </MDBox>
                {/* <DataTable
                  table={dataTableData}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  isSorted={false}
                /> */}
              </MDBox>
            )}
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};
