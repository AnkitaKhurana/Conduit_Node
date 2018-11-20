import { users } from "../constants/RouteConstants";

var Sequelize = require("sequelize");
var db = require("../db");

// User Model
const User = db.define("user", {
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


// Following Model
const Following = db.define("following", {
    followerName: {
      type: Sequelize.STRING,
      required: true
    },
    followingName: {
      type: Sequelize.STRING,
      required: true
    } 
  });


  

// Favorites Model
const Favorite = db.define("favorites", {
    username: {
      type: Sequelize.STRING,
      required: true
    },
    slug: {
      type: Sequelize.STRING,
      required: true
    } 
  });

//Tag Model
const Tag = db.define("tag", {
    body: {
        type: Sequelize.STRING,
        required: true,
        unique: true,
    }
});


//Comment Model
const ArticleComment = db.define("comment", {
    body: {
        type: Sequelize.STRING,
        required: true
    }
});


//Article Model
const Article = db.define("article", {
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

Article.addHook('beforeValidate', (article, options) => {
    article.slug = (article.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
});


//ArticleTag Model
const ArticleTag = db.define("article_tag", {});


User.hasMany(Article);
Article.hasMany(ArticleComment);
User.hasMany(ArticleComment);

//Relations
Article.belongsToMany(Tag, { as: 'tags', through: ArticleTag });
Tag.belongsToMany(Article, { as: 'articles', through: ArticleTag });
module.exports = { User, Article, Tag , Following, ArticleComment,Favorite};
