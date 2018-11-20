"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Following = require("../models/Models").Following;
var FollowingController = /** @class */ (function () {
    function FollowingController() {
    }
    FollowingController.prototype.isFollowing = function (followerName, followingName) {
        return Following.findOne({
            where: { followerName: followerName, followingName: followingName }
        })
            .then(function (result) {
            if (result != null) {
                return true;
            }
            else {
                return false;
            }
        })
            .catch(function () {
            return false;
        });
    };
    FollowingController.prototype.follow = function (followerName, followingName) {
        return Following.findOne({
            where: { followerName: followerName, followingName: followingName }
        })
            .then(function (result) {
            if (result == null) {
                return Following.create({
                    followerName: followerName,
                    followingName: followingName
                })
                    .then(function (row) {
                    return row;
                })
                    .then(function (user) {
                    var userObject = user.get({ plain: true });
                    return userObject;
                })
                    .then(function (user) {
                    if (user) {
                        return true;
                    }
                    else {
                        return false;
                    }
                })
                    .catch(function () {
                    return false;
                });
            }
            else {
                return true;
            }
        })
            .catch(function () {
            return false;
        });
    };
    FollowingController.prototype.unfollow = function (followerName, followingName) {
        return Following.findOne({
            where: { followerName: followerName, followingName: followingName }
        })
            .then(function (result) {
            if (result != null) {
                return Following.destroy({
                    where: { followerName: followerName, followingName: followingName }
                })
                    .then(function (user) {
                    if (user) {
                        return true;
                    }
                    else {
                        return false;
                    }
                })
                    .catch(function () {
                    return false;
                });
            }
            else {
                return true;
            }
        })
            .catch(function () {
            return false;
        });
    };
    return FollowingController;
}());
var followingController = new FollowingController();
exports.default = followingController;
//# sourceMappingURL=FollowingController.js.map