const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');
const config = require('./config');

module.exports = function(passport){
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secretKey;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        User.getUserById(jwt_payload._id, (err, user) => {
            if(err) return done(err, false);
            if(user) return done(null, user);
            return done(null, false);
        })
    }));
}