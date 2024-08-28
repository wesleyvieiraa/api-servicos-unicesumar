import { Grid, Icon, Tooltip } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import BookingCard from "examples/Cards/BookingCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Service } from "models/Service.model";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import servicesService from "services/services-service";

const imgBaseUrl = process.env.REACT_APP_IMG_BASE_URL;
const imgDefaultBaseUrl = process.env.REACT_APP_IMG_BASE_URL_DEFAULT_PRODUCT_IMG;

export const SearchService = (): JSX.Element => {
  const [serviceList, setProductList] = useState<Service[]>([]);
  const navigate = useNavigate();
  const nav = (serviceId: number) => {
    navigate(`/servico/${serviceId}`);
  };

  useEffect(() => {
    const listServices = async () => {
      try {
        const { services, totalRows } = await servicesService.list(null, null, null, 1, false);
        setProductList(services);
      } catch (error) {
        console.error(error);
      }
    };
    listServices();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar titleToBradcrumb="Serviços" title="Procurar Serviço" />
      <MDBox py={3}>
        <MDBox mt={2}>
          <Grid container spacing={3}>
            {serviceList.length > 0 &&
              serviceList.map((service) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  key={`${service.serviceId}-${service.name}`}
                  onClick={() => nav(service.serviceId)}
                  sx={{ cursor: "pointer" }}
                >
                  <MDBox mt={3}>
                    <BookingCard
                      image={
                        service.images && service.images.length > 0
                          ? service.images[0].externalId
                          : imgDefaultBaseUrl
                      }
                      title={service.name}
                      description={service.description}
                      price={`R$ ${Number(service.price).toFixed(2).replace(".", ",")}`}
                    />
                  </MDBox>
                </Grid>
              ))}
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
};
