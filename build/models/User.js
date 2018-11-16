var Sequelize = require("sequelize");
var db = require("../db");
// User Model
var User = db.define("user", {
    email: {
        type: Sequelize.STRING,
        required: true,
        unique: true
    },
    token: {
        type: Sequelize.STRING,
        required: true,
    },
    password: {
        type: Sequelize.STRING,
        required: true,
    },
    bio: Sequelize.STRING,
    image: Sequelize.STRING,
    username: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
        primaryKey: true
    },
});
module.exports = User;
//# sourceMappingURL=User.js.map