"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tag = require("../models/Models").Tag;
var TagController = /** @class */ (function () {
    function TagController() {
    }
    TagController.prototype.getAllTags = function () {
        return Tag.findAll({}).then(function (tags) { return tags; }).catch(function (err) { return err; });
    };
    TagController.prototype.getTags = function (article) {
        return article.getTags().then(function (tags) {
            return tags;
        });
    };
    TagController.prototype.saveTag = function (tag) {
        return Tag.findOrCreate({
            where: {
                body: tag
            }
        }).spread(function (tagResult) {
            var tagObject = tagResult.get({ plain: true });
            return tagObject;
        }).catch(function (err) {
            return err;
        });
    };
    TagController.prototype.saveTagObject = function (tag) {
        return Tag.findOrCreate({
            where: {
                body: tag
            }
        }).then(function (tagResult) {
            return tagResult;
        }).catch(function (err) {
            console.log(err);
            return null;
        });
    };
    return TagController;
}());
var tagController = new TagController();
exports.default = tagController;
//# sourceMappingURL=TagController.js.map