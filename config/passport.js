const LocalStrategy = require("passport-local").Strategy;
const mongoose      = require("mongoose");
const bcrypt = require("bcrypt");
const User          = require("../models/User");

module.exports = function (passport) {
  // ───────────────────────────────────
  // Local strategy
  // ───────────────────────────────────
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          console.log("Login failed: password not set");
          return done(null, false, {
            msg:
              "Set a password in your profile to enable login with email.", //shorter message
          });
        }

        /* to Compare passwords (wrap the callback helper in a promise) 
        const compare = promisify(user.comparePassword.bind(user));
        const isMatch = await compare(password);

        if (!isMatch) {
          return done(null, false, { msg: "Invalid email or password." });
        }

        // sucess
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  */

  // To compare passwords (wrap the callback helper in a promise) 
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Login failed: password does not match");
    return done(null, false, { msg: "Invalid email or password." });
  }

  console.log("Login successful for:", user.email);
  return done(null, user);
} catch (err) {
  console.error("Error in passport strategy:", err);
  return done(err);
}
})
);


  // save user id and info 
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
