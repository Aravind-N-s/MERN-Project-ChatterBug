const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const sh = require("shorthash");

const chatGroupSchema = new Schema({
  groupName: {
    type: String,
    minlength: 5,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  participents: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  chatGroupID: {
    type: String,
    index: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

chatGroupSchema.pre("save", function(next) {
  const chatGroup = this;
  if (chatGroup.isNew) {
    const hashValue = `${chatGroup.groupName}${chatGroup.createdBy}`;
    chatGroup.chatGroupID = sh.unique(hashValue);
    chatGroup.participents.push(chatGroup.createdBy)
    next();
  } else {
    next();
  }
});

chatGroupSchema.plugin(uniqueValidator, { message: `{PATH} Already Exists` });

const ChatGroup = mongoose.model("ChatGroup", chatGroupSchema);

module.exports = {
  ChatGroup
};
