const { login, logout } = require("../controllers/auth.controller");
const { asyncError } = require("../error/errors");
const router = require("express").Router();

router.post("/login", asyncError(login));
router.get("/logout", asyncError(logout));

module.exports = router;
