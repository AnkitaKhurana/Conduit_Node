import favoriteController from "../controllers/FavoriteController";
import { Request, Response, Router } from "express";
import { articles } from "../constants/RouteConstants";
import tokenController from "../controllers/TokenController";
import articleController from "../controllers/ArticleController";
import favoriteStatus from "../constants/FavoriteStatus";

class FavoriteRoutes {
  public router: Router;

  constructor() {
    this.router = Router({ caseSensitive: true });
    this.setRoutes();
  }

  /*********************************************************************************/
  /***********************Function to favorite an Article***************************/
  /*********************************************************************************/
  favorite = (req: Request, res: Response) => {
    return favoriteController
      .favorite(req.body.token, req.params.slug)
      .then(result => {
        if (result) {
          favoriteController
            .updateArticleCount(req.params.slug, favoriteStatus.FAVORITE)
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
        } else {
          return articleController
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
        }
      })
      .catch(err => {
        res.json({
          status: 400,
          err
        });
      });
  };

  /*********************************************************************************/
  /**************************Function to unfavorite Article*************************/
  /*********************************************************************************/
  unfavorite = (req: Request, res: Response) => {
    return favoriteController
      .unfavorite(req.body.token, req.params.slug)
      .then(result => {
        if (result) {
          favoriteController
            .updateArticleCount(req.params.slug, favoriteStatus.FAVORITE)
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
        } else {
          return articleController
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
        }
      })
      .catch(err => {
        res.json({
          status: 400,
          err
        });
      });
  };

  /*********************************************************************************/
  /*************************Function to set Favorite Routes*************************/
  /*********************************************************************************/
  public setRoutes() {
    this.router.post(
      articles + "/:slug/favorite",
      tokenController.verifyToken,
      this.favorite
    );
    this.router.delete(
      articles + "/:slug/unfavorite",
      tokenController.verifyToken,
      this.unfavorite
    );
  }
}

const favoriteRoutes = new FavoriteRoutes();
favoriteRoutes.setRoutes();
export default favoriteRoutes.router;
