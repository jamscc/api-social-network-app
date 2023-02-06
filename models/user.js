const { model, Schema } = require('mongoose');

const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

const prt = {
  username: { type: String, unique: true, trim: true, required: true },
  email: { type: String, unique: true, trim: true, required: true, match: [re, 'not valid - please check {VALUE}'] },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'thoughts' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'users' }]
};

const opt = { versionKey: false, toJSON: { virtuals: true }, id: false };

// Users Schema
const UsersSchema = new Schema(prt, opt);

// virtual - friendCount 
const vr = 'friendCount';
const fn = function () {
  const { length } = this.friends;
  const friendCount = length.toString();
  return friendCount;
};
UsersSchema.virtual(vr).get(fn);

// users model
const Users = model('users', UsersSchema);

module.exports = Users;