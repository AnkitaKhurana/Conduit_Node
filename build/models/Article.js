// var Sequelize = require("sequelize");
// var db = require("../db");
// var tag = require('../models/Tag');
// // import * as Tag from '../models/Tag';
// // Article Model
// const Article = db.define("article", {
//     slug: {
//         type: Sequelize.STRING,
//         required: true
//     },
//     title: {
//         type: Sequelize.STRING,
//         required: true
//     },
//     description: {
//         type: Sequelize.STRING,
//         required: true
//     },
//     body: {
//         type: Sequelize.STRING,
//         required: true
//     },
//     createdAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW
//     },
//     updatedAt: {
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW
//     },
//     favoritesCount: {
//         type: Sequelize.INTEGER
//     }
// });
// Article.hook('beforeCreate', (article, options) => {
//     article.slug  = (this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36); 
// });
// Article.hasMany(tag, {as: 'Tags'});
// //module.exports = Article;
// export default Article;
//# sourceMappingURL=Article.js.map