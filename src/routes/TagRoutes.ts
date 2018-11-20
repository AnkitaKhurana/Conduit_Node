import tagController from "../controllers/TagController";
import { Request, Response, Router } from "express";
const Tag = require('../models/Models').Tag;

class TagRoutes {
    public router: Router;

    constructor() {
        this.router = Router({ caseSensitive: true });
        this.setRoutes();
    }
    getAllTags = (req: Request, res: Response) => {
        tagController.getAllTags().then(tags => {
            res.json({
                status: 200,
                tags
            })
        }).catch(err => {
            res.json({
                status: 400,
                err
            })
        })
    }

    public setRoutes() {
        this.router.get('/tags', this.getAllTags);
    }
}

const tagRoutes = new TagRoutes();
tagRoutes.setRoutes();
export default tagRoutes.router;
