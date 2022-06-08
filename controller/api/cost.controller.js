const express = require('express');
const cost = require("../../service/cost.service.js");
const router = express.Router();

router.get("/list",cost.list);

router.post("/newcost",cost.newcost)

// router.post("/refund",cost.refund);

// router.post("/disposal",cost.disposal);

// router.post("/salary",cost.salary);

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
 *     parameters:
 *      - in: query
 *        name: startdate
 *        schema:
 *          type: date
 *      - in: query
 *        name: enddate
 *        schema:
 *          type: date
 *      - in: query
 *        name: costcode
 *        schema:
 *          type: integer
 *      - in: query
 *        name: branch_id
 *        schema:
 *          type: integer
 *      - in: query
 *        name: sumcode
 *        schema:
 *          type: integer
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
 *                  cost:
 *                      type:number
 *                  methods:
 *                      type:string
 *                example:
 *                  date: "2022-01-01"
 *                  loc: 전농1동 25호점
 *                  cost: 800000
 *                  methods: 발주
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
 * /cost/newcost:
 *   post:
 *     summary: update refund costs
 *     description: refund will be processed
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
 *                 - startdate,enddate
 *               properties:
 *                 startdate:
 *                   type: date
 *                 enddate:
 *                   type: date
 *                 costcode:
 *                   type: integer
 *               example:
 *                 startdate: 2022-01-01
 *                 enddate: 2022-01-30
 *                 costcode: 1
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
 * 
 * 
 */

/**
 * @swagger
 * /cost/refund:
 *   post:
 *     summary: update refund costs
 *     description: refund will be processed
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
 *                 - startdate,enddate
 *               properties:
 *                 startdate:
 *                   type: date
 *                 enddate:
 *                   type: date
 *                 costcode:
 *                   type: integer
 *               example:
 *                 startdate: 2022-01-01
 *                 enddate: 2022-01-30
 *                 costcode: 1
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
 *                  cost:
 *                      type:number
 *                  methods:
 *                      type:string
 *                example:
 *                  date: "2022-01-01"
 *                  loc: 전농1동 25호점
 *                  cost: 800000
 *                  methods: 발주
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
 * /cost/disposal:
 *   post:
 *     summary: update disposal costs
 *     description: disposal costs will be updated
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
 *                 - startdate,enddate
 *               properties:
 *                 startdate:
 *                   type: date
 *                 enddate:
 *                   type: date
 *                 costcode:
 *                   type: integer
 *               example:
 *                 startdate: 2022-01-01
 *                 enddate: 2022-01-30
 *                 costcode: 1
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
 *                  cost:
 *                      type:number
 *                  methods:
 *                      type:string
 *                example:
 *                  date: "2022-01-01"
 *                  loc: 전농1동 25호점
 *                  cost: 800000
 *                  methods: 발주
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
 * /cost/salary:
 *   post:
 *     summary: update salary costs
 *     description: salary costs will be updated
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
 *                 - startdate,enddate
 *               properties:
 *                 startdate:
 *                   type: date
 *                 enddate:
 *                   type: date
 *                 costcode:
 *                   type: integer
 *               example:
 *                 startdate: 2022-01-01
 *                 enddate: 2022-01-30
 *                 costcode: 1
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
 *                  cost:
 *                      type:number
 *                  methods:
 *                      type:string
 *                example:
 *                  date: "2022-01-01"
 *                  loc: 전농1동 25호점
 *                  cost: 800000
 *                  methods: 발주
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 * 
 * 
 */