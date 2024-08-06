const authService = require("../service/auth-service");
const logger = require("../utils/logger");

const middlewareAuthorization = function (permissoesNeeded = []) {
  if (typeof permissoesNeeded === "string") {
    permissoesNeeded = [permissoesNeeded];
  }
  return async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {

      logger.error(__filename + " Falha - sem token");
      return res
        .status(401)
        .send({ auth: false, message: "Sem Token.", errors: { msg: "Sem Token" } });
    }
    const tokenWithBearerPrefix = token.substr(7);
    const decoded = authService.verifyJWT(tokenWithBearerPrefix);

    if (decoded.err) {
      logger.error(__filename + " Falha ao autenticar o token [" + token + "] - " + decoded.err);
      return res
        .status(401)
        .send({ auth: false, message: "Falha ao autenticar o Token. Precisa fazer login." });
    }

    req.usuario = { idUsuario: decoded.idUsuario, permissoes: decoded.permissoes };

    if (!req.usuario || !req.usuario.permissoes || !Array.isArray(req.usuario.permissoes)) {

      logger.error(`Falha, usuario sem permissões: ${req.usuario.idUsuario} path ${req.originalUrl}`)
      return res.status(401).json({ message: "Sem permissão", errors: [{ msg: "Sem Permissão" }] });
    }

    var intersectionPermissoes = permissoesNeeded.filter((x) => req.usuario.permissoes.includes(x));

    if (permissoesNeeded.length && intersectionPermissoes.length == 0) {

      logger.error(`Falha, usuario (${req.usuario.idUsuario}) sem permissão para acessar o path: ${req.originalUrl}`)
      logger.error(`Permissões necessárias:${JSON.stringify(permissoesNeeded)}; permissões usuario: ${JSON.stringify(req.usuario.permissoes)}`);

      return res.status(401).json({ message: "Sem permissão", errors: [{ msg: "Sem Permissão" }] });
    }

    next();
  };
};

module.exports = middlewareAuthorization;
