const Comment = require("../models/Models").ArticleComment;

class CommentController {
  constructor() {}

  saveComment(body){
      return Comment.create({body:body}).then(comment=>{
          return comment;
      }).catch(err=>{return err});
  }

}

let commentController = new CommentController();
export default commentController;
