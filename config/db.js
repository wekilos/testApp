var Sequelize = require("sequelize");

const sequelize = new Sequelize("userData", "postgres", "samsyk1902", {
    host: "localhost",
    port: "5432",
    dialect: "postgres",
});

module.exports = sequelize;
