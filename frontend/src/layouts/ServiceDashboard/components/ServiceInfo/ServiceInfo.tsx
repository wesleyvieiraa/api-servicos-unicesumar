import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Service } from "models/Service.model";

interface Props {
  service: Service;
}

export const ServiceInfo = ({ service }: Props): JSX.Element => {
  const optionsUnit = [
    { label: "minuto", id: 1 },
    { label: "hora", id: 2 },
    { label: "dia", id: 3 },
    { label: "mês", id: 4 },
    { label: "ano", id: 5 },
  ];
  const foundedOption = optionsUnit.find((opt) => opt.id == service.unitId);
  const unitLabel = foundedOption ? foundedOption.label : "unidade desconhecida";

  return (
    <MDBox>
      <MDBox mb={1}>
        <MDTypography variant="h3" fontWeight="bold">
          {service.name}
        </MDTypography>
      </MDBox>
      <MDTypography variant="h4" color="text">
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star_half</Icon>
      </MDTypography>
      <MDBox mt={1}>
        <MDTypography variant="h6" fontWeight="medium">
          Valor
        </MDTypography>
      </MDBox>
      <MDBox mb={1}>
        <MDTypography variant="h5" fontWeight="medium">
          R$ {service.price}
          <MDTypography fontSize="small">por {unitLabel}</MDTypography>
        </MDTypography>
      </MDBox>
      <MDBox mt={3} mb={1} ml={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text">
          Descrição
        </MDTypography>
      </MDBox>
      <MDBox m={0} mb={2}>
        <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
          {service.description}
        </MDTypography>
      </MDBox>
      <MDBox mt={3} mb={1} ml={0.5}>
        <MDTypography variant="button" fontWeight="regular" color="text">
          Localização
        </MDTypography>
      </MDBox>
      <MDBox m={0} mb={2}>
        <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
          {service.location}
        </MDTypography>
      </MDBox>
      <MDBox mt={3}>
        <Grid item xs={12} lg={5} container>
          <MDButton variant="gradient" color="info" fullWidth>
            Saber mais
          </MDButton>
        </Grid>
      </MDBox>
    </MDBox>
  );
};
