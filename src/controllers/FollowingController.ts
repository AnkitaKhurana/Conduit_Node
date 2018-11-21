const Following = require("../models/Models").Following;

class FollowingController {
  constructor() {}

  public isFollowing(followerName, followingName) {
    return Following.findOne({
      where: { followerName: followerName, followingName: followingName }
    })
      .then(result => {
        if (result != null) {
          return true;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  }

  public follow(followerName, followingName) {
    return Following.findOne({
      where: { followerName: followerName, followingName: followingName }
    })
      .then(result => {
        if (result == null) {
          return Following.create({
            followerName: followerName,
            followingName: followingName
          })
            .then(row => {
              return row;
            })
            .then(user => {
              let userObject = user.get({ plain: true });
              return userObject;
            })
            .then(user => {
              if (user) {
                return true;
              } else {
                return false;
              }
            })
            .catch(() => {
              return false;
            });
        } else {
          return true;
        }
      })
      .catch(() => {
        return false;
      });
  }

  public unfollow(followerName, followingName) {
    return Following.findOne({
      where: { followerName: followerName, followingName: followingName }
    })
      .then(result => {
        if (result != null) {
          return Following.destroy({
            where: { followerName: followerName, followingName: followingName }
          })
            .then(user => {
              if (user) {
                return true;
              } else {
                return false;
              }
            })
            .catch(() => {
              return false;
            });
        } else {
          return true;
        }
      })
      .catch(() => {
        return false;
      });
  }
}

let followingController = new FollowingController();
export default followingController;
