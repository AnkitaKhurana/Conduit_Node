"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TokenController_1 = require("../controllers/TokenController");
var CommentController_1 = require("../controllers/CommentController");
var express_1 = require("express");
var RouteConstants_1 = require("../constants/RouteConstants");
var ArticleController_1 = require("../controllers/ArticleController");
var UserController_1 = require("../controllers/UserController");
var ArticleRoutes = /** @class */ (function () {
    function ArticleRoutes() {
        this.getComments = function (req, res) {
            return CommentController_1.default.getComments(req.params.slug).then(function (comments) {
                res.json({
                    status: 200,
                    comments: comments
                });
            }).catch(function (error) {
                res.json({
                    status: 400,
                    error: error
                });
            });
        };
        this.deleteComment = function (req, res) {
            var currentUser = req.body.token;
            var id = req.params.id;
            return CommentController_1.default.isMyComment(id, currentUser).then(function (result) {
                if (result) {
                    return CommentController_1.default.deleteComment(req.params.slug, req.params.id).then(function (comment) {
                        if (comment >= 1) {
                            res.json({
                                status: 200,
                                message: 'Deleted'
                            });
                        }
                        else {
                            res.json({
                                status: 404,
                                error: 'No such Comment found'
                            });
                        }
                    }).catch(function (err) {
                        res.json({
                            status: 400,
                            err: err
                        });
                    });
                }
                else {
                    res.json({
                        status: 401,
                        error: 'Unauthorised'
                    });
                }
            }).catch(function (err) {
                res.json({
                    status: 400,
                    err: err
                });
            });
        };
        this.saveComment = function (req, res) {
            return CommentController_1.default
                .saveComment(req.body.body)
                .then(function (comment) {
                ArticleController_1.default
                    .saveToArticle(comment, req.params.slug)
                    .then(function () {
                    UserController_1.default
                        .saveCommentToUser(comment, req.body.token)
                        .then(function () {
                        res.json({
                            status: 200,
                            comment: comment
                        });
                    })
                        .catch(function (err) {
                        res.json({
                            status: 400,
                            err: err
                        });
                    });
                })
                    .catch(function (err) {
                    res.json({
                        status: 400,
                        err: err
                    });
                });
            })
                .catch(function (err) {
                res.json({
                    err: err,
                    status: 400
                });
            });
        };
        this.router = express_1.Router({ caseSensitive: true });
        this.setRoutes();
    }
    ArticleRoutes.prototype.setRoutes = function () {
        this.router.get(RouteConstants_1.articles + "/:slug" + "/comments", this.getComments); // this.router.get(articles + "/:slug", this.getArticle);
        this.router.delete(RouteConstants_1.articles + '/:slug/comments/:id', TokenController_1.default.verifyToken, this.deleteComment);
        this.router.post(RouteConstants_1.articles + "/:slug" + "/comments", TokenController_1.default.verifyToken, this.saveComment);
    };
    return ArticleRoutes;
}());
var commentRoutes = new ArticleRoutes();
commentRoutes.setRoutes();
exports.default = commentRoutes.router;
//# sourceMappingURL=CommentRoutes.js.map