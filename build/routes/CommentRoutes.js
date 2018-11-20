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
        // this.router.get(articles + '/feed', tokenController.verifyToken, this.feed);
        // this.router.get(articles + "/:slug", this.getArticle);
        // this.router.put(articles + '/:slug', tokenController.verifyToken, this.updateArticle);
        this.router.post(RouteConstants_1.articles + "/:slug" + "/comments", TokenController_1.default.verifyToken, this.saveComment);
        // this.router.delete(articles + "/:slug", tokenController.verifyToken, this.deleteArticle);
        //   this.router.get(profiles + "/:username", this.profile);
    };
    return ArticleRoutes;
}());
var commentRoutes = new ArticleRoutes();
commentRoutes.setRoutes();
exports.default = commentRoutes.router;
//# sourceMappingURL=CommentRoutes.js.map