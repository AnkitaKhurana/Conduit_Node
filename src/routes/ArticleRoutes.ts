import tokenController from "../controllers/TokenController";
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

  /*********************************************************************************/
  /*****************************Function to get Artice******************************/
  /*********************************************************************************/
  getArticle = (req: Request, res: Response) => {
    articleController
      .getArticle(req.params.slug)
      .then(article => {
        res.json({
          status: 200,
          article
        });
      })
      .catch(err => {
        res.json({
          status: 400,
          err
        });
      });
    return;
  };

  /*********************************************************************************/
  /***************************Function to delete Article****************************/
  /*********************************************************************************/
  deleteArticle = (req: Request, res: Response) => {
    let currentUser = req.body.token;
    let slug = req.params.slug;
    articleController
      .isMyArticle(slug, currentUser)
      .then(result => {
        if (result) {
          articleController
            .deleteArticle(slug)
            .then(deletedRows => {
              if (deletedRows >= 1) {
                res.json({
                  status: 200
                });
              } else {
                res.json({
                  status: 404,
                  error: "No Such Article Found"
                });
              }
            })
            .catch(err => {
              return err;
            });
        } else {
          res.json({
            status: 401,
            error: "Unauthorized"
          });
        }
      })
      .catch(err => {
        res.json({
          status: 400,
          err
        });
      });

    return;
  };

  /*********************************************************************************/
  /***************************Function to update Artcile****************************/
  /*********************************************************************************/
  updateArticle = (req: Request, res: Response) => {
    articleController
      .updateArticle(
        req.params.slug,
        req.body.title,
        req.body.description,
        req.body.body
      )
      .then(article => {
        res.json({
          status: 200,
          article
        });
      })
      .catch(err => {
        res.json({
          status: 400,
          err
        });
      });

    return;
  };

  /*********************************************************************************/
  /**************************Function to get own Articles***************************/
  /*********************************************************************************/
  myArticles = (req: Request, res: Response) => {
    var currentUser = req.body.token;
    articleController
      .getMyArticles(currentUser)
      .then(articles => {
        res.json({ status: 200, articles });
      })
      .catch(err => {
        res.json({ status: 400, err });
      });
    return;
  };

  /*********************************************************************************/
  /**************************Function to return User feed***************************/
  /*********************************************************************************/
  feed = (req: Request, res: Response) => {
    var currentUser = req.body.token;
    articleController
      .feed(currentUser)
      .then(articles => {
        res.json({
          status: 200,
          articles
        });
      })
      .catch(err => {
        res.json({
          status: 400,
          err
        });
      });
    return;
  };

  /*********************************************************************************/
  /****************************Function to get Articles*****************************/
  /*********************************************************************************/
  articles = (req: Request, res: Response) => {
    articleController.getArticles(req.query.limit, req.query.offset, req.query.tag, req.query.author).then(articles => {
      res.json({
        status: 200,
        articles
      })
    }).catch(err => {
      res.json({
        status: 400,
        err
      })
    });
    return;
  }

  /*********************************************************************************/
  /***************************Function to save Article******************************/
  /*********************************************************************************/
  saveArticle = (req: Request, res: Response) => {
    if (
      req.body.title == null ||
      req.body.description == null ||
      req.body.body == null
    ) {
      res.json({
        status: 422
      });
      return;
    } else {
      articleController
        .saveArticle(
          req.body.title,
          req.body.description,
          req.body.body,
          req.body.tagList
        )
        .then(article => {
          userController.saveToUser(article, req.body.token).then(() => {
            res.json({
              status: 200,
              article
            });
          });
        })
        .catch(err => {
          res.json({
            status: 400,
            err
          });
        });
      return;
    }
  };

  /*********************************************************************************/
  /***************************Function to set Article Routes************************/
  /*********************************************************************************/
  public setRoutes() {
    this.router.get(articles, this.articles);
    this.router.get(articles + "/feed", tokenController.verifyToken, this.feed);
    this.router.get(
      articles + "/myArticles",
      tokenController.verifyToken,
      this.myArticles
    );
    this.router.get(articles + "/:slug", this.getArticle);
    this.router.put(
      articles + "/:slug",
      tokenController.verifyToken,
      this.updateArticle
    );
    this.router.post(articles, tokenController.verifyToken, this.saveArticle);
    this.router.delete(
      articles + "/:slug",
      tokenController.verifyToken,
      this.deleteArticle
    );
  }
}

const articleRouter = new ArticleRoutes();
articleRouter.setRoutes();
export default articleRouter.router;
