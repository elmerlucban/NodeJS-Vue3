const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALL_BACK_URL,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
  
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          firstName: profile.displayName,
          email: profile.emails[0].value,
        });
      }
  
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

exports.authenticateGoogle = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] });

exports.googleCallback = passport.authenticate('google', { failureRedirect: '/' }, (req, res) => {

  res.json(req.user);
});

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
