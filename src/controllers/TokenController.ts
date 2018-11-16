
var jwt = require('jsonwebtoken');
var cert = 'private.key'; //set in .env
import userController from '../controllers/UserController';

class TokenController {
    constructor() {
    }

    /*********************************************************************************/
    /***************************Function to generate Token****************************/
    /*********************************************************************************/
    generateToken(email, username): string {
        return jwt.sign({ email: email, Date: Date.now, username: username }, cert);
    }


    verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            jwt.verify(bearerToken, cert, (err, data) => {
                if (data) {
                    req.body.token = data.email;
                    req.body.username = data.username;
                }
                if (err) {
                    res.sendStatus(403);
                }
            });
            next();
        } else {
            res.sendStatus(403);
        }
    }
}

let tokenController = new TokenController();
export default tokenController; 
