const user = require("../repository/user.repository.js");
const passport = require("passport");

exports.login = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "req.body can not be empty!"
          });
    } else {
        console.log('login')
        passport.authenticate('local');
        res.send(req.user.user_name);
    }
    
}

exports.logout = (req, res) => {
    console.log('logout', req.user);
    req.logout();
    req.session.save(err => {
        if (err) {
            res.send
        }
    });
}