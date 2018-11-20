import tokenController from "../controllers/TokenController";
import commentController from "../controllers/CommentController";
import { Request, Response, Router } from "express";
import { articles } from "../constants/RouteConstants";
import articleController from "../controllers/ArticleController";
import userController from "../controllers/UserController";

class ArticleRoutes {
  public router: Router;

  constructor() {
    this.router = Router({ caseSensitive: true });
    this.setRoutes();
  }

  saveComment = (req: Request, res: Response) => {
    return commentController
      .saveComment(req.body.body)
      .then(comment => {
        articleController
          .saveToArticle(comment, req.params.slug)
          .then(() => {
            userController
              .saveCommentToUser(comment, req.body.token)
              .then(() => {
                res.json({
                  status: 200,
                  comment
                });
              })
              .catch(err => {
                res.json({
                  status: 400,
                  err
                });
              });
          })
          .catch(err => {
            res.json({
              status: 400,
              err
            });
          });
      })
      .catch(err => {
        res.json({
          err,
          status: 400
        });
      });
  };

  public setRoutes() {
    // this.router.get(articles + '/feed', tokenController.verifyToken, this.feed);
    // this.router.get(articles + "/:slug", this.getArticle);
    // this.router.put(articles + '/:slug', tokenController.verifyToken, this.updateArticle);
    this.router.post(
      articles + "/:slug" + "/comments",
      tokenController.verifyToken,
      this.saveComment
    );
    // this.router.delete(articles + "/:slug", tokenController.verifyToken, this.deleteArticle);
    //   this.router.get(profiles + "/:username", this.profile);
  }
}

const commentRoutes = new ArticleRoutes();
commentRoutes.setRoutes();
export default commentRoutes.router;
