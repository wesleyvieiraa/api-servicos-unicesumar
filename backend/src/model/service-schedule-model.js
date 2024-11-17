class ServiceSchedule {
  constructor(dto) {
    this.scheduleId = dto.schedule_id || dto.scheduleId;
    this.serviceId = dto.service_id || dto.serviceId;
    this.schedulerUserId = dto.scheduler_user_id || dto.schedulerUserId;
    this.appointmentDate = dto.appointment_date || dto.appointmentDate;
    this.obs = dto.obs;
  }
}

module.exports = ServiceSchedule;