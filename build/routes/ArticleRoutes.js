"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenController_1 = require("../controllers/TokenController");
var express_1 = require("express");
var RouteConstants_1 = require("../constants/RouteConstants");
var ArticleController_1 = require("../controllers/ArticleController");
var UserController_1 = require("../controllers/UserController");
var ArticleRoutes = /** @class */ (function () {
    function ArticleRoutes() {
        this.getArticle = function (req, res) {
            ArticleController_1.default.getArticle(req.params.slug).then(function (article) {
                res.json({
                    status: 200,
                    article: article
                });
            })
                .catch(function (err) {
                res.json({
                    status: 400,
                    err: err
                });
            });
            return;
        };
        this.deleteArticle = function (req, res) {
            var currentUser = req.body.token;
            var slug = req.params.slug;
            ArticleController_1.default.isMyArticle(slug, currentUser).then(function (result) {
                if (result) {
                    ArticleController_1.default.deleteArticle(slug).then(function (deletedRows) {
                        if (deletedRows >= 1) {
                            res.json({
                                status: 200,
                            });
                        }
                        else {
                            res.json({
                                status: 404,
                                error: 'No Such Article Found'
                            });
                        }
                    }).catch(function (err) { return err; });
                }
                else {
                    res.json({
                        status: 401,
                        error: 'Unauthorized'
                    });
                }
            }).catch(function (err) {
                res.json({
                    status: 400,
                    err: err
                });
            });
            return;
        };
        this.updateArticle = function (req, res) {
            ArticleController_1.default.updateArticle(req.params.slug, req.body.title, req.body.description, req.body.body)
                .then(function (article) {
                res.json({
                    status: 200,
                    article: article
                });
            }).catch(function (err) {
                res.json({
                    status: 400,
                    err: err
                });
            });
            return;
        };
        this.myArticles = function (req, res) {
            var currentUser = req.body.token;
            ArticleController_1.default.getMyArticles(currentUser)
                .then(function (articles) {
                res.json({
                    status: 200,
                    articles: articles
                });
            }).catch(function (err) {
                res.json({
                    status: 400,
                    err: err
                });
            });
            return;
        };
        this.feed = function (req, res) {
            var currentUser = req.body.token;
            ArticleController_1.default.feed(currentUser)
                .then(function (articles) {
                res.json({
                    status: 200,
                    articles: articles
                });
            }).catch(function (err) {
                res.json({
                    status: 400,
                    err: err
                });
            });
            return;
        };
        this.saveArticle = function (req, res) {
            if (req.body.title == null ||
                req.body.description == null ||
                req.body.body == null) {
                res.json({
                    status: 422
                });
                return;
            }
            else {
                ArticleController_1.default.saveArticle(req.body.title, req.body.description, req.body.body, req.body.tagList)
                    .then(function (article) {
                    UserController_1.default.saveToUser(article, req.body.token).then(function () {
                        res.json({
                            status: 200,
                            article: article
                        });
                    });
                }).catch(function (err) {
                    res.json({
                        status: 400,
                        err: err
                    });
                });
                return;
            }
        };
        this.router = express_1.Router({ caseSensitive: true });
        this.setRoutes();
    }
    ArticleRoutes.prototype.setRoutes = function () {
        this.router.get(RouteConstants_1.articles + '/feed', TokenController_1.default.verifyToken, this.feed);
        this.router.get(RouteConstants_1.articles + '/myArticles', TokenController_1.default.verifyToken, this.myArticles);
        this.router.get(RouteConstants_1.articles + "/:slug", this.getArticle);
        this.router.put(RouteConstants_1.articles + '/:slug', TokenController_1.default.verifyToken, this.updateArticle);
        this.router.post(RouteConstants_1.articles, TokenController_1.default.verifyToken, this.saveArticle);
        this.router.delete(RouteConstants_1.articles + "/:slug", TokenController_1.default.verifyToken, this.deleteArticle);
    };
    return ArticleRoutes;
}());
var articleRouter = new ArticleRoutes();
articleRouter.setRoutes();
exports.default = articleRouter.router;
//# sourceMappingURL=ArticleRoutes.js.map