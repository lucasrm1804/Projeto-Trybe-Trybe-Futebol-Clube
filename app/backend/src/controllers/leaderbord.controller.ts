import { Request, Response } from 'express';
import generalLeaderBoard from '../services/leaderbordService';

const LeaderBoardController = async (req: Request, res: Response) => {
  const leaderBoard = await generalLeaderBoard();
  res.status(200).json(leaderBoard);
};

export default LeaderBoardController;
