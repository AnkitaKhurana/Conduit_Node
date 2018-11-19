import statusCodes from "../constants/StatusCodes";
import tokenController from "../controllers/TokenController";
const User = require("../models/Models").User;

class UserController {
  constructor() {}

  public findUser(email) {
    return User.findOne({ where: { email: email } })
      .then(user => {
        return user;
      })
      .then(user => {
        let userObject = user.get({ plain: true });
        return userObject;
      })
      .catch(() => {
        return null;
      });
  }

  public findProfile(username) {
    return User.findOne({ where: { username: username } })
      .then(user => {
        return user;
      })
      .then(user => {
        let userObject = user.get({ plain: true });
        return userObject;
      })
      .catch(() => {
        return null;
      });
  }

  public updateUser(userModel) {
    userModel.updatedAt = Date.now;
    return User.update(userModel, { where: { email: userModel.email } });
  }

  public login(email, password) {
    return User.findOne({ where: { email: email, password: password } })
      .then(user => {
        user.token = tokenController.generateToken(user.email, user.username);
        return user;
      })
      .then(user => {
        let userObject = user.get({ plain: true });
        return userObject;
      })
      .catch(err => {
        return err;
      });
  }

  public register(email, username, password) {
    return User.findOne({ where: { email: email } })
      .then(user => {
        if (user != null) {
          return null;
        } else {
          return User.create({
            username: username,
            email: email,
            password: password,
            token: tokenController.generateToken(email, username)
          })
            .then(user => {
              let userObject = user.get({ plain: true });
              return userObject;
            })
            .catch(err => {
              return err;
            })
            .catch(err => {
              return err;
            });
        }
      })
      .catch(err => {
        return err;
      });
  }

  public saveToUser(article, author) {
    return User.findOne({ where: { username: author } })
      .then(foundAuthor => {
        foundAuthor.addArticle(article.id).then(() => {});
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }
}

let userController = new UserController();
export default userController;
