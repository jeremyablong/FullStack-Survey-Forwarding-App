// bring in express
const express = require("express");
// bring in mongoose
const mongoose = require("mongoose");
// cookie session npm
const cookieSession = require("cookie-session");
// require passport 
const passport = require("passport");
// require keys 
const keys = require("./config/keys.js");
// require model user configurations and collection
require("./models/user.js");
// passport from services
require("./services/passport.js");
// connect mongoDB to mongoose

mongoose.connect(keys.mongoURI, {
	useNewUrlParser: true
});
// app
const app = express();

app.get("/", (req, res) => {
	res.send("GET request to the homepage");
})
// use cookies in application
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());
// auth routes
require("./routes/authRoutes.js")(app);

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, () => {
	console.log(`Server is running at port ${PORT}`);
}); 
