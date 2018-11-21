const Article = require('../models/Models').Article;
const Favorite = require("../models/Models").Favorite;
import favoriteStatus from '../constants/FavoriteStatus';
class FavoriteController {
    constructor() { }

    favorite(user, slug) {
        return Favorite.findOne({
            where: { username: user, slug: slug }
        })
            .then(result => {
                if (result == null) {
                    return Favorite.create({
                        username: user,
                        slug: slug
                    })
                        .then(row => {
                            if (row) {
                                return true;
                            } else {
                                return false;
                            }
                        })
                        .catch(() => {
                            return false;
                        });
                } else {
                    return false;
                }
            })
            .catch(() => {
                return false;
            });
    }

    unfavorite(user, slug) {
        return Favorite.findOne({
            where: { username: user, slug: slug }
        })
            .then(result => {
                if (result != null) {
                    return Favorite.destroy({
                        where: {
                            username: user,
                            slug: slug
                        }
                    }).then(row => {
                        if (row) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                        .catch((err) => {
                            console.log(err)
                            return false;
                        });
                } else {
                    return false;
                }
            })
            .catch((err) => {
                console.log(err)
                return false;
            });
    }

    updateArticleCount(slug: string, status) {
        return Article.findOne({ where: { slug: slug } }).then(option => {
            console.log(status, favoriteStatus.FAVORITE, status == favoriteStatus.FAVORITE)
            if (status == favoriteStatus.FAVORITE)
                return option.increment('favoritesCount');
            else
                return option.decrement('favoritesCount');
        }).then(option => {
            return option.reload();
        }).then(option => {
            return option;
        }).catch(err => { return err; })
    }
}

let favController = new FavoriteController();
export default favController;
