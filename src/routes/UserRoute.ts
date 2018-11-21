import userController from "../controllers/UserController";
import tokenController from "../controllers/TokenController";
import { Request, Response, Router } from "express";
import { user, users } from "../constants/RouteConstants";

class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router({ caseSensitive: true });
    this.setRoutes();
  }

  public login(req: Request, res: Response): void {
    if (req.body.username == null || req.body.password == null) {
      res.json({
        status: 422
      });
      return;
    }
    let loggedIn = userController.login(req.body.username, req.body.password);
    loggedIn
      .then(function (result) {
        if (result != null) {
          res.json({
            status: 200,
            user: result
          });
        } else {
          res.json({
            status: 401,
            user: result
          });
        }
      })
      .catch(err => {
        res.json({
          status: 400,
          error: err
        });
      });
  }

  public register(req: Request, res: Response): void {
    if (
      req.body.username == null ||
      req.body.password == null ||
      req.body.email == null
    ) {
      res.json({
        status: 422
      });
      return;
    }
    var result = userController.register(
      req.body.email,
      req.body.username,
      req.body.password
    );
    result
      .then(function (result) {
        if (result != null) {
          res.json({
            status: 200,
            user: result
          });
        } else {
          res.json({
            status: 401,
            message: "Credentials already exist",
            user: result
          });
        }
      })
      .catch(err => {
        res.json({
          status: 400,
          message: "Error" + err.name
        });
      });
  }
  public current(req: Request, res: Response): void {
    let userfound = userController.findUser(req.body.token);
    userfound
      .then(user => {
        res.json({
          status: 200,
          user
        });
      })
      .catch(err => {
        res.json({
          status: 400,
          message: "Error" + err.name
        });
      });
    return;
  }

  public update(req: Request, res: Response): void {
    let userfound = userController.findUser(req.body.token);
    userfound
      .then(user => {
        if (req.body.password) {
          user.password = req.body.password;
        }
        if (req.body.bio) {
          user.bio = req.body.bio;
        }
        if (req.body.image) {
          user.image = req.body.image;
        }
        let updated = userController.updateUser(user);
        updated
          .then(() =>
            res.json({
              status: 200,
              user
            })
          )
          .catch(error =>
            res.json({
              status: 400,
              error
            })
          );
      })
      .catch(err =>
        res.json({
          status: 400,
          message: "Error" + err.name
        })
      );
    return;
  }

  /*********************************************************************************/
  /****************************Function to set Routes*******************************/
  /*********************************************************************************/
  public setRoutes() {
    this.router.post(users + "/login", this.login);
    this.router.post(users + "/", this.register);
    this.router.get(user, tokenController.verifyToken, this.current);
    this.router.put(user, tokenController.verifyToken, this.update);
  }
}

const userRouter = new UserRouter();
userRouter.setRoutes();
export default userRouter.router;
