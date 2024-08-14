import { Autocomplete, Grid } from "@mui/material";
import typography from "assets/theme/base/typography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { stepTwoSchema } from "layouts/NewService/validations/serviceForm";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MDInput from "components/MDInput";

type StepTwoSchema = z.infer<typeof stepTwoSchema>;

export const Details = ({
  handleNextStep,
  handleBackStep,
}: {
  handleNextStep: (data: any) => void;
  handleBackStep: (data: any) => void;
}): JSX.Element => {
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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StepTwoSchema>({
    resolver: zodResolver(stepTwoSchema),
  });

  return (
    <MDBox p={2}>
      <MDBox>
        <MDBox>
          <MDBox mt={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <MDInput
                  placeholder="99.00"
                  variant="standard"
                  label={"Preço"}
                  fullWidth
                  required
                  {...register("price")}
                  error={errors.price}
                />
              </Grid>
              <Grid item xs={12} sm={1} display={"flex"} alignItems={"center"}>
                <MDTypography fontSize={size.sm}>por</MDTypography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="unitId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      disableClearable
                      options={optionsUnit}
                      size="small"
                      renderInput={(params) => (
                        <MDInput
                          {...params}
                          placeholder="Selecione"
                          variant="standard"
                          label={"Unidade"}
                          fullWidth
                          required
                          error={errors.unitId}
                        />
                      )}
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      onChange={(event, newValue) => onChange(newValue.id)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <MDInput
                  variant="standard"
                  label={"Disponibilidade"}
                  fullWidth
                  {...register("disponibility")}
                  error={errors.disponibility}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="paymentMethodId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      disableClearable
                      multiple
                      options={optionsPayment}
                      size="small"
                      renderInput={(params) => (
                        <MDInput
                          {...params}
                          placeholder="Selecione"
                          variant="standard"
                          label={"Formas de Pagamento"}
                          fullWidth
                          required
                          error={errors.paymentMethodId}
                        />
                      )}
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      onChange={(event, newValue) => onChange(newValue.map((val) => val.id))}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox mt={3} width="100%" display="flex" justifyContent="space-between">
        <MDButton variant="outlined" color="dark" onClick={handleBackStep}>
          voltar
        </MDButton>
        <MDButton variant="gradient" color="dark" onClick={handleSubmit(handleNextStep)}>
          próximo
        </MDButton>
      </MDBox>
    </MDBox>
  );
};
