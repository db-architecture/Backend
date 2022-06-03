const express = require('express');
const event = require("../../service/event.service.js");
const router = express.Router();

// event list retrive
router.get("/list",event.getAllEvenetList);

// register new event
router.post("/",event.registerNewEvent);

//
//routher.delete("/",event.deletEvent)
module.exports = router;

/**
 * @swagger
 * /event/list:
 *   get:
 *     summary: show package list
 *     description: show packages list
 *     tags: [event]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: event_type
 *         schema:
 *           type: string
 *         description: event_type
  *       - in: query
 *         name: stuff_name
 *         schema:
 *           type: string
 *         description: stuff_name
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
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
 * /event:
 *   post:
 *     summary: register new package
 *     description: 
 *     tags: [event]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: stuff_name,disprice,disrate,startdate,enddate,event_type
 *               properties:
 *                  stuff_name:
 *                      type: string
 *                  disprice:
 *                      type: string
 *                  disrate:
 *                      type: string
 *                  startdate:
 *                      type: string
 *                  enddate:
 *                      type: string
 *                  event_type:
 *                      type: string
 * 
 * 
 *               example:
 *                 stuff_name : "슈넬"
 *                 disprice : "1500"
 *                 disrate: "40"
 *                 startdate : "2022-07-01"
 *                 enddate : "2022-07-31"
 *                 event_type : "1+1행사"
 * 
 * 
 *     responses:
 *       "200":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  stuff_name:
 *                      type: string
 *                  disprice:
 *                      type: string
 *                  disrate:
 *                      type: string
 *                  startdate:
 *                      type: string
 *                  enddate:
 *                      type: string
 *                  event_type:
 *                      type: string
 * 
 *               example:
 *                 stuff_name : "슈넬"
 *                 disprice : "1500"
 *                 disrate: "40"
 *                 startdate : "2022-07-01"
 *                 enddate : "2022-07-31"
 *                 event_type : "1+1행사"
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
