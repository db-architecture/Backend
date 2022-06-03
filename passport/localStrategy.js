const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const model = require('../models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });
    
    passport.deserializeUser((name, done) => {
        console.log("local deserialize find");
        model.User.findOne({where: {user_id: id}})
        .then(result => {done(null,result)})
        .catch(err => {console.log(err);});
    });

    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
      }, async (id, password, done) => {
          try {
              console.log("password find");
              const userFound = await model.User.findOne({
                  where: {user_id: id},
              });

              if(userFound) {
                if(userFound == password) {
                    return done(null, userFound);
                } else {
                    return done(null, false);
                }
              } else {
                  return done(null,null);
              }
          } catch(error) {
              done(error);
          }
      }));
    }
