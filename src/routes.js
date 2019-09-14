import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import FileController from "./app/controllers/FIleController";
import AuthMiddlewares from "./app/middlewares/auth";
const routes = new Router();
const uploads = multer(multerConfig);

routes.post("/user", UserController.store);
routes.post("/session", SessionController.store);

routes.use(AuthMiddlewares);

routes.put("/user", UserController.update);

routes.post("/files", uploads.single("file"), FileController.store);
export default routes;
