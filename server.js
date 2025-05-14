// loads required tools
// 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require('./config/database');


// newly added
//route files
const mainRoutes = require("./routes/main.js");
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth(old).js");
const userRoutes = require("./routes/user");
const artistRoutes = require("./routes/artist");
const visitorRoutes = require("./routes/visitor");
const curatorRoutes = require("./routes/curator.js");
const eventRoutes = require("./routes/event");
const searchRoutes = require("./routes/search");
const apiRoutes = require("./routes/api")

//newly added routes
// dashboard routes



//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
//storing the name value of view engine for later when using app.get 
//engine setup 
app.set("view engine", "ejs");

//static folder for public files
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
// looks for a query string like ?_method=PUT and overrides the request method
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
// note to setup env file to hide secret 
// replace with ( secret: process.env.SESSION_SECRET, )
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//flash messages for errors, info, ect...
app.use(flash());

//Routes setup for which server is listening
app.use('/', indexRoutes); // this will be my homepage aka index
//app.use("/", authRoutes); // login and signup page
app.use("/", userRoutes); // artist & vistor page

//api routes
app.use("/event", eventRoutes); // events page or dashboard
app.use("/search", searchRoutes); // search feature
app.use('/api', require('./routes/api')) // api routes
app.use("/", mainRoutes); // main 


// dashboard routes
app.use("/artist", artistRoutes);           // /dashboard/artist
app.use("/visitor", visitorRoutes);          // /dashboard/visitor
app.use("/curator", curatorRoutes); // curator dashboard & create events

//Server Running - start server here 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/* app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
*/
