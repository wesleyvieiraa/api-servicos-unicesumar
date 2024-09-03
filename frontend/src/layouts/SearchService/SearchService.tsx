import { Grid, Icon, Tooltip } from "@mui/material";
import MDBox from "components/MDBox";
import MDPagination from "components/MDPagination";
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
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9; // Número de itens por página
  const navigate = useNavigate();

  const nav = (serviceId: number) => {
    navigate(`/servico/${serviceId}`);
  };

  useEffect(() => {
    const listServices = async () => {
      try {
        console.log("Fetching page:", currentPage);
        const { services, totalRows } = await servicesService.list(
          null,
          null,
          null,
          currentPage,
          false
        );
        console.log("Fetched Services:", services, "Total Rows:", totalRows);

        setServiceList(services || []);
        setTotalPages(Math.ceil(totalRows / itemsPerPage)); // Calcular número total de páginas
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    listServices();
  }, [currentPage]);

  // Filtrar itens para exibir apenas os itens da página atual
  const displayedServices = serviceList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <MDPagination
          item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(null, i)}
        >
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
            {displayedServices.length > 0 &&
              displayedServices.map((service) => (
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
          <MDPagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="small"
          >
            {renderPaginationItems()}
            <MDPagination
              item
              onClick={() => handlePageChange(null, currentPage + 1)}
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
