const express = require('express');
const profit = require("../../service/profit.service.js");
const router = express.Router();


router.post("/list",profit.list);

router.post("/newprofit",profit.newprofit);

module.exports = router;

/**
 * @swagger
 * /profit/list:
 *   post:
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
 *                   type: array
 *                   items:
 *                      type:integer
 *                 branch_id:
 *                  type: integer
 *               example:
 *                 startdate: "2022-01-01"
 *                 enddate: "2022-01-30"
 *                 profitcode: [1,2]
 *                 branch_id: 1
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
 *                  profit:
 *                      type:number
 *                example:
 *                  date: "2022-01-01"
 *                  profit: 800000
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
 * /profit/newprofit:
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
 *               required: date,profit,profitcode,branch_id
 *               properties:
 *                  date:
 *                      type: date
 *                  profit:
 *                      type: number
 *                  profitcode:
 *                      type: number
 *                  branch_id:
 *                   type: integer
 *               example:
 *                 date : "2022-01-05"
 *                 profit : 50000
 *                 profitcode : 1
 *                 branch_id: 1
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
