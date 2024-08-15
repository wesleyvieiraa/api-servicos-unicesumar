const { body, validationResult } = require("express-validator");
const Service = require("../model/service-model");
const ServiceRepository = require("../repository/service-repository");
const logger = require("../utils/logger");
const { whereAndStackError } = require("../utils/where-and-stack-error");
const { flexibleSearch } = require("../utils/flexible-search");

class ServiceController {
  validadeCreation() {
    return [
      body("name", "Nome do serviço é inválido.")
        .isLength({ min: 3 }).withMessage("Nome do serviço é muito curto.")
        .isLength({ max: 255 }).withMessage("Nome do serviço é muito longo."),
      body("categoryId", "Categoria é inválida.")
        .notEmpty().withMessage("Categoria não pode ser vazia.")
        .isInt().withMessage("Categoria deve ser um número inteiro"),
      body("providerName", "Nome do prestador é inválido.")
        .isLength({ min: 3 }).withMessage("Nome do prestador é muito curto.")
        .isLength({ max: 255 }).withMessage("Nome do prestador é muito longo."),
      body("description", "Descrição é inválida.")
        .isLength({ min: 3 }).withMessage("Descrição é muito curta.")
        .isLength({ max: 255 }).withMessage("Descrição é muito longa."),
      body("price", "Preço é inválido.")
        .isNumeric().withMessage("Preço deve ser um número."),
      body("unitId", "Unidade é inválida.")
        .isInt().withMessage("ID da unidade deve ser um número."),
      body("paymentMethodIds", "Métodos de pagamento é inválido.")
        .isArray().withMessage("Métodos de pagamento deve ser um array.")
        .custom((value) => {
          const areAllIntegers = value.every((element) => Number.isInteger(element));
          if (!areAllIntegers) {
            throw new Error("Os valores do array de ID's dos métodos de pagamento devem ser todos números inteiros.");
          }
          return true;
      }),
    ];
  }

  validadeUpdate() {
    return [
      body("serviceId", "ID do serviço é inválida.")
        .notEmpty().withMessage("ID do serviço não pode ser vazia.")
        .isInt().withMessage("ID do serviço deve ser um número inteiro"),
      body("name", "Nome do serviço é inválido.")
        .isLength({ min: 3 }).withMessage("Nome do serviço é muito curto.")
        .isLength({ max: 255 }).withMessage("Nome do serviço é muito longo."),
      body("categoryId", "Categoria é inválida.")
        .notEmpty().withMessage("Categoria não pode ser vazia.")
        .isInt().withMessage("Categoria deve ser um número inteiro"),
      body("providerName", "Nome do prestador é inválido.")
        .isLength({ min: 3 }).withMessage("Nome do prestador é muito curto.")
        .isLength({ max: 255 }).withMessage("Nome do prestador é muito longo."),
      body("description", "Descrição é inválida.")
        .isLength({ min: 3 }).withMessage("Descrição é muito curta.")
        .isLength({ max: 255 }).withMessage("Descrição é muito longa."),
      body("price", "Preço é inválido.")
        .isNumeric().withMessage("Preço deve ser um número."),
      body("unitId", "Unidade é inválida.")
        .isInt().withMessage("ID da unidade deve ser um número."),
      body("paymentMethodIds", "Métodos de pagamento é inválido.")
        .isArray().withMessage("Métodos de pagamento deve ser um array.")
        .custom((value) => {
          const areAllIntegers = value.every((element) => Number.isInteger(element));
          if (!areAllIntegers) {
            throw new Error("Os valores do array de ID's dos métodos de pagamento devem ser todos números inteiros.");
          }
          return true;
      }),
    ];
  }

  async listService(req, res) {
    try {
      const { services, totalRows } = await flexibleSearch(
        ['name'],
        ['categoryId'],
        [],
        ['name'],
        req.query.sort,
        ['asc', 'desc'],
        req.query.page,
        new ServiceRepository().listService,
        req
      );
      
      return res.status(200).send({ services, totalRows });
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar atualizar o serviço. ${whereAndStackError(__filename, error)}`);
      return res.status(400).send({ 
        errors: [{ msg: error.message }] 
      });
    }
  }

  async createService(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let serviceDto = new Service(req.body);
      serviceDto.userId = req.user.userId;
      const service = await new ServiceRepository().createService(serviceDto);
      return res.status(200).send({ msg: "Success", service });
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar criar o serviço. ${whereAndStackError(__filename, error)}`);
      return res.status(400).send({ 
        errors: [{ msg: error.message }] 
      });
    }
  }

  async updateService(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let serviceDto = new Service(req.body);
      const service = await new ServiceRepository().updateService(serviceDto);
      return res.status(200).send({ msg: "Success", service });
    } catch (error) {
      logger.error(`Ocorreu um erro ao tentar atualizar o serviço. ${whereAndStackError(__filename, error)}`);
      return res.status(400).send({ 
        errors: [{ msg: error.message }] 
      });
    }
  }
}

module.exports = new ServiceController();