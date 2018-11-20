import tagController from "./TagController";
const User = require("../models/Models").User;
const Article = require("../models/Models").Article;

class ArticleController {
  constructor() {}

  isMyArticle(articleSlug, currentUser) {
    console.log(articleSlug + currentUser);
    return this.getArticle(articleSlug)
      .then(articleFound => {
        return currentUser == articleFound.userUsername;
      })
      .catch(err => {
        return err;
      });
  }

  saveToArticle(comment, slug){
    return Article.findOne({ where: { slug: slug } })
    .then(foundArticle => {
      foundArticle.addComment(comment.id).then(() => {});
    })
    .catch(err => {
      console.log(err);
      return err;
    });
  }

  getArticle(slug: string) {
    return Article.findOne({ where: { slug: slug } }).then(article => {
      let articleObject = article.get({ plain: true });
      return tagController
        .getTags(article)
        .then(tags => {
          articleObject.tagList = tags;
          return articleObject;
        })
        .catch(err => {
          console.log(err);
          return articleObject;
        });
    });
  }

  deleteArticle(slug: string) {
    return Article.destroy({
      where: { slug: slug }
    });
  }

  updateArticle(
    slug: string,
    title: string,
    description: string,
    body: string
  ) {
    return Article.update(
      { title: title, description: description, body: body },
      {
        where: { slug: slug }
      }
    )
      .then(() => {
        return Article.findOne({ where: { slug: slug } });
      })
      .catch(err => {
        return err;
      });
  }
  saveArticle(
    title: string,
    description: string,
    body: string,
    tagList: Array<string>
  ) {
    return Article.create({
      title: title,
      description: description,
      body: body
    })
      .then(article => {
        let articleObject = article.get({ plain: true });
        if (tagList) {
          for (const tag of tagList) {
            tagController
              .saveTag(tag)
              .then(saved => {
                article.addTag(saved.id).then(item => {});
              })
              .catch(err => {
                console.log(err);
              });
          }
          articleObject.tagList = tagList;
          return articleObject;
        } else {
          return articleObject;
        }
      })
      .then();
  }

  getFeed(currentUser) {
    return User.findOne({ where: { username: currentUser } })
      .then(user => {
        return user
          .getArticles()
          .then(articles => {
            return articles;
          })
          .catch(err => {
            return err;
          });
      })
      .catch(err => {
        return err;
      });
  }
}

let articleController = new ArticleController();
export default articleController;
