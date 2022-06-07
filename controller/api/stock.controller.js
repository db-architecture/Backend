const express = require('express');
const stock = require("../../service/stock.service.js");
const router = express.Router();

router.get("/:itemId", stock.getList);

router.get("/", stock.getList);

router.post("/", stock.addItem);

router.post("/ordernum", stock.setOrderNum);





module.exports = router;