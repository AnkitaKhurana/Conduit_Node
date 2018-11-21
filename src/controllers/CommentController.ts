const Article = require("../models/Models").Article;
const Comment = require("../models/Models").ArticleComment;

class CommentController {
  constructor() { }

  saveComment(body) {
    return Comment.create({ body: body })
      .then(comment => {
        return comment;
      })
      .catch(err => {
        return err;
      });
  }

  getComments(slug) {
    return Article.findOne({ where: { slug: slug } })
      .then(article => {
        return article
          .getComments()
          .then(comments => {
            return comments;
          })
          .catch(err => {
            return err;
          });
      })
      .catch(err => {
        return err;
      });
  }

  deleteComment(slug, id) {
    return Comment.destroy({
      where: { id: id }
    });
  }

  isMyComment(id, currentUser) {
    return Comment.findOne({ where: { id: id } })
      .then(comment => {
        return comment.userUsername == currentUser;
      })
      .catch(err => {
        return err;
      });
  }
}

let commentController = new CommentController();
export default commentController;
