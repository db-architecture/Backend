require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiroutes = require("./controller/api/");
const docs = require("./controller/api/docs.controller")
const { sequelize } = require("./models");

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use( cors({ 
    origin: [  
      "http://localhost:8080","http://localhost:8081","http://localhost:3001" ], 
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
       preflightContinue: false, 
       optionsSuccessStatus: 204, 
       credentials: false, }) );

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