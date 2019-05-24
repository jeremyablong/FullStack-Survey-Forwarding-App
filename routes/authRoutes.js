const passport = require("passport");

const development = "http://localhost:3000";
const production = "https://peaceful-eyrie-82759.herokuapp.com";

module.exports = (app) => {
	app.get("/auth/google", passport.authenticate("google", {
		scope: ["profile", "email"]
		})
	);
	app.get("/auth/google/callback", passport.authenticate("google"),
		(req, res) => {
			res.redirect(`${development}/surveys`);
		}
	);

	app.get("/api/logout", (req, res) => {
		req.logout();
		res.redirect(`${development}/`);
	})

	app.get("/api/currentUser", (req, res) => {
		res.send(req.user);
	});
};
