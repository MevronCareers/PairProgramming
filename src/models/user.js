const { boolean } = require("joi");
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      unique: true,
    },
    email: {
      type: String,
      match:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      required: "Email is required",
      unique: true,
    },
    role: {
      type: String,
      enum: ["driver", "admin", "customer"],
      default: "driver",
      required: "User role is required",
    },
    status: {
      type: Boolean,
      default: true,
    },
    dp: { type: String },
    password: {
      type: String,
      required: "Password is required",
      minlength: [8, "Password should be less than 8 characters"],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    vehicleState: {
      type: String,
    },
    noofVehicles: {
      type: String,
    },
    phone: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    verifiedEmail: { type: Boolean, default: false },
    verifyMailToken: { token: String, expires: Date },
    created: {
      type: Date,
      default: Date.now(),
    },
    stats: {
      amountEarned: { type: Number },
      completedRides: { type: Number },
      cancelRides: { type: Number },
      noOfRidess: { type: Number },
    },
    login: {
      count: {
        type: Number,
        default: 0,
      },
    },
    verification: {
      userProfile: { type: Boolean, default: false },
      bank: { type: Boolean, default: false },
      bvn: { type: Boolean, default: false },
      license: { type: Boolean, default: false },
    },
  },
  {
    collection: "users",
  }
);

/**
 * @param {Array} ids, string of user ids
 * @return {Array of Objects} users list
 */
UserSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("User", UserSchema, "users");