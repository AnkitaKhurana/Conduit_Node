import userController from "../controllers/UserController";
import tokenController from "../controllers/TokenController";
import followingController from "../controllers/FollowingController";
import { Request, Response, Router } from "express";
import { profiles } from "../constants/RouteConstants";
var jwt = require("jsonwebtoken");
var cert = "private.key"; //set in .env

class ProfileRouter {
    public router: Router;

    constructor() {
        this.profile = this.profile.bind(this);
        this.router = Router({ caseSensitive: true });
        this.setRoutes();
    }

    public profile(req: Request, res: Response): void {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            jwt.verify(bearerToken, cert, (err, data) => {
                if (data) {
                    let profileFound = userController.findProfile(req.params.username);
                    profileFound.then(profileFound => {
                        if (profileFound != null) {
                            let profile = {
                                username: profileFound.username,
                                bio: profileFound.bio,
                                image: profileFound.image,
                                following: null
                            };
                            followingController
                                .isFollowing(data.username, profileFound.username)
                                .then(result => {
                                    profile.following = result;
                                    res.json({
                                        status: 200,
                                        profile
                                    });
                                })
                                .catch(() => {
                                    res.json({
                                        status: 200,
                                        profile
                                    });
                                });
                        } else {
                            res.json({
                                status: 404,
                                error: "No such Profile Found"
                            });
                        }
                    });
                } else if (err) {
                    res.sendStatus(403);
                }
            });
        } else {
            let profileFound = userController.findProfile(req.params.username);
            profileFound.then(profileFound => {
                if (profileFound != null) {
                    let profile = {
                        username: profileFound.username,
                        bio: profileFound.bio,
                        image: profileFound.image
                    };
                    res.json({
                        status: 200,
                        profile
                    });
                } else {
                    res.json({
                        status: 404,
                        error: "No such Profile Found"
                    });
                }
            });
        }
        return;
    }

    follow = (req: Request, res: Response) => {
        followingController.follow(req.body.username, req.params.username).then(result => {
            if (result != null) {
                return this.profile(req, res);
            }
            else {
                res.json({
                    status: 500,
                    message: 'Internal Error'
                });
            }
        });
        return;
    }

    unfollow = (req: Request, res: Response) => {
        followingController.unfollow(req.body.username, req.params.username).then(result => {
            if (result != null) {
                return this.profile(req, res);
            }
            else {
                res.json({
                    status: 500,
                    message: 'Internal Error'
                });
            }
        });
        return;
    }

    public setRoutes() {
        this.router.get(profiles + "/:username", this.profile);
        this.router.post(profiles + "/:username/follow", tokenController.verifyToken, this.follow);
        this.router.delete(profiles + "/:username/follow", tokenController.verifyToken, this.unfollow);
    }
}

const profileRouter = new ProfileRouter();
profileRouter.setRoutes();
export default profileRouter.router;
