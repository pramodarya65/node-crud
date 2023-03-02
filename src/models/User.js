var mongoose = require("mongoose");
var { isEmail } = require("validator");

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      set: (v) => v.toLowerCase(),
      validate: [isEmail, "invalid email"],
    },
    phone_number: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v);
        },
        message: "{VALUE} is not a valid 10 digit number!",
      },
    },
    date_of_birth: { type: Date, required: true },
    gender: { type: String, required: true },
  },
  { timestamps: true }
);

//Export model
module.exports = mongoose.model("User", UserSchema);
