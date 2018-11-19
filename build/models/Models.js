var Sequelize = require("sequelize");
var db = require("../db");
// User Model
var User = db.define("user", {
    email: {
        type: Sequelize.STRING,
        required: true,
        unique: true
    },
    token: {
        type: Sequelize.STRING,
        required: true,
    },
    password: {
        type: Sequelize.STRING,
        required: true,
    },
    bio: Sequelize.STRING,
    image: Sequelize.STRING,
    username: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
        primaryKey: true
    },
});
//Tag Model
var Tag = db.define("tag", {
    body: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
    }
});
//Article odel
var Article = db.define("article", {
    slug: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
        allowNull: true,
    },
    title: {
        type: Sequelize.STRING,
        required: true
    },
    description: {
        type: Sequelize.STRING,
        required: true
    },
    body: {
        type: Sequelize.STRING,
        required: true
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    favoritesCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});
Article.addHook('beforeValidate', function (article, options) {
    article.slug = (article.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
});
//ArticleTag Model
var ArticleTag = db.define("article_tag", {});
User.hasMany(Article);
//Relations
Article.belongsToMany(Tag, { as: 'tags', through: ArticleTag });
Tag.belongsToMany(Article, { as: 'articles', through: ArticleTag });
module.exports = { User: User, Article: Article, Tag: Tag };
//# sourceMappingURL=Models.js.map