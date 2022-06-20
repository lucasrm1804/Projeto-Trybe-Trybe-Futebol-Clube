import { Router } from 'express';
import { loginController, loginValidate } from '../controllers/loginController';
import vakidLoginController from '../midlewares/validLogin';

const routes = Router();

routes.post('/login', vakidLoginController, loginController);
routes.get('/login/validate', loginValidate);

export default routes;
