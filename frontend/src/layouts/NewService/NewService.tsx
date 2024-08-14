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

function getSteps(): string[] {
  return ["Informações básicas", "Detalhes", "Imagens", "Localização"];
}

export const NewService = (): JSX.Element => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = getSteps();
  const isLastStep: boolean = activeStep === steps.length - 1;
  let form;

  const handleNext = (data: any) => {
    form = data;
    console.log(form);
    setActiveStep(activeStep + 1);
  };
  const handleBack = (data: any) => setActiveStep(activeStep - 1);

  function onSubmit(data: any) {
    data.preventDefault();
    console.log("Submiutei");
  }

  function getStepContent(stepIndex: number): JSX.Element {
    switch (stepIndex) {
      case 0:
        return <BasicInformations handleNextStep={handleNext} />;
      case 1:
        return <Details handleNextStep={handleNext} handleBackStep={handleBack} />;
      case 2:
        return <Location />;
      case 3:
        return <Media handleNextStep={handleNext} handleBackStep={handleBack} />;
      default:
        return null;
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar title="Novo Serviço" />
      <MDBox pt={3} pb={8}>
        <Grid container justifyContent="center" sx={{ my: 4 }}>
          <Grid item xs={12} lg={8}>
            <MDBox mt={6} mb={8} textAlign="center">
              <MDBox mb={1}>
                <MDTypography variant="h3" fontWeight="bold">
                  Adicionar Novo Serviço
                </MDTypography>
              </MDBox>
              <MDTypography variant="h5" fontWeight="regular" color="secondary">
                Insira as informação sobre o serviço oferecido.
              </MDTypography>
            </MDBox>
            <Card component="form" role="form" method="POST" onSubmit={onSubmit}>
              <MDBox mt={-3} mx={2}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </MDBox>
              {getStepContent(activeStep)}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};
