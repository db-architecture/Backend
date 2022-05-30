const express = require('express');
const order = require("../../service/order.service.js");
const router = express.Router();

router.post("/", order.applyOrder);

router.get("/", order.getList);

router.delete("/", order.deleteOrder);

router.get("/necessary", order.getNeccesaryList);

router.post("/necessary/:itemId", order.applyNeccesaryOrder)

module.exports = router;