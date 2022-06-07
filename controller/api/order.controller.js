const express = require('express');
const order = require("../../service/order.service.js");
const router = express.Router();

router.post("/", order.applyOrder);

router.get("/:branch_id", order.getList);

router.delete("/:order_id", order.deleteOrder);

router.get("/necessary/:branch_id", order.getNeccesaryList);

router.post("/necessary", order.applyNeccesaryOrder)

module.exports = router;

/**
 * @swagger
 * /order:
 *   post:
 *     summary: apply order
 *     description: make order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_num
 *               - stuff_id
 *               - branch_id
 *             properties:
 *               order_num:
 *                 type: integer
 *               stuff_id:
 *                 type: integer
 *               branch_id:
 *                 type: integer
 *             example:
 *               order_num: 5
 *               stuff_id: 1
 *               branch_id: 1
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *             example:
 *               order_id: 3
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */ 
 
/**
 * @swagger
 * /order/{branch_id}:
 *   get:
 *     summary: Get all order list
 *     description: get order list 
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branch_id
 *         type: integer
 *         required: true
 *         description: branch id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /order/{order_id}:
 *   delete:
 *     summary: Delete an order
 *     description: branch owner can delete an order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /order/necessary/{branch_id}:
 *   get:
 *     summary: Get all deficient order list
 *     description: get all deficient order list 
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: branch_id
 *         type: integer
 *         required: true
 *         description: branch id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Stock'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /order/necessary:
 *   post:
 *     summary: apply necessary orders
 *     description: make all deficient stuff order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - branch_id
 *             properties:
 *               branch_id:
 *                 type: integer
 *             example:
 *               branch_id: 1
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *             properties:
 *               order_id:
 *                 type: integer
 *             example:
 *               order_id: 3
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */ 