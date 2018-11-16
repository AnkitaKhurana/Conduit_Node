var Sequelize = require("sequelize");
var db = require("../db");

// Following Model
const Following = db.define("following", {
  followerName: {
    type: Sequelize.STRING,
    required: true
  },
  followingName: {
    type: Sequelize.STRING,
    required: true
  } 
});

module.exports = Following;
