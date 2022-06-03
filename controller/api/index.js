const express = require('express');
const CostRoute = require('./cost.controller');
const docsRoute = require('./docs.controller');
const ProfitRoute = require('./profit.controller');
const EmployeeRoute = require('./employee.controller');
const OrderRoute = require('./order.controller');
const AuthRoute = require('./auth.controller');

const router = express.Router();
const defaultRoutes = [
    {
      path: '/cost',
      route: CostRoute,
    },
    {
      path: '/profit',
      route: ProfitRoute,
    },
    {
      path: '/employee',
      route: EmployeeRoute,
    },
    {
      path: '/order',
      route: OrderRoute,
    },
    {
      path: '/auth',
      route: AuthRoute,
    },
];
 
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
  
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;