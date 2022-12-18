const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserController = require("./controller/userController");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    next();
});

app.get("/user_tb", UserController.user_tb);
app.post("/create/user", UserController.createUser);
app.post("/login/user", UserController.login);
app.get("/get/all/users", UserController.getAll);

app.get("/use/param/:id", (req, res) => {
    const { id } = req.params;

    res.send("params: " + id);
});

app.listen(4444, () => {
    console.log("app work at 4444 port in your localhost");
});
