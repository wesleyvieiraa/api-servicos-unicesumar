import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import servicesService from "services/services-service";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { decodeJWT } from "utils/decode-jwt";

export const MySchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const decodedUser = decodeJWT(token);

  const fetchSchedules = async () => {
    try {
      const response = await servicesService.listMySchedules();
      if (response.schedules && Array.isArray(response.schedules)) {
        setSchedules(response.schedules);
      } else {
        console.error("Formato inesperado da resposta:", response);
        setSchedules([]);
      }
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      setSchedules([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleScheduleApproval = async (scheduleId: number, approved: boolean) => {
    try {
      await servicesService.approveDisapproveSchedule(scheduleId, approved);
      alert(`Agendamento ${approved ? "aceito" : "rejeitado"} com sucesso!`);
      fetchSchedules();
    } catch (error) {
      console.error("Erro ao atualizar o status do agendamento:", error);
      alert("Não foi possível atualizar o status do agendamento. Tente novamente.");
    }
  };

  const columns = [
    { Header: "ID", accessor: "id", width: "5%" },
    { Header: "ID Serviço", accessor: "idServico", width: "5%" },
    { Header: "ID Usuário", accessor: "idUsuario", width: "5%" },
    { Header: "Data", accessor: "data", width: "16.5%" },
    { Header: "Observações", accessor: "observacoes", width: "16.5%" },
    { Header: "Status", accessor: "status", width: "10%" },
    { Header: "Ações", accessor: "acoes", width: "20%" },
  ];

  const rows = schedules.map((schedule) => {
    console.log(schedule.id, schedule.approved);
    return {
      id: schedule.id,
      idServico: schedule.serviceId,
      idUsuario: schedule.schedulerUserId,
      data: new Date(schedule.appointmentDate).toLocaleString(),
      observacoes: schedule.obs?.trim() || "Nenhuma observação",
      status:
        schedule.approved === true
          ? "Aceito"
          : schedule.approved === false
          ? "Desaprovado"
          : "Pendente",
      acoes: (
        <>
          <MDButton
            color="success"
            onClick={() => handleScheduleApproval(schedule.id, true)}
            style={{
              marginRight: "10px",
              padding: "5px 10px",
            }}
          >
            Aceitar
          </MDButton>
          <MDButton
            color="error"
            onClick={() => handleScheduleApproval(schedule.id, false)}
            style={{
              padding: "5px 10px",
            }}
          >
            Desaprovar
          </MDButton>
        </>
      ),
    };
  });

  return (
    <DashboardLayout>
      <DashboardNavbar titleToBradcrumb="Serviços" title="Meus Agendamentos" />
      <MDBox>
        {isLoading ? (
          <p>Carregando agendamentos...</p>
        ) : (
          <DataTable
            table={{
              columns,
              rows,
            }}
          />
        )}
      </MDBox>
    </DashboardLayout>
  );
};
