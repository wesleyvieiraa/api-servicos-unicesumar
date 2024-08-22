import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export const MyServices = (): JSX.Element => {
  return (
    <DashboardLayout>
      <DashboardNavbar titleToBradcrumb="Serviço" title="Serviços" />
    </DashboardLayout>
  );
};
