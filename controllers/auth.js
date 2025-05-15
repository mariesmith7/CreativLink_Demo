const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");



// GET- login
exports.getLogin = (req, res) => {
  const role = req.query.role || 'visitor';

  if (req.user) {
    if (role === "artist") {
      return res.redirect("/artist");
    } else if (role === "curator") {
      return res.redirect("/curator");
    } else {
      return res.redirect("/visitor");
    }
  }
  //res.render("login", {
   // title: "Login",
  res.render('login', { role }); // sending the role to EJS to be selected
 // });
};

// POST- login
exports.postLogin = (req, res, next) => {
  // validate the login form 
  const validationErrors = [];
  if (!validator.isEmail(req.body.email)) {
    validationErrors.push({ msg: "Please enter a valid email address." });
  }

  if (validator.isEmpty(req.body.password)) {
    validationErrors.push({ msg: "Password cannot be blank." });
  }

  if (validationErrors.length > 0) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }

  //normalize the email address
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  // authnticate using passport
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }

    // user log in
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      req.flash("success", { msg: "Success! You are logged in." });

      //based on the role, redirect the user 
      if (user.role === "artist") {
        return res.redirect("/artist");
      } else if (user.role === "curator") {
        return res.redirect("/curator");
      } else {
        return res.redirect("/visitor");
      }
    });
  })(req, res, next);
};

// GET / logout 
exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  });
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
  
    req.user = null;
    res.redirect("/");
  });
};

// GET / signup
exports.getSignup = (req, res) => {
  const role = req.query.role || 'visitor';

  if (req.user) {
    if (role === "artist") {
      return res.redirect("/artist");
    } else if (role === "curator") {
      return res.redirect("/curator");
    } else {
      return res.redirect("/visitor");
    }
   // return res.redirect("/profile");
  }
  //res.render("signup", {
   //title: "Create Account",
 // });
 
  res.render('signup', { role }); // sending the role to EJS to be selected
};

// POST / signup
exports.postSignup = async (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }

  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role, // role field added
  });


// newly added 
  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    });

    if (existingUser) {
      req.flash("errors", {
        msg: "Account with that email address or username already exists.",
      });
      return res.redirect("../signup");
    }

    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
        // redirect based on role
        if (user.role === "artist") {
          return res.redirect("/artist");
        } else if (user.role === "curator") {
          return res.redirect("/curator");
        } else {
          return res.redirect("/visitor");
        }
    });
  } catch (err) {
    return next(err);
  }



/*

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }

          // redirect based on role
          if (user.role === "artist") {
            return res.redirect("/artist");
          } else if (user.role === "curator") {
            return res.redirect("/curator");
          } else {
            return res.redirect("/visitor");
          }
        });
      });
    }
  ); */
};