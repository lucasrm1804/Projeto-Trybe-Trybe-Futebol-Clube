import { Router } from 'express';
import { getTeamByIdController, getTeamsController } from '../controllers/teamController';
import { loginController, loginValidate } from '../controllers/loginController';
import vakidLoginController from '../midlewares/validLogin';

const routes = Router();

routes.post('/login', vakidLoginController, loginController);
routes.get('/login/validate', loginValidate);
routes.get('/teams', getTeamsController);
routes.get('/teams/:id', getTeamByIdController);

export default routes;
