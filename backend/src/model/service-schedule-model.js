class ServiceSchedule {
  constructor(dto) {
    this.id = dto.id;
    this.serviceId = dto.service_id || dto.serviceId;
    this.schedulerUserId = dto.scheduler_user_id || dto.schedulerUserId;
    this.appointmentDate = dto.appointment_date || dto.appointmentDate;
    this.obs = dto.obs;
    this.approved = dto.approved;
  }
}

module.exports = ServiceSchedule;