const { errorHandler } = require("../error/errors");
const { generateToken, cookieSetter } = require("../helper/helper");
const bcrypt = require("bcrypt");
const { User } = require("../models");

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });
    // Find the user with the specified email
    const foundUser = await User.findOne({
      where: { email }, // Sequelize syntax for query conditions
    });

    console.log({ foundUser });

    if (!foundUser) return errorHandler(res, 404, "User not found");

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch)
      return errorHandler(res, 401, "Invalid email or password!");

    // Remove password from the user object
    const { password: pwd, ...rest } = foundUser.dataValues;

    // Generate access token and set cookie
    const access_token = generateToken(foundUser.id);
    cookieSetter(res, access_token, true);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...rest,
      },
      access_token,
    });
  },
  logout: async (req, res) => {
    cookieSetter(res, null, false);
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  },
};
