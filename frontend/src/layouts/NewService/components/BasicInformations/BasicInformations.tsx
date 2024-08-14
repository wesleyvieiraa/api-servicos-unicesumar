import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import { stepOneSchema } from "layouts/NewService/validations/serviceForm";
import MDInput from "components/MDInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MDButton from "components/MDButton";

type StepOneSchema = z.infer<typeof stepOneSchema>;

export const BasicInformations = ({
  handleNextStep,
}: {
  handleNextStep: (data: any) => void;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneSchema>({
    resolver: zodResolver(stepOneSchema),
  });

  return (
    <MDBox p={2}>
      <MDBox>
        <MDBox>
          <MDBox mt={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <MDInput
                  variant="standard"
                  label={"Nome do Serviço"}
                  fullWidth
                  required
                  {...register("serviceName")}
                  error={errors.serviceName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDInput
                  variant="standard"
                  label={"Categoria"}
                  fullWidth
                  required
                  {...register("category")}
                  error={errors.category}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MDInput
                  variant="standard"
                  label={"Nome do Prestador"}
                  fullWidth
                  required
                  {...register("providerName")}
                  error={errors.providerName}
                />
              </Grid>
              <Grid item xs={12}>
                <MDInput
                  variant="standard"
                  type="textarea"
                  label={"Descrição"}
                  multiline
                  rows={5}
                  fullWidth
                  required
                  {...register("description")}
                  error={errors.description}
                />
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox mt={3} width="100%" display="flex" justifyContent="end">
        <MDButton variant="gradient" color="dark" onClick={handleSubmit(handleNextStep)}>
          próximo
        </MDButton>
      </MDBox>
    </MDBox>
  );
};
