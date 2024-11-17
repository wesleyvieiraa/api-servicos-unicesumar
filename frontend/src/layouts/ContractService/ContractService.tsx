import { Card, Grid, Step, StepLabel, Stepper } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useState } from "react";
import contractServiceForm from "./schemas/contractServiceForm";
import validations from "./schemas/contractServiceValidations";
import initialValuesContractServiceForm from "./schemas/initialValues";
import BasicInformations from "./components/StepOne/BasicInformations";
import Details from "./components/StepTwo/Details";
import { ContractServiceModel } from "models/ContractService.model";
import servicesService from "services/services-service";
import { useParams } from "react-router-dom";

function getSteps(): string[] {
  return ["Agendamento"];
}

function getStepContent(stepIndex: number, formData: any, setFieldValue: any): JSX.Element {
  switch (stepIndex) {
    case 0:
      return <BasicInformations formData={formData} />;
    case 1:
      return <Details />;
    default:
      return null;
  }
}

export const ContractService = (): JSX.Element => {
  const { serviceId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = contractServiceForm;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const handleBack = (data: any) => setActiveStep(activeStep - 1);

  const submitForm = async (
    values: ContractServiceModel,
    actions: FormikHelpers<ContractServiceModel>
  ) => {
    try {
      values.serviceId = Number(serviceId);
      const { service } = await servicesService.contractService(values);

      actions.setSubmitting(false);
      actions.resetForm();
    } catch (error) {
      actions.setSubmitting(false);
      console.error(error);
    }
  };

  const handleSubmit = (
    values: ContractServiceModel,
    actions: FormikHelpers<ContractServiceModel>
  ) => {
    submitForm(values, actions);
    setActiveStep(activeStep + 1);
    // if (isLastStep) {
    // } else {
    //   setActiveStep(activeStep + 1);
    //   actions.setTouched({});
    //   actions.setSubmitting(false);
    // }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar titleToBradcrumb="Serviços" title="Contratar Serviço" />
      <MDBox mb={9}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
          <Grid item xs={12} lg={8}>
            <Formik
              initialValues={initialValuesContractServiceForm}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                isSubmitting,
                setFieldValue,
              }: FormikProps<ContractServiceModel>) => (
                <Form id={formId} autoComplete="off">
                  <MDBox mt={6} mb={8} textAlign="center">
                    <MDBox mb={1}>
                      <MDTypography variant="h3" fontWeight="bold">
                        Contratar Serviço
                      </MDTypography>
                    </MDBox>
                    <MDTypography variant="h5" fontWeight="regular" color="secondary">
                      Agende uma data para o serviço.
                    </MDTypography>
                  </MDBox>
                  <Card sx={{ height: "100%" }}>
                    <MDBox mx={2} mt={-3}>
                      <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </MDBox>
                    <MDBox p={3}>
                      <MDBox>
                        {getStepContent(
                          activeStep,
                          { values, touched, formField, errors },
                          setFieldValue
                        )}
                        <MDBox mt={2} width="100%" display="flex" justifyContent="space-between">
                          {activeStep === 0 && (
                            <MDButton
                              disabled={isSubmitting}
                              type="submit"
                              variant="gradient"
                              color="dark"
                            >
                              {isLastStep ? "enviar" : "próximo"}
                            </MDButton>
                          )}
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};
