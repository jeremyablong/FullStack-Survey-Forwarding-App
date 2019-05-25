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
// cors
const cors = require('cors');

app.use(cors());
app.options('*', cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
})

app.get('*', cors(), function(req, res){
    res.render('./client/build/index.html');
});

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



const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server is running at port ${port}`);
}); 
