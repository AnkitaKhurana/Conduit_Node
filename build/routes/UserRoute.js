"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("../controllers/UserController");
var TokenController_1 = require("../controllers/TokenController");
var express_1 = require("express");
var RouteConstants_1 = require("../constants/RouteConstants");
var UserRouter = /** @class */ (function () {
    function UserRouter() {
        this.router = express_1.Router({ caseSensitive: true });
        this.setRoutes();
    }
    UserRouter.prototype.login = function (req, res) {
        if (req.body.username == null || req.body.password == null) {
            res.json({
                status: 422
            });
            return;
        }
        var loggedIn = UserController_1.default.login(req.body.username, req.body.password);
        loggedIn
            .then(function (result) {
            if (result != null) {
                res.json({
                    status: 200,
                    user: result
                });
            }
            else {
                res.json({
                    status: 401,
                    user: result
                });
            }
        })
            .catch(function (err) {
            res.json({
                status: 400,
                error: err
            });
        });
    };
    UserRouter.prototype.register = function (req, res) {
        if (req.body.username == null ||
            req.body.password == null ||
            req.body.email == null) {
            res.json({
                status: 422
            });
            return;
        }
        var result = UserController_1.default.register(req.body.email, req.body.username, req.body.password);
        result
            .then(function (result) {
            if (result != null) {
                res.json({
                    status: 200,
                    user: result
                });
            }
            else {
                res.json({
                    status: 401,
                    message: "Credentials already exist",
                    user: result
                });
            }
        })
            .catch(function (err) {
            res.json({
                status: 400,
                message: "Error" + err.name
            });
        });
    };
    UserRouter.prototype.current = function (req, res) {
        var userfound = UserController_1.default.findUser(req.body.token);
        userfound
            .then(function (user) {
            res.json({
                status: 200,
                user: user
            });
        })
            .catch(function (err) {
            res.json({
                status: 400,
                message: "Error" + err.name
            });
        });
        return;
    };
    UserRouter.prototype.update = function (req, res) {
        var userfound = UserController_1.default.findUser(req.body.token);
        userfound
            .then(function (user) {
            if (req.body.password) {
                user.password = req.body.password;
            }
            if (req.body.bio) {
                user.bio = req.body.bio;
            }
            if (req.body.image) {
                user.image = req.body.image;
            }
            var updated = UserController_1.default.updateUser(user);
            updated
                .then(function () {
                return res.json({
                    status: 200,
                    user: user
                });
            })
                .catch(function (error) {
                return res.json({
                    status: 400,
                    error: error
                });
            });
        })
            .catch(function (err) {
            return res.json({
                status: 400,
                message: "Error" + err.name
            });
        });
        return;
    };
    UserRouter.prototype.setRoutes = function () {
        this.router.post(RouteConstants_1.users + "/login", this.login);
        this.router.post(RouteConstants_1.users + "/", this.register);
        this.router.get(RouteConstants_1.user, TokenController_1.default.verifyToken, this.current);
        this.router.put(RouteConstants_1.user, TokenController_1.default.verifyToken, this.update);
    };
    return UserRouter;
}());
var userRouter = new UserRouter();
userRouter.setRoutes();
exports.default = userRouter.router;
//# sourceMappingURL=UserRoute.js.map