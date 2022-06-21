import { NextFunction, Request, Response } from 'express';
import Team from '../database/models/team';

function validEqualTeam(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
}

async function invalidIdTeam(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  const homeStatus = await Team.findByPk(homeTeam);
  const awayStatus = await Team.findByPk(awayTeam);

  if (!homeStatus || !awayStatus) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
}

export {
  validEqualTeam,
  invalidIdTeam,
};
