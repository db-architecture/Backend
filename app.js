require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const apiroutes = require("./controller/api/");
const docs = require("./controller/api/docs.controller")
//const mySqlStore = require('express-mysql-session')(session);
const { sequelize } = require("./models");

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieparser(process.env.COOKIE_SECRET));
app.use( cors({ 
    origin: [  
      "http://localhost:8080","http://localhost:8081" ], 
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
       preflightContinue: false, 
       optionsSuccessStatus: 204, 
       credentials: true, }) );

// const mySqlOption = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// };

//const sessionStore = new mySqlStore(mySqlOption);

// sequelize.sync({ force: false })
//   .then(() => {
//     console.log('Successfully connected');
//   })
//   .catch((err) => {
//     console.error(err);
// });

//DB sync
sequelize.sync({ force: false })
  .then(() => {
    console.log('Successfully connected');
  })
  .catch((err) => {
    console.error(err);
});

app.get("/",(req,res) => {
    //res.json({message:"hello"});
    res.sendFile(__dirname + '/login_test.html');
});

app.use('/',apiroutes);
app.use('/docs',docs);

app.set('port', process.env.PORT || 3001);

module.exports = app;