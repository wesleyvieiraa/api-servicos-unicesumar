import MDBox from "components/MDBox";
import MDDropzone from "components/MDDropzone";
import MDTypography from "components/MDTypography";
import { useMemo } from "react";
import { z } from "zod";
import { stepThreeSchema } from "layouts/NewService/validations/serviceForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MDButton from "components/MDButton";

type StepThreeSchema = z.infer<typeof stepThreeSchema>;

export const Media = ({
  handleNextStep,
  handleBackStep,
}: {
  handleNextStep: (data: any) => void;
  handleBackStep: (data: any) => void;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepThreeSchema>({
    resolver: zodResolver(stepThreeSchema),
  });

  const options = {
    url: "/file-upload",
    method: "post",
    maxFiles: 5,
    acceptedFiles: ".jpg, .jpeg, .png",
    dictDefaultMessage: "Arraste e solte os arquivos aqui ou clique para selecionar",
  };

  return (
    <MDBox p={2}>
      <MDBox>
        <MDBox>
          <MDBox mt={3}>
            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <MDTypography component="label" variant="button" fontWeight="regular" color="text">
                Imagens do Serviço
              </MDTypography>
            </MDBox>
            {useMemo(
              () => (
                <MDDropzone options={options} />
              ),
              []
            )}
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
