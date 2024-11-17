const pool = require("../database/pool");
const ServiceSchedule = require("../model/service-schedule-model");
const { factory } = require("../utils/factory");
const logger = require("../utils/logger");
const { whereAndStackError } = require("../utils/where-and-stack-error");

class ServiceScheduleRepository {

  /**
   * 
   * @param {ServiceSchedule} scheduleDto 
   * @returns {Promise<ServiceSchedule>}
   */
  async createSchedule(scheduleDto) {
    try {
      const sql = `
      INSERT INTO services.service_schedule (
        service_id,
        scheduler_user_id,
        appointment_date,
        obs
      )	VALUES ($1, $2, $3, $4)
      RETURNING *;`;

      const params = [
        scheduleDto.serviceId,
        scheduleDto.schedulerUserId,
        scheduleDto.appointmentDate,
        scheduleDto.obs,
      ];
      const result = await pool.query(sql, params);
      return result.rowCount > 0 ? (factory(result.rows, ServiceSchedule))[0] : null;
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar criar um agendamento. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao tentar criar um agendamento.");
    }
  }
}

module.exports = ServiceScheduleRepository;