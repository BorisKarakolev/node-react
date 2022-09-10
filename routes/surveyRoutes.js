const mongoose = require("mongoose");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = mongoose.model("surveys");
const Draft = mongoose.model('drafts')

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.json(surveys);
  });

  app.get("/api/drafts", requireLogin, async (req, res) => {
    const drafts = await Draft.find({ _user: req.user.id })
    res.json(drafts);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.json("Thanks for voting!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ email, choice, surveyId }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
          }
        ).exec();
      })
      .value();

    res.json({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.json(user);
    } catch (err) {
      res.status(422).json(err);
    }
  });

  app.post("/api/drafts", requireLogin, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const draft = new Draft({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    try{
      await draft.save()
      res.status(200).json('Drafted')
    } catch (err) {
      res.status(400).json(err)
    }
  });

  app.delete("/api/delete-survey/:id", (req, res) => {
    Survey.deleteOne({ _id: req.params.id }, (err) => {
      if (err) return res.json({ message: "Something went wrong" });
      return;
    });
  });

  app.delete("/api/delete-draft/:id", (req, res) => {
    Draft.deleteOne({ _id: req.params.id }, (err) => {
      if (err) return res.json({ message: "Something went wrong" });
      return;
    });
  });
};
