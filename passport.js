var LocalStrategy = require("passport-local").Strategy;
const db = require('./db');


passport.use(new LocalStrategy(
    function (req, res, username, password, done) {
        console.log("111", req.body.username);
        db.user.findOne({where: {username: username}}, function (err, user) {
            if (!user) {
                console.log(222)
                return done(null, false);
            } else {
                if (user.password != password) {
                    console.log(333);
                    return done(null, false);
                } else return done(null, user);
            }
        });
    }
));