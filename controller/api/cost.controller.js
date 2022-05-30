const express = require('express');
const cost = require("../../service/cost.service.js");
const router = express.Router();

// Create friend relationship

router.get("/list",);

router.post("/refund",);

router.post("/disposal",);

router.post("/salary",);

module.exports = router;

/**
 * @swagger
 * /cost/list:
 *   get:
 *     summary: show costs
 *     description: show costs located in query
 *     tags: [cost]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - startdate,enddate,costcode
 *               properties:
 *                 startdate:
 *                   type: date
 *                 enddate:
 *                   type: date
 *                 profitcode:
 *                   type: integer
 *               example:
 *                 startdate: 2022-01-01
 *                 enddate: 2022-01-30
 *                 profitcode: 1
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Room'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 * 
 * 
 */