const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin.js");
const requireCredits = require("../middlewares/requireCredits.js");
const Mailer = require("../services/mailer.js");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate.js");

const Survey = mongoose.model("surveys");

module.exports = (app) => {
	
	app.get("/api/surveys/thanks", (req, res) => {
		res.send("Thanks for voting!");
	})

	app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		})

		// MAILER - send an email
		try {
			const mailer = new Mailer(survey, surveyTemplate(survey));
			await mailer.send();
			await mailer.save();
			req.users.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});

}