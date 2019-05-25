// require keys 
const keys = require("../config/keys.js");
// require stripe
const stripe = require("stripe")(keys.stripeSecretKey);
// requireLogin
const requireLogin = require("../middlewares/requireLogin.js");

module.exports = (app) => {
	app.post("https://peaceful-eyrie-82759.herokuapp.com/api/stripe", requireLogin,  async (req, res) => {
		// create charge for stripe
		const charge = await stripe.charges.create({
			amount: 500,
			currency: "usd",
			description: "$5 for 5 credits",
			source: req.body.id
		})
		req.user.credits += 5;
		const user = await req.user.save();

		// send data
		res.send(user);
	})
}