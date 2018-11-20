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

  getComments = (req: Request, res: Response) => {
    return commentController
      .getComments(req.params.slug)
      .then(comments => {
        res.json({
          status: 200,
          comments
        });
      })
      .catch(error => {
        res.json({
          status: 400,
          error
        });
      });
  };

  deleteComment = (req: Request, res: Response) => {
    let currentUser = req.body.token;
    let id = req.params.id;
    return commentController
      .isMyComment(id, currentUser)
      .then(result => {
        if (result) {
          return commentController
            .deleteComment(req.params.slug, req.params.id)
            .then(comment => {
              if (comment >= 1) {
                res.json({
                  status: 200,
                  message: "Deleted"
                });
              } else {
                res.json({
                  status: 404,
                  error: "No such Comment found"
                });
              }
            })
            .catch(err => {
              res.json({
                status: 400,
                err
              });
            });
        } else {
          res.json({
            status: 401,
            error: "Unauthorised"
          });
        }
      })
      .catch(err => {
        res.json({
          status: 400,
          err
        });
      });
  };

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
    this.router.get(articles + "/:slug" + "/comments", this.getComments); // this.router.get(articles + "/:slug", this.getArticle);
    this.router.delete(
      articles + "/:slug/comments/:id",
      tokenController.verifyToken,
      this.deleteComment
    );
    this.router.post(
      articles + "/:slug" + "/comments",
      tokenController.verifyToken,
      this.saveComment
    );
  }
}

const commentRoutes = new ArticleRoutes();
commentRoutes.setRoutes();
export default commentRoutes.router;
