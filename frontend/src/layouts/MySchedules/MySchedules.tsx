import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export const MySchedules = () => {
  return (
    <DashboardLayout>
      <DashboardNavbar titleToBradcrumb="Serviços" title="Contratar Serviço" />
      <MDBox>Tela...</MDBox>
    </DashboardLayout>
  );
};
