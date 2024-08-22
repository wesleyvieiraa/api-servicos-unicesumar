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

export const MyServices = (): JSX.Element => {
  const [serviceList, setProductList] = useState<Service[]>([]);
  const navigate = useNavigate();
  const nav = (serviceId: number) => {
    navigate(`/editar-servico/${serviceId}`);
  };

  useEffect(() => {
    const listServices = async () => {
      try {
        const { services, totalRows } = await servicesService.list();
        setProductList(services);
      } catch (error) {
        console.error(error);
      }
    };
    listServices();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar titleToBradcrumb="Serviço" title="Serviços" />
      <MDBox py={3}>
        <MDBox mt={2}>
          <Grid container spacing={3}>
            {serviceList.length > 0 &&
              serviceList.map((service) => (
                <Grid item xs={12} md={6} lg={4} key={`${service.serviceId}-${service.name}`}>
                  <MDBox mt={3}>
                    <BookingCard
                      image={
                        service.images && service.images.length > 0
                          ? `${imgBaseUrl}/${service.images[0].externalId}/${service.images[0].name}`
                          : imgDefaultBaseUrl
                      }
                      title={service.name}
                      description={service.description}
                      price={`R$ ${Number(service.price).toFixed(2).replace(".", ",")}`}
                      action={
                        <Tooltip
                          title="Edit"
                          placement="bottom"
                          onClick={() => nav(service.serviceId)}
                        >
                          <MDTypography
                            variant="body1"
                            color="info"
                            lineHeight={1}
                            sx={{ cursor: "pointer", mx: 3 }}
                          >
                            <Icon color="inherit">edit</Icon>
                          </MDTypography>
                        </Tooltip>
                      }
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
