// var Sequelize = require("sequelize");
// var db = require("../db");
// // var article = require("../models/Article");
// // import article from '../models/Article';
// // User Model
// const User = db.define("user", {
//   email: {
//     type: Sequelize.STRING,
//     required: true,
//     unique: true
//   },
//   token: {
//     type: Sequelize.STRING,
//     required: true,
//   },
//   password: {
//     type: Sequelize.STRING,
//     required: true,
//   },
//   bio: Sequelize.STRING,
//   image: Sequelize.STRING,
//   username: {
//     type: Sequelize.STRING,
//     required: true,
//     unique: true,
//     primaryKey: true
//   },
// });
// const Tag = db.define("tag", {
//   body: {
//     type: Sequelize.STRING,
//     required: true
//   } 
// });
// const Article = db.define("article", {
//   slug: {
//       type: Sequelize.STRING,
//       required: true
//   },
//   title: {
//       type: Sequelize.STRING,
//       required: true
//   },
//   description: {
//       type: Sequelize.STRING,
//       required: true
//   },
//   body: {
//       type: Sequelize.STRING,
//       required: true
//   },
//   createdAt: {
//       type: Sequelize.DATE,
//       defaultValue: Sequelize.NOW
//   },
//   updatedAt: {
//       type: Sequelize.DATE,
//       defaultValue: Sequelize.NOW
//   },
//   favoritesCount: {
//       type: Sequelize.INTEGER
//   }
// });
// Article.addHook('beforeCreate', (article, options) => {
//   article.slug  = (this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36); 
// });
// Article.hasMany(Tag);
// User.hasMany( Article );
// Tag.hasMany(Article);
// // export default User;
// module.exports = {User, Article,Tag};
//# sourceMappingURL=User.js.map