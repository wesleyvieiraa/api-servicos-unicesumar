import { Autocomplete, Grid } from "@mui/material";
import typography from "assets/theme/base/typography";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FormField from "layouts/applications/wizard/components/FormField";

export const Details = () => {
  const { size } = typography;
  const optionsUnit = [
    { label: "Minuto", id: 1 },
    { label: "Hora", id: 2 },
    { label: "Dia", id: 3 },
    { label: "Mês", id: 4 },
    { label: "Ano", id: 5 },
  ];
  const optionsPayment = [
    { label: "Dinheiro", id: 1 },
    { label: "Débito", id: 2 },
    { label: "Crédito", id: 3 },
    { label: "Pix", id: 4 },
  ];
  return (
    <MDBox>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <FormField type="text" label="Preço" placeholder="99.00" />
          </Grid>
          <Grid item xs={12} sm={1} display={"flex"} alignItems={"center"}>
            <MDTypography fontSize={size.md}>por</MDTypography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Autocomplete
              disableClearable
              options={optionsUnit}
              size="small"
              renderInput={(params) => (
                <FormField {...params} label="Unidade" placeholder="Selecione" />
              )}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              // onChange={(event, newValue) => onChange(newValue.id)}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormField type="text" label="Disponibilidade" />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              disableClearable
              options={optionsPayment}
              size="small"
              renderInput={(params) => <FormField {...params} label="Formas de Pagamento" />}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              // onChange={(event, newValue) => onChange(newValue.id)}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
};
