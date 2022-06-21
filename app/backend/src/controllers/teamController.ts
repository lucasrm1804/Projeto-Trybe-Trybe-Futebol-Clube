import { Response, Request } from 'express';
import { getTeamsService, getTeamByIdService } from '../services/teamsService';

async function getTeamsController(_req: Request, res: Response) {
  try {
    const teams = await getTeamsService();
    res.status(200).json(teams);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}

async function getTeamByIdController(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const team = await getTeamByIdService(Number(id));
    console.log('controllers', team);
    return res.status(200).json(team);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}

export {
  getTeamsController,
  getTeamByIdController,
};
