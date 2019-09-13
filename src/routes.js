import {Router} from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import AuthMiddlewares from './app/middlewares/auth';
const routes = new Router();

routes.post("/user", UserController.store);
routes.post("/session", SessionController.store);

routes.use(AuthMiddlewares);

routes.put("/user", UserController.update);
export default routes;