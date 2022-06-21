import { Router } from 'express';
import { validEqualTeam, invalidIdTeam } from '../midlewares/validMatch';
import { getTeamByIdController, getTeamsController } from '../controllers/teamController';
import { loginController, loginValidate } from '../controllers/loginController';
import { getMatchesController,
  putMatchController, finishMatchController } from '../controllers/matchController';
import vakidLoginController from '../midlewares/validLogin';

const routes = Router();

routes.post('/login', vakidLoginController, loginController);
routes.get('/login/validate', loginValidate);
routes.get('/teams', getTeamsController);
routes.get('/teams/:id', getTeamByIdController);
routes.get('/matches', getMatchesController);
routes.post('/matches', validEqualTeam, invalidIdTeam, putMatchController);
routes.patch('/matches/:id/finish', finishMatchController);

export default routes;
