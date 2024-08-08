import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import httpService from "services/http.service";

const testando = async () => {
  await httpService.get("/info");
};

function Teste() {
  const message = `Isso é apenas um teste pra você ver como é feito a tela, Chi. Depois esse componente deve ser excluído.`;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDTypography variant="h5" fontWeight="regular" sx={{ mt: 4 }}>
          {message}
        </MDTypography>
        <MDButton onClick={testando}>{`Teste`}</MDButton>
      </MDBox>
    </DashboardLayout>
  );
}

export default Teste;
