const { Sequelize, DataTypes } = require("sequelize");
const { ROLE } = require("../constants");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

// Define the User model
const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(ROLE.ADMIN, ROLE.USER),
      defaultValue: ROLE.USER,
    },
  },
  {
    timestamps: true,
  }
);

// Banner schema
const Banner = sequelize.define(
  "Banner",
  {
    heading: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false, // Disable createdAt and updatedAt
  }
);

// Test the connection and sync the model
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    // console.log("Connection has been established successfully.");
    await sequelize.sync({ force: false }); // Use { force: true } to drop tables and re-create them
    // console.log("User model synced successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

module.exports = { sequelize, User, Banner };
