const express = require('express');

const HomeRoute = require('./home.controller');
const docsRoute = require('./docs.controller');
const router = express.Router();
const defaultRoutes = [
    {
      path: '/home',
      route: HomeRoute,
    },
];
 
// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({message: "Auth is required"});
  }
};

// devRoutes.forEach((route) => {
//     router.use(route.path, authenticateUser,route.route);
// });
  
defaultRoutes.forEach((route) => {
    router.use(route.path,authenticateUser, route.route);
});

module.exports = router;