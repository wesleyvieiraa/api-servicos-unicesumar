import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import servicesService from "services/services-service";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { decodeJWT } from "utils/decode-jwt";
import Rating from "@mui/material/Rating";

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

  const giveScoreToService = async (serviceId: number, score: number) => {
    try {
      console.log(score);
      await servicesService.giveScoreToService(serviceId, score);
      alert("Avaliação registrada com sucesso!");
      fetchSchedules();
    } catch (error) {
      console.error("Erro ao avaliar o serviço:", error);
      alert("Não foi possível registrar sua avaliação. Tente novamente.");
    }
  };

  const columns = [
    { Header: "ID", accessor: "id", width: "5%" },
    { Header: "ID Serviço", accessor: "idServico", width: "5%" },
    { Header: "Nome do Prestador", accessor: "userProvider", width: "5%" },
    { Header: "Nome do Solicitante", accessor: "userScheduler", width: "5%" },
    { Header: "Data", accessor: "data", width: "16.5%" },
    { Header: "Observações", accessor: "observacoes", width: "16.5%" },
    { Header: "Status", accessor: "status", width: "10%" },
    { Header: "Ações", accessor: "acoes", width: "20%" },
  ];

  const rows = schedules.map((schedule) => {
    let status;

    // Determinação do status com base no campo `approved`
    switch (schedule.approved) {
      case true:
        status = "Aceito";
        break;
      case false:
        status = "Desaprovado";
        break;
      default:
        status = "Pendente";
    }

    // Verificar se o usuário logado é o provider ou o scheduler para cada linha
    const isProvider = decodedUser?.userId !== schedule?.schedulerUserId;
    const isScheduler = decodedUser?.userId === schedule?.schedulerUserId;
    console.log(isScheduler);

    // Adicionar logs para depuração
    console.log(decodedUser.userId);

    return {
      id: schedule.id,
      idServico: schedule.serviceId,
      userProvider: schedule.userProvider || "Usuário não identificado",
      userScheduler: schedule.userScheduler || "Usuário não identificado",
      data: new Date(schedule.appointmentDate).toLocaleString(),
      observacoes: schedule.obs?.trim() || "Nenhuma observação",
      status,
      acoes: (
        <>
          {/* Verifica se o usuário logado é o provider */}
          {isProvider && status === "Pendente" && (
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
          )}
          {/* Verifica se o usuário logado é o scheduler */}
          {isScheduler && status === "Aceito" && (
            <Rating
              name={`rating-${schedule.id}`}
              value={schedule.average || 0}
              onChange={(event, newValue) => {
                if (newValue) giveScoreToService(schedule.serviceId, newValue);
              }}
              disabled={schedule.average}
            />
          )}
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
