"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Article = require("../models/Models").Article;
var Comment = require("../models/Models").ArticleComment;
var CommentController = /** @class */ (function () {
    function CommentController() {
    }
    CommentController.prototype.saveComment = function (body) {
        return Comment.create({ body: body }).then(function (comment) {
            return comment;
        }).catch(function (err) { return err; });
    };
    CommentController.prototype.getComments = function (slug) {
        return Article.findOne({ where: { slug: slug } }).then(function (article) {
            return article.getComments().then(function (comments) {
                return comments;
            }).catch(function (err) { return err; });
        }).catch(function (err) { return err; });
    };
    CommentController.prototype.deleteComment = function (slug, id) {
        return Comment.destroy({
            where: { id: id }
        });
    };
    CommentController.prototype.isMyComment = function (id, currentUser) {
        return Comment.findOne({ where: { id: id } }).then(function (comment) {
            return (comment.userUsername == currentUser);
        }).catch(function (err) { return err; });
    };
    return CommentController;
}());
var commentController = new CommentController();
exports.default = commentController;
//# sourceMappingURL=CommentController.js.map