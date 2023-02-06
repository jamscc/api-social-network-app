const Reaction = require('./reaction');
const { model, Schema } = require('mongoose');

const prt = {
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now, get: formatDate },
    username: { type: String, required: true },
    reactions: [Reaction]
};

const opt = { versionKey: false, toJSON: { getters: true, virtuals: true }, id: false };

// Thoughts Schema
const ThoughtsSchema = new Schema(prt, opt);

// format - createdAt
function formatDate(createdAt) {
    const t = new Date(createdAt);
    return t.toUTCString();
};

// virtual - reactionCount
const vr = 'reactionCount';
const fn = function () {
    const { length } = this.reactions;
    const reactionCount = length.toString();
    return reactionCount;
};
ThoughtsSchema.virtual(vr).get(fn);

// thoughts model
const Thoughts = model('thoughts', ThoughtsSchema);

module.exports = Thoughts;