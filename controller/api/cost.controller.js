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
 *                 - startdate,enddate,profitcode
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

/**
 * @swagger
 * /profit/new:
 *   delete:
 *     summary: unfollow
 *     description: 
 *     tags: [friend]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - friendId
 *               properties:
 *                 friendId:
 *                   type: string
 *               example:
 *                 friendId: 20c37r94-df80-4055-72628fc4njs338e
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
 */