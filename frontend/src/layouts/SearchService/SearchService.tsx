import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDPagination from "components/MDPagination";
import BookingCard from "examples/Cards/BookingCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Service } from "models/Service.model";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import servicesService from "services/services-service";
import Icon from "@mui/material/Icon";

const imgBaseUrl = process.env.REACT_APP_IMG_BASE_URL;
const imgDefaultBaseUrl = process.env.REACT_APP_IMG_BASE_URL_DEFAULT_PRODUCT_IMG;

export const SearchService = (): JSX.Element => {
  const [serviceList, setProductList] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const nav = (serviceId: number) => {
    navigate(`/servico/${serviceId}`);
  };

  useEffect(() => {
    const listServices = async () => {
      try {
        const { services, totalRows } = await servicesService.list(
          null,
          null,
          null,
          currentPage,
          false
        );
        setProductList(services);
        setTotalPages(Math.ceil(totalRows / 9)); // 9 items por pagina
      } catch (error) {
        console.error(error);
      }
    };
    listServices();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPaginationItems = () => {
    let items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <MDPagination item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
          {i}
        </MDPagination>
      );
    }
    return items;
  };

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
                          ? `${imgBaseUrl}/${service.images[0].externalId}/${service.images[0].name}`
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
        <MDBox mt={4} display="flex" justifyContent="center">
          <MDPagination size="small">
            <MDPagination
              item
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Icon>keyboard_arrow_left</Icon>
            </MDPagination>
            {renderPaginationItems()}
            <MDPagination
              item
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Icon>keyboard_arrow_right</Icon>
            </MDPagination>
          </MDPagination>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
};
