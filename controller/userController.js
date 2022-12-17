const User = require("../models/user");
const sequelize = require("../config/db");

const user_tb = async (req, res) => {
    const response = await sequelize
        .sync()
        .then(async () => {
            let respon = await User.findAll();
            return respon;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });

    res.json(response);
};

const getAll = (req, res) => {
    User.findAll()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
};

const createUser = async (req, res) => {
    const { name, phoneNumber, email, password } = req.body;
    console.log(req.body);
    User.create({
        name: name,
        phoneNumber: phoneNumber,
        email,
        password,
        active: true,
        deleted: false,
    })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
};

exports.user_tb = user_tb;
exports.createUser = createUser;
exports.getAll = getAll;
