const pool = require("../database/pool");
const logger = require("../utils/logger");
const { whereAndStackError } = require("../utils/where-and-stack-error");
const Service = require("../model/service-model");
const { factory } = require("../utils/factory");
const PrepareSql = require("../utils/prepare-sql");
const { toLogico } = require("../utils/parser");

class ServiceRepository {
  /**
   * 
   * @param {Service} serviceDto 
   * @returns {Promise<Service>}
   */
  async createService(serviceDto) {
    try {
      const sql = 
        `INSERT INTO services.service (
          user_id,
          "name",
          category_id,
          provider_name,
          description,
          price,
          unit_id,
          payment_method_ids,
          "location"
        ) VALUES (
          $1, $2, $3, $4, $5, 
          $6, $7, $8, $9
        ) RETURNING *;`;

      const params = [
        serviceDto.userId,
        serviceDto.name,
        serviceDto.categoryId,
        serviceDto.providerName,
        serviceDto.description,
        serviceDto.price,
        serviceDto.unitId,
        serviceDto.paymentMethodIds.join(","),
        serviceDto.location,
      ];

      const result = await pool.query(sql, params);
      return result.rowCount > 0 ? factory(result.rows, Service) : null;
    } catch (error) {
      logger.error(`Ocorreu um erro ao inserir o novo serviço. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao inserir o novo serviço.");
    }
  }

  /**
   * 
   * @param {Service} serviceDto 
   * @returns {Promise<Service>}
   */
  async updateService(serviceDto) {
    try {
      const sql = 
        `UPDATE services.service SET
          "name" = $2,
          category_id = $3,
          provider_name = $4,
          description = $5,
          price = $6,
          unit_id = $7,
          payment_method_ids = $8,
          "location" = $9
        WHERE service_id = $1
        RETURNING *;`;

      const params = [
        serviceDto.serviceId,
        serviceDto.name,
        serviceDto.categoryId,
        serviceDto.providerName,
        serviceDto.description,
        serviceDto.price,
        serviceDto.unitId,
        serviceDto.paymentMethodIds.join(","),
        serviceDto.location,
      ];

      const result = await pool.query(sql, params);
      return result.rowCount > 0 ? factory(result.rows, Service) : null;
    } catch (error) {
      logger.error(`Ocorreu um erro ao atualizar o novo serviço. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao atualizar o novo serviço.");
    }
  }

  async getServiceById(serviceId) {
    try {
      const sql = 
        `SELECT
          s.service_id,
          s.user_id,
          s."name",
          s.category_id,
          s.provider_name,
          s.description,
          s.price,
          s.unit_id,
          s.payment_method_ids,
          s."location"
        FROM services.service s
        WHERE s.service_id = $1`;

      const params = [serviceId];
      const result = await pool.query(sql, params);
      return result.rowCount > 0 ? (factory(result.rows, Service))[0] : null;
    } catch (error) {
      logger.error(`Ocorreu um erro ao consultar o serviço pelo ID: ${serviceId} no DB. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao consultar o serviço.");
    }
  }

  async listService(
    limit = process.env.PAGINATION_ROWS_PER_PAGE,
    offset = 0,
    filterTextMap = new Map(),
    filterIdMap = new Map(),
    filterBoolMap = new Map(),
    sortColumn = ['name', 'asc']
  ) {
    try {
      let sql = 
        `SELECT
          s.service_id,
          s.user_id,
          s."name",
          s.category_id,
          s.provider_name,
          s.description,
          s.price,
          s.unit_id,
          s.payment_method_ids,
          s."location"
        FROM services.service s
        WHERE 1=1 $replaceFilterText $replaceFilterId $replaceFilterBool $replaceUser
        ORDER BY $replaceOrderColumn
        LIMIT $replaceLimitIndex 
        OFFSET $replaceOffsetIndex;`;

      sql = sql.replace("$replaceUser", `AND user_id ${toLogico(filterBoolMap.get("myServices")) ? "=" : "<>"} ${filterIdMap.get("userId")}`);
      filterBoolMap.delete("myServices");
      filterIdMap.delete("userId");

      let customQuery = new PrepareSql().prepareCustomQuery(
        sql,
        filterTextMap,
        filterIdMap,
        filterBoolMap,
        sortColumn,
        limit,
        offset
      );
  
      const result = await pool.query(customQuery.stringSql, customQuery.paramValues);
      const services = factory(result.rows, Service);
      return { services, totalRows: result.rowCount };
    } catch (error) {
      logger.error(`Ocorreu um erro ao listar os serviços. ${whereAndStackError(__filename, error)}`);
      throw new Error("Ocorreu um erro ao listar os serviços.");
    }
  }
}

module.exports = ServiceRepository;