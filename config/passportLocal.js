const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById){
    const authenticator = async (email, password, done) => {
        const user = getUserByEmail(email);
        if(user == null){
            return done(null, false, {'message': 'No user with that email is present'})
        }
        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            }
            else{
                return done(null, false, {'message' : 'Email/Password is wrong'});
            }
        } catch (error) {
            return done(error);
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticator));

    passport.serializeUser(function(user, done) {
        return done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
          return done(null, getUserById(id));
      });
}


module.exports = initialize;

