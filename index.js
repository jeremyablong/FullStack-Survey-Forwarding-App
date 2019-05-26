// bring in express
const express = require("express");
// bring in mongoose
const mongoose = require("mongoose");
// cookie session npm
const cookieSession = require("cookie-session");
// require passport 
const passport = require("passport");
// parser
const bodyParser = require("body-parser");
// require keys 
const keys = require("./config/keys.js");
// require path
const path = require("path");
// require model user configurations and collection
require("./models/user.js");
// model survey
require("./models/survey.js");
// passport from services
require("./services/passport.js");
// connect mongoDB to mongoose

mongoose.connect(keys.mongoURI, {
	useNewUrlParser: true
}).then(() => {
	console.log("Connected to database");
}).catch((error) => {
	console.log("NOT connected to the database", error);
})
// app
const app = express();

// body parser
app.use(bodyParser.json());

// static react build
// app.use(express.static(__dirname + '/public'));
// app.get('*', (req,res) => res.sendFile(path.join(__dirname+'/client/public/index.html')));
// use cookies in application
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());
// billing routes
require("./routes/billingRoutes.js")(app);
// auth routes
require("./routes/authRoutes.js")(app);
// survey routes
require("./routes/surveyRoutes.js")(app);
if (process.env.NODE_ENV === "production") {
	// Express will serve up production files
	app.use(express.static("client/build"));
	// serve up index.html file if it doenst recognize the route
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	})
} 


const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is running at port ${port}`);
}); 
