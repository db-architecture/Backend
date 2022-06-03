const express = require('express');
const auth = require("../../service/auth.service.js");
const router = express.Router();

router.post("/login", auth.login);

router.get("/logout", auth.logout);

module.exports = router;