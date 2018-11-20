"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Article = require('../models/Models').Article;
var Favorite = require("../models/Models").Favorite;
var FavoriteStatus_1 = require("../constants/FavoriteStatus");
var FavoriteController = /** @class */ (function () {
    function FavoriteController() {
    }
    FavoriteController.prototype.favorite = function (user, slug) {
        return Favorite.findOne({
            where: { username: user, slug: slug }
        })
            .then(function (result) {
            if (result == null) {
                return Favorite.create({
                    username: user,
                    slug: slug
                })
                    .then(function (row) {
                    if (row) {
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
                return false;
            }
        })
            .catch(function () {
            return false;
        });
    };
    FavoriteController.prototype.unfavorite = function (user, slug) {
        return Favorite.findOne({
            where: { username: user, slug: slug }
        })
            .then(function (result) {
            if (result != null) {
                return Favorite.destroy({
                    where: {
                        username: user,
                        slug: slug
                    }
                }).then(function (row) {
                    if (row) {
                        return true;
                    }
                    else {
                        return false;
                    }
                })
                    .catch(function (err) {
                    console.log(err);
                    return false;
                });
            }
            else {
                return false;
            }
        })
            .catch(function (err) {
            console.log(err);
            return false;
        });
    };
    FavoriteController.prototype.updateArticleCount = function (slug, status) {
        return Article.findOne({ where: { slug: slug } }).then(function (option) {
            console.log(status, FavoriteStatus_1.default.FAVORITE, status == FavoriteStatus_1.default.FAVORITE);
            if (status == FavoriteStatus_1.default.FAVORITE)
                return option.increment('favoritesCount');
            else
                return option.decrement('favoritesCount');
        }).then(function (option) {
            return option.reload();
        }).then(function (option) {
            return option;
        }).catch(function (err) { return err; });
    };
    return FavoriteController;
}());
var favController = new FavoriteController();
exports.default = favController;
//# sourceMappingURL=FavoriteController.js.map