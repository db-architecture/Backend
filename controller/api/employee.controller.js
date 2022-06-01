const express = require('express');
const employee = require("../../service/employee.service.js");
const router = express.Router();


router.post("/newemployee",employee.newemployee);

router.get("/list",employee.list);

router.put("/salary",employee.salary);

// router.get("/commutelist",employee.commutelist);

router.delete("/fire",employee.fire);

module.exports = router;

/**
 * @swagger
 * /employee/newemployee:
 *   post:
 *     summary: create employee
 *     description: 
 *     tags: [employee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: employee_name,employee_phone,salary,branch_id
 *               properties:
 *                  employee_name:
 *                      type: string
 *                  employee_phone:
 *                      type: string
 *                  salary:
 *                      type: integer
 *                  branch_id:
 *                   type: integer
 *               example:
 *                 employee_name : "김편돌"
 *                 employee_phone : "01024445555"
 *                 salary : 10000
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

/**
 * @swagger
 * /employee/list:
 *   get:
 *     summary: show employee
 *     description:
 *     tags: [employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: branch_id
 *        schema:
 *          type: integer
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employee_name:
 *                  type:string
 *                 employee_phone:
 *                  type:string
 *                 salary:
 *                  type:integer
 *               example:
 *                 employee_name : "김편돌"
 *                 employee_phone : "01024445555"
 *                 salary : 10000
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
 * /employee/salary:
 *   put:
 *     summary: update salary
 *     description: 
 *     tags: [employee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: employee_name,salary,branch_id
 *               properties:
 *                  employee_name:
 *                      type: string
 *                  salary:
 *                      type: integer
 *                  branch_id:
 *                   type: integer
 *               example:
 *                 employee_name : "김편돌"
 *                 salary : 10000
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
 *                 message: "update success"
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /employee/fire:
 *   delete:
 *     summary: fire employee
 *     description: 
 *     tags: [employee]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: employee_name,salary,branch_id
 *               properties:
 *                  employee_name:
 *                      type: string
 *                  branch_id:
 *                   type: integer
 *               example:
 *                 employee_name : "김편돌"
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
 *                 message: "delete success"
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */