"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = require("../controllers/UserController");
var TokenController_1 = require("../controllers/TokenController");
var FollowingController_1 = require("../controllers/FollowingController");
var express_1 = require("express");
var RouteConstants_1 = require("../constants/RouteConstants");
var jwt = require("jsonwebtoken");
var cert = "private.key"; //set in .env
var ProfileRouter = /** @class */ (function () {
    function ProfileRouter() {
        var _this = this;
        this.follow = function (req, res) {
            FollowingController_1.default.follow(req.body.username, req.params.username).then(function (result) {
                if (result != null) {
                    return _this.profile(req, res);
                }
                else {
                    res.json({
                        status: 500,
                        message: 'Internal Error'
                    });
                }
            });
            return;
        };
        this.unfollow = function (req, res) {
            FollowingController_1.default.unfollow(req.body.username, req.params.username).then(function (result) {
                if (result != null) {
                    return _this.profile(req, res);
                }
                else {
                    res.json({
                        status: 500,
                        message: 'Internal Error'
                    });
                }
            });
            return;
        };
        this.profile = this.profile.bind(this);
        this.router = express_1.Router({ caseSensitive: true });
        this.setRoutes();
    }
    ProfileRouter.prototype.profile = function (req, res) {
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== "undefined") {
            var bearer = bearerHeader.split(" ");
            var bearerToken = bearer[1];
            jwt.verify(bearerToken, cert, function (err, data) {
                if (data) {
                    var profileFound = UserController_1.default.findProfile(req.params.username);
                    profileFound.then(function (profileFound) {
                        if (profileFound != null) {
                            var profile_1 = {
                                username: profileFound.username,
                                bio: profileFound.bio,
                                image: profileFound.image,
                                following: null
                            };
                            FollowingController_1.default
                                .isFollowing(data.username, profileFound.username)
                                .then(function (result) {
                                profile_1.following = result;
                                res.json({
                                    status: 200,
                                    profile: profile_1
                                });
                            })
                                .catch(function () {
                                res.json({
                                    status: 200,
                                    profile: profile_1
                                });
                            });
                        }
                        else {
                            res.json({
                                status: 404,
                                error: "No such Profile Found"
                            });
                        }
                    });
                }
                else if (err) {
                    res.sendStatus(403);
                }
            });
        }
        else {
            var profileFound = UserController_1.default.findProfile(req.params.username);
            profileFound.then(function (profileFound) {
                if (profileFound != null) {
                    var profile = {
                        username: profileFound.username,
                        bio: profileFound.bio,
                        image: profileFound.image
                    };
                    res.json({
                        status: 200,
                        profile: profile
                    });
                }
                else {
                    res.json({
                        status: 404,
                        error: "No such Profile Found"
                    });
                }
            });
        }
        return;
    };
    ProfileRouter.prototype.setRoutes = function () {
        this.router.get(RouteConstants_1.profiles + "/:username", this.profile);
        this.router.post(RouteConstants_1.profiles + "/:username/follow", TokenController_1.default.verifyToken, this.follow);
        this.router.delete(RouteConstants_1.profiles + "/:username/follow", TokenController_1.default.verifyToken, this.unfollow);
    };
    return ProfileRouter;
}());
var profileRouter = new ProfileRouter();
profileRouter.setRoutes();
exports.default = profileRouter.router;
//# sourceMappingURL=ProfileRoutes.js.map