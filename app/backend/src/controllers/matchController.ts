import { Request, Response } from 'express';
import { getMatchesServices, getMatcheByProgressService } from '../services/matchService';

async function getMatchesController(req: Request, res: Response) {
  try {
    const { inProgress } = req.query;
    if (inProgress) {
      const matches = await getMatcheByProgressService(inProgress as string);
      return res.status(200).json(matches);
    }
    const matches = await getMatchesServices();
    return res.status(200).json(matches);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}

export default getMatchesController;
