"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
var cert = 'private.key'; //set in .env
var TokenController = /** @class */ (function () {
    function TokenController() {
    }
    /*********************************************************************************/
    /***************************Function to generate Token****************************/
    /*********************************************************************************/
    TokenController.prototype.generateToken = function (email, username) {
        return jwt.sign({ email: email, Date: Date.now, username: username }, cert);
    };
    TokenController.prototype.verifyToken = function (req, res, next) {
        var bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(' ');
            var bearerToken = bearer[1];
            jwt.verify(bearerToken, cert, function (err, data) {
                if (data) {
                    req.body.token = data.email;
                    req.body.username = data.username;
                }
                if (err) {
                    res.sendStatus(403);
                }
            });
            next();
        }
        else {
            res.sendStatus(403);
        }
    };
    return TokenController;
}());
var tokenController = new TokenController();
exports.default = tokenController;
//# sourceMappingURL=TokenController.js.map