const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRECT_KEY = "abcdefghijklmnop";

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String, required: true, trim: true,
  },
  regNo: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  hostelOrDayScholar: { type: String, require: true },
  profileImgPath: {
    type: String,
    default: null,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

// token generate
userSchema.methods.generateAuthtoken = async function () {
  try {
    // Remove existing tokens
    this.tokens = [];

    let newtoken = jwt.sign({ _id: this._id }, SECRECT_KEY, {
      expiresIn: "1h", // 1h set's the expiration to 1 hour ( 30m for 30 minutes)
    });

    // Add the new token
    this.tokens = this.tokens.concat({ token: newtoken });

    await this.save();
    return newtoken;
  } catch (error) {
    res.status(400).json(error);
  }
};

// creating model
const users = new mongoose.model("users", userSchema);

module.exports = users;
