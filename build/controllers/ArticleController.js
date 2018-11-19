"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TagController_1 = require("./TagController");
var User = require("../models/Models").User;
var Article = require("../models/Models").Article;
var ArticleController = /** @class */ (function () {
    function ArticleController() {
    }
    ArticleController.prototype.isMyArticle = function (articleSlug, currentUser) {
        console.log(articleSlug + currentUser);
        return this.getArticle(articleSlug)
            .then(function (articleFound) {
            return currentUser == articleFound.userUsername;
        })
            .catch(function (err) {
            return err;
        });
    };
    ArticleController.prototype.getArticle = function (slug) {
        return Article.findOne({ where: { slug: slug } }).then(function (article) {
            var articleObject = article.get({ plain: true });
            return TagController_1.default
                .getTags(article)
                .then(function (tags) {
                articleObject.tagList = tags;
                return articleObject;
            })
                .catch(function (err) {
                console.log(err);
                return articleObject;
            });
        });
    };
    ArticleController.prototype.deleteArticle = function (slug) {
        return Article.destroy({
            where: { slug: slug }
        });
    };
    ArticleController.prototype.updateArticle = function (slug, title, description, body) {
        return Article.update({ title: title, description: description, body: body }, {
            where: { slug: slug },
        })
            .then(function () {
            return Article.findOne({ where: { slug: slug } });
        })
            .catch(function (err) {
            return err;
        });
    };
    ArticleController.prototype.saveArticle = function (title, description, body, tagList) {
        return Article.create({
            title: title,
            description: description,
            body: body
        })
            .then(function (article) {
            var articleObject = article.get({ plain: true });
            if (tagList) {
                for (var _i = 0, tagList_1 = tagList; _i < tagList_1.length; _i++) {
                    var tag = tagList_1[_i];
                    TagController_1.default
                        .saveTag(tag)
                        .then(function (saved) {
                        article.addTag(saved.id).then(function (item) { });
                    })
                        .catch(function (err) {
                        console.log(err);
                    });
                }
                articleObject.tagList = tagList;
                return articleObject;
            }
            else {
                return articleObject;
            }
        })
            .then();
    };
    ArticleController.prototype.getFeed = function (currentUser) {
        return User.findOne({ where: { username: currentUser } })
            .then(function (user) {
            return user
                .getArticles()
                .then(function (articles) {
                return articles;
            })
                .catch(function (err) {
                return err;
            });
        })
            .catch(function (err) {
            return err;
        });
    };
    return ArticleController;
}());
var articleController = new ArticleController();
exports.default = articleController;
//# sourceMappingURL=ArticleController.js.map