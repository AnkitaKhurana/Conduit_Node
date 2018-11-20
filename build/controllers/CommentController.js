"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Comment = require("../models/Models").ArticleComment;
var CommentController = /** @class */ (function () {
    function CommentController() {
    }
    CommentController.prototype.saveComment = function (body) {
        return Comment.create({ body: body }).then(function (comment) {
            return comment;
        }).catch(function (err) { return err; });
    };
    return CommentController;
}());
var commentController = new CommentController();
exports.default = commentController;
//# sourceMappingURL=CommentController.js.map