const mongoose = require("mongoose");
const timestapsOption = {
  timestamps: { createdAt: "created_at" },
};
const GroupCreate = new mongoose.Schema(
  {
    onwerId: String,
    groupName: String,
    memberEmail: String,
    messages: [
      {
        memberId: String,
        text: String,
      },
    ],
    addMembers: [
      {
        userId: String,
        name: String,
        email: String,
        avatar: String,
        role: String,
      },
    ],

    text: String,
    date: Date,
  },
  timestapsOption
);

const MemberGroups = mongoose.model("GroupCreate", GroupCreate);

module.exports = MemberGroups;
