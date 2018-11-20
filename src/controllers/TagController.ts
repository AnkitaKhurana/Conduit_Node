const Tag = require("../models/Models").Tag;

class TagController {
  constructor() {}

  getAllTags() {
    return Tag.findAll({})
      .then(tags => {
        return tags;
      })
      .catch(err => {
        return err;
      });
  }
  getTags(article) {
    return article.getTags().then(tags => {
      return tags;
    });
  }

  saveTag(tag) {
    return Tag.findOrCreate({
      where: {
        body: tag
      }
    })
      .spread(function(tagResult) {
        let tagObject = tagResult.get({ plain: true });
        return tagObject;
      })
      .catch(err => {
        return err;
      });
  }
  saveTagObject(tag) {
    return Tag.findOrCreate({
      where: {
        body: tag
      }
    })
      .then(function(tagResult) {
        return tagResult;
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }
}

let tagController = new TagController();
export default tagController;
