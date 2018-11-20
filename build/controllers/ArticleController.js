"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var TagController_1 = require("./TagController");
var User = require("../models/Models").User;
var Article = require("../models/Models").Article;
var Following = require('../models/Models').Following;
var ArticleController = /** @class */ (function () {
    function ArticleController() {
    }
    ArticleController.prototype.isMyArticle = function (articleSlug, currentUser) {
        return this.getArticle(articleSlug)
            .then(function (articleFound) {
            return currentUser == articleFound.userUsername;
        })
            .catch(function (err) {
            return err;
        });
    };
    ArticleController.prototype.saveToArticle = function (comment, slug) {
        return Article.findOne({ where: { slug: slug } })
            .then(function (foundArticle) {
            foundArticle.addComment(comment.id).then(function () { });
        })
            .catch(function (err) {
            console.log(err);
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
    ArticleController.prototype.feed = function (username) {
        var _this = this;
        var articlesToReturn = [];
        return Following.findAll({ where: { followerName: username } }).then(function (rows) { return __awaiter(_this, void 0, void 0, function () {
            var _loop_1, _i, rows_1, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function (row) {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            Article.findAll({ where: { userUsername: row.followingName } }).then(function (articles) {
                                                articlesToReturn.push(articles);
                                                resolve(1);
                                            });
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, rows_1 = rows;
                        _a.label = 1;
                    case 1:
                        if (!(_i < rows_1.length)) return [3 /*break*/, 4];
                        row = rows_1[_i];
                        return [5 /*yield**/, _loop_1(row)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, articlesToReturn];
                }
            });
        }); });
    };
    ArticleController.prototype.updateArticle = function (slug, title, description, body) {
        return Article.update({ title: title, description: description, body: body }, {
            where: { slug: slug }
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
                        return err;
                    });
                }
                articleObject.tagList = tagList;
                return articleObject;
            }
            else {
                return articleObject;
            }
        })
            .catch(function (err) {
            console.log(err);
            return err;
        });
    };
    ArticleController.prototype.getMyArticles = function (currentUser) {
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