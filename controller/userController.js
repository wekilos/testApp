const User = require("../models/user");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Func = require("../functions/function");

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
    const user = await User.findOne({ where: { email: email } });
    if (user) {
        res.send("Bu email addressde ulanyjy bar!");
    } else {
        const salt = await bcrypt.genSalt();
        console.log("salt: " + salt);
        bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
                res.send(err);
            } else {
                User.create({
                    name: name,
                    phoneNumber: phoneNumber,
                    email,
                    password: hashedPassword,
                    active: true,
                    deleted: false,
                })
                    .then((data) => {
                        jwt.sign(
                            {
                                id: data.id,
                                name: data.name,
                                phoneNumber: data.phoneNumber,
                                email: data.email,
                            },
                            Func.Secret(),
                            (err, token) => {
                                res.status(200).json({
                                    msg: "Suссessfully",
                                    token: token,
                                    id: data.id,
                                    name: data.name,
                                    phoneNumber: data.phoneNumber,
                                    email: data.email,
                                });
                            }
                        );
                    })
                    .catch((err) => {
                        res.json(err);
                    });
            }
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ where: { email } });
    if (!user) {
        res.send("You must sign up!");
    } else {
        if (await bcrypt.compare(password, user.password)) {
            jwt.sign(
                {
                    id: user.id,
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                },
                Func.Secret(),
                (err, token) => {
                    res.json({
                        id: user.id,
                        name: user.name,
                        token: token,
                        phoneNumber: user.phoneNumber,
                        email: user.email,
                        isLogin: true,
                    });
                }
            );
        } else {
            res.send("Parol Nadogry!");
        }
    }
};

exports.user_tb = user_tb;
exports.createUser = createUser;
exports.getAll = getAll;
exports.login = login;
