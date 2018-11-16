import * as express from 'express';
import * as bodyParser from 'body-parser';
import userRouter  from './routes/UserRoute';
import profileRouter from './routes/ProfileRoutes';

// Server class for http server 
class Server {
    public app: express.Application
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    // app config 
    config(): void {

        //Middlewares

        // Body Parser for parsing req.body 
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        //Cors Setup
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.header(
                'Access-Control-Allow-Methods',
                'GET, POST, PUT, DELETE, OPTIONS',
            );
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials',
            );
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }

    // routes 
    routes(): void {
        this.app.get('/', function (req, res) {
            res.send('hello world')
          })
        this.app.use('/api', userRouter);
        this.app.use('/api', profileRouter);
       }
}

export default new Server().app;
