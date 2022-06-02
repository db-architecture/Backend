const express = require('express');
const CostRoute = require('./cost.controller');
const docsRoute = require('./docs.controller');
const ProfitRoute = require('./profit.controller');
const EmployeeRoute = require('./employee.controller');

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
    }
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