const { Types, Schema } = require('mongoose');

const prt = {
    reactionId: { type: Schema.Types.ObjectId, default: idNew },
    reactionBody: { type: String, required: true, minlength: 1, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: formatDate }
};

function idNew() {
    return new Types.ObjectId()
};

// format - createdAt
function formatDate(createdAt) {
    const t = new Date(createdAt);
    return t.toUTCString();
};

const opt = { versionKey: false, toJSON: { getters: true }, id: false };

// Reaction Schema
const ReactionSchema = new Schema(prt, opt);

module.exports = ReactionSchema;