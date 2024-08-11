const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { ROLE } = require("../constants");
const { extractJwt } = require("../helper/helper");
const { errorHandler } = require("../error/errors");
module.exports = {
  isAdmin: async (req, res, next) => {
    try {
      const cookie = req.headers.cookie;
      if (!cookie) return errorHandler(res, 403, "You are not authenticated");

      const token = extractJwt(cookie);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const { dataValues: user } = await User.findOne({
        where: { id: decoded.id }, // Sequelize syntax for query conditions
      });

      if (!user) return errorHandler(res, 403, "Token is not valid");

      if (user.role !== ROLE.ADMIN)
        return errorHandler(res, 403, "You are not allowed to use this route");
      next();
    } catch (error) {
      console.log(error.message);
      return errorHandler(res, 403, "You are not authenticated");
    }
  },
};
