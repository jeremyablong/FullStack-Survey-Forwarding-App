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
// app
const app = express();
// require model user configurations and collection
require("./models/user.js");
// model survey
require("./models/survey.js");
// passport from services
require("./services/passport.js");
// connect mongoDB to mongoose
// cors
const cors = require('cors');



//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
	app.get('*', (request, response) => {
		response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});
}
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// any file in /client/scripts will automatically be browserified,
// excluding common packages.
// app.use('/js', browserify('./client/scripts', {
// 	external: config.common.packages,
// 	transform: ['babelify']
// }));

/*
	set up any additional server routes (api endpoints, static pages, etc.)
	here before the catch-all route for index.html below.
*/

app.get('*', function(req, res) {
	// this route will respond to all requests with the contents of your index
	// template. Doing this allows react-router to render the view in the app.
	res.render('index.html');
});

mongoose.connect(keys.mongoURI, {
	useNewUrlParser: true
}).then(() => {
	console.log("Connected to database");
}).catch((error) => {
	console.log("NOT connected to the database", error);
})


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
