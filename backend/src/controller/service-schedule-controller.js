const ServiceSchedule = require("../model/service-schedule-model");
const ServiceScheduleRepository = require("../repository/service-schedule-repository");
const logger = require("../utils/logger");

class ServiceScheduleController {
  async createSchedule(req, res) {
    try {
      req.body.schedulerUserId = req.user.userId;
      const ret = await new ServiceScheduleRepository().createSchedule(new ServiceSchedule(req.body));

      logger.info(`Usuário ${req.user.userId} agendou um serviço.`);

      return res.status(200).send({ msg: "Agendamento criado." });
    } catch (error) {
      logger.error();
      return res.status(400).send({ errors: [{ msg: error.message }] });
    }
  }
}

module.exports = new ServiceScheduleController();