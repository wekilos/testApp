const sequelize = require("../config/db");
const Sequelize = require("sequelize");

const User = sequelize.define(
    "User",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.STRING,
        phoneNumber: Sequelize.BIGINT,
        email: Sequelize.STRING,
        password: Sequelize.TEXT,
        active: { type: Sequelize.BOOLEAN, default: true },
        deleted: { type: Sequelize.BOOLEAN, default: false },
    },
    {
        timestamps: true,
    }
);

module.exports = User;
