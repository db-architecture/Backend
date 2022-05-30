const express = require('express');
const profit = require("../../service/profit.service.js");
const router = express.Router();


router.get("/list",);

router.post("/newprofit",);

module.exports = router;

/**
 * @swagger
 * /profit/list:
 *   get:
 *     summary: show profits
 *     description: show profits located in query
 *     tags: [profit]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - startdate,enddate
 *               properties:
 *                 startdate:
 *                   type: date
 *                 enddate:
 *                   type: date
*                 profitcode:
 *                   type: integer
 *               example:
 *                 startdate: "2022-01-01"
 *                 enddate: "2022-01-30"
 *                 profitcode: 1
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  date:
 *                      type: date
 *                  loc:
 *                      type:string
 *                  profit:
 *                      type:number
 *                  methods:
 *                      type:string
 *                example:
 *                  date: "2022-01-01"
 *                  loc: 전농1동 25호점
 *                  profit: 800000
 *                  methods: 물건판매
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 * 
 * 
 */

/**
 * @swagger
 * /profit/new:
 *   post:
 *     summary: update profit
 *     description: 
 *     tags: [profit]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: date,profit,profitcode
 *               properties:
 *                  date:
 *                      type: date
 *                  profit:
 *                      type: number
 *                  profitcode:
 *                      type: number
 *               example:
 *                 date : "2022-01-05"
 *                 profit : 50000
 *                 profitcode : 1
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  code:
 *                      type: number
 *                  message:
 *                      type: string
 *               example:
 *                 code: 200
 *                 message: "success"
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
