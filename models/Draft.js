const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = require("./Recipient");

const draftSchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateDrafted: Date,
});

mongoose.model("drafts", draftSchema);