const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    minlength: [4, "Username must be at least 4 characters long."],
    maxlength: [20, "Username cannot exceed 20 characters."],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [6, "Password must be at least 6 characters long."]
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Please enter a valid email address."
    }
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required."],
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number."]
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
},
{
  timestamps: true
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
