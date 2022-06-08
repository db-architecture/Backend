const express = require('express');
const CostRoute = require('./cost.controller');
const docsRoute = require('./docs.controller');
const ProfitRoute = require('./profit.controller');
const EmployeeRoute = require('./employee.controller');
const OrderRoute = require('./order.controller');
const AuthRoute = require('./auth.controller');
const authority = require('../middleware/authorityCheck');

const router = express.Router();

const authority_null = [
  {
    path: '/auth',
    route: AuthRoute
  }
]

const authority_employee = [
  {
    path: '/cost',
    route: CostRoute,
  },
  {
    path: '/profit',
    route: ProfitRoute,
  },
]

const authority_employer = [
  {
    path: '/employee',
    route: EmployeeRoute,
  },
  {
    path: '/order',
    route: OrderRoute,
  },
]
 
const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];


devRoutes.forEach((route) => {
  router.use(route.path,route.route);
});

authority_null.forEach((route) => {
  router.use(route.path, route.route);
});

authority_employee.forEach((route) => {
  router.use(route.path, authority.authority_employee_check, route.route);
})

authority_employer.forEach((route) => {
  router.use(route.path, authority.authority_employer_check, route.route);
});

module.exports = router;