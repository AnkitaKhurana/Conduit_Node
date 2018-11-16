"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenController_1 = require("../controllers/TokenController");
var User = require("../models/User");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.findUser = function (email) {
        return User.findOne({ where: { email: email } })
            .then(function (user) {
            return user;
        })
            .then(function (user) {
            var userObject = user.get({ plain: true });
            return userObject;
        })
            .catch(function () {
            return null;
        });
    };
    UserController.prototype.findProfile = function (username) {
        return User.findOne({ where: { username: username } })
            .then(function (user) {
            return user;
        })
            .then(function (user) {
            var userObject = user.get({ plain: true });
            return userObject;
        })
            .catch(function () {
            return null;
        });
    };
    UserController.prototype.updateUser = function (userModel) {
        userModel.updatedAt = Date.now;
        return User.update(userModel, { where: { email: userModel.email } });
    };
    UserController.prototype.login = function (email, password) {
        return User.findOne({ where: { email: email, password: password } })
            .then(function (user) {
            user.token = TokenController_1.default.generateToken(user.email, user.username);
            return user;
        })
            .then(function (user) {
            var userObject = user.get({ plain: true });
            return userObject;
        })
            .catch(function (err) {
            return err;
        });
    };
    UserController.prototype.register = function (email, username, password) {
        return User.findOne({ where: { email: email } })
            .then(function (user) {
            if (user != null) {
                return null;
            }
            else {
                return User.create({
                    username: username,
                    email: email,
                    password: password,
                    token: TokenController_1.default.generateToken(email, username)
                })
                    .then(function (user) {
                    var userObject = user.get({ plain: true });
                    return userObject;
                })
                    .catch(function (err) {
                    return err;
                })
                    .catch(function (err) {
                    return err;
                });
            }
        })
            .catch(function (err) {
            return err;
        });
    };
    return UserController;
}());
var userController = new UserController();
exports.default = userController;
//# sourceMappingURL=UserController.js.map