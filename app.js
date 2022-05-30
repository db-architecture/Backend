require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const apiroutes = require("./controller/api/");
// const { sequelize } = require("./models");

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieparser(process.env.COOKIE_SECRET));

// sequelize.sync({ force: false })
//   .then(() => {
//     console.log('Successfully connected');
//   })
//   .catch((err) => {
//     console.error(err);
// });

app.get("/",(req,res) => {
    //res.json({message:"hello"});
    res.sendFile(__dirname + '/login_test.html');
});

// app.use('/',apiroutes);

app.set('port', process.env.PORT || 3001);

module.exports = app;