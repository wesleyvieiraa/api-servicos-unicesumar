import { Card, Grid, Step, StepLabel, Stepper } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import BasicInformations from "./components/BasicInformations";
import Location from "./components/Location";
import Details from "./components/Details";
import Media from "./components/Media";
import servicesService from "services/services-service";
import { Service } from "models/Service.model";
import serviceForm from "./schemas/serviceForm";
import validations from "./schemas/serviceValidations";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import initialValuesServiceForm from "./schemas/initialValues";
import MDButton from "components/MDButton";

function getSteps(): string[] {
  return ["Informações básicas", "Detalhes", "Localização", "Imagens"];
}
let form: Service;

function getStepContent(stepIndex: number, formData: any): JSX.Element {
  switch (stepIndex) {
    case 0:
      return <BasicInformations formData={formData} />;
    case 1:
      return <Details formData={formData} />;
    case 2:
      return <Location formData={formData} />;
    // case 3:
    //   return <Media />;
    default:
      return null;
  }
}

export const NewService = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = serviceForm;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = (data: any) => {
    form = { ...form, ...data };
    setActiveStep(activeStep + 1);
  };
  const handleBack = (data: any) => setActiveStep(activeStep - 1);

  const submitForm = async (values: Service, actions: FormikHelpers<Service>) => {
    try {
      console.log(values);
      actions.setSubmitting(false);
      actions.resetForm();
      setActiveStep(0);
    } catch (error) {
      actions.setSubmitting(false);
      console.error(error);
    }
  };

  const handleSubmit = (values: Service, actions: FormikHelpers<Service>) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar titleToBradcrumb="Serviço" title="Novo Serviço" />
      <MDBox mb={9}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
          <Grid item xs={12} lg={8}>
            <Formik
              initialValues={initialValuesServiceForm}
              validationSchema={currentValidation}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue }: FormikProps<Service>) => (
                <Form id={formId} autoComplete="off">
                  <MDBox mt={6} mb={8} textAlign="center">
                    <MDBox mb={1}>
                      <MDTypography variant="h3" fontWeight="bold">
                        Cadastrar Novo Produto
                      </MDTypography>
                    </MDBox>
                    <MDTypography variant="h5" fontWeight="regular" color="secondary">
                      Estas informações descreverão mais sobre o produto.
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
                        {getStepContent(activeStep, { values, touched, formField, errors })}
                        <MDBox mt={2} width="100%" display="flex" justifyContent="space-between">
                          {activeStep === 0 ? (
                            <MDBox />
                          ) : (
                            <MDButton variant="gradient" color="light" onClick={handleBack}>
                              back
                            </MDButton>
                          )}
                          <MDButton
                            disabled={isSubmitting}
                            type="submit"
                            variant="gradient"
                            color="dark"
                          >
                            {isLastStep ? "enviar" : "próximo"}
                          </MDButton>
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
