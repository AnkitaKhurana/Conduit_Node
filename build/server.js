"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var UserRoute_1 = require("./routes/UserRoute");
var ProfileRoutes_1 = require("./routes/ProfileRoutes");
var ArticleRoutes_1 = require("./routes/ArticleRoutes");
var CommentRoutes_1 = require("./routes/CommentRoutes");
var TagRoutes_1 = require("./routes/TagRoutes");
// Server class for http server 
var Server = /** @class */ (function () {
    function Server() {
        this.app = express();
        this.config();
        this.routes();
    }
    // app config 
    Server.prototype.config = function () {
        //Middlewares
        // Body Parser for parsing req.body 
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        //Cors Setup
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    };
    // routes 
    Server.prototype.routes = function () {
        this.app.get('/', function (req, res) {
            res.send('hello world');
        });
        this.app.use('/api', UserRoute_1.default);
        this.app.use('/api', ProfileRoutes_1.default);
        this.app.use('/api', ArticleRoutes_1.default);
        this.app.use('/api', CommentRoutes_1.default);
        this.app.use('/api', TagRoutes_1.default);
    };
    return Server;
}());
exports.default = new Server().app;
//# sourceMappingURL=server.js.map