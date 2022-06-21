import { Request, Response } from 'express';
import { getMatchesServices,
  getMatcheByProgressService,
  putMatchService, finishMatchService } from '../services/matchService';

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

async function putMatchController(req: Request, res: Response) {
  const match = await putMatchService(req.body);
  return res.status(201).json(match);
}

async function finishMatchController(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await finishMatchService(Number(id));
    return res.status(200).json({ message: 'Finished' });
  } catch (error) {
    return res.status(401).json({ message: (error as Error).message });
  }
}

export {
  getMatchesController,
  putMatchController,
  finishMatchController,
};
