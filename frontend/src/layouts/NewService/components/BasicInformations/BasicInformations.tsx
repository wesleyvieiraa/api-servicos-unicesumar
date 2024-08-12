import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import FormField from "layouts/applications/wizard/components/FormField";

export const BasicInformations = (): JSX.Element => {
  return (
    <MDBox>
      <MDBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Nome do Serviço" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Categoria" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Nome do Prestador" />
          </Grid>
          <Grid item xs={12}>
            <FormField
              type="textarea"
              label="Descrição"
              placeholder="Digite..."
              multiline
              rows={5}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
};
