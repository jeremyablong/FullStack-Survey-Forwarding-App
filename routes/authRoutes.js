const passport = require("passport");

const development = "http://localhost:3000";
const production = "https://peaceful-eyrie-82759.herokuapp.com";

module.exports = (app) => {
	app.get("https://peaceful-eyrie-82759.herokuapp.com/auth/google", passport.authenticate("google", {
		scope: ["profile", "email"]
		})
	);
	app.get("https://peaceful-eyrie-82759.herokuapp.com/auth/google/callback", passport.authenticate("google"),
		(req, res) => {
			res.redirect("https://peaceful-eyrie-82759.herokuapp.com/surveys");
		}
	);

	app.get("https://peaceful-eyrie-82759.herokuapp.com/api/logout", (req, res) => {
		req.logout();
		res.redirect("https://peaceful-eyrie-82759.herokuapp.com");
	})

	app.get("https://peaceful-eyrie-82759.herokuapp.com/api/currentUser", (req, res) => {
		res.send(req.user);
	});
};
