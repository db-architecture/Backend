const express = require('express');
const CostRoute = require('./cost.controller');
const docsRoute = require('./docs.controller');
const ProfitRoute = require('./profit.controller');
const packageRoute = require('./package.controller')
const eventRoute = require('./event.controller')

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
      path: '/package',
      route: packageRoute,
    },
    {
      path: '/event',
      route: eventRoute,
    },
];
 
const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

// const authenticateUser = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.status(401).send({message: "Auth is required"});
//   }
// };

devRoutes.forEach((route) => {
    router.use(route.path,route.route);
});
  
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;