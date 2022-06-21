import Match from '../database/models/match';
import Team from '../database/models/team';

async function getMatchesServices() {
  const matches = await Match.findAll({
    include: [
      {
        model: Team,
        as: 'teamHome',
      },
      {
        model: Team,
        as: 'teamAway',
      },
    ],
  });
  return matches;
}

async function getMatcheByProgressService(inProgress: string) {
  const matches = await Match.findAll({
    include: [
      {
        model: Team,
        as: 'teamHome',
      },
      {
        model: Team,
        as: 'teamAway',
      },
    ],
    where: {
      inProgress: inProgress === 'true',
    },
  });
  return matches;
}

type IMatch = {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
};

async function putMatchService(macth: IMatch) {
  const match = await Match.create(macth);
  return match;
}

async function finishMatchService(id:number) {
  const match = await Match.findByPk(id);
  if (!match) {
    throw new Error('Match not found');
  }
  await match.update({ inProgress: false });
}

async function editMatchSerice(id: number, homeTeamGoals:number, awayTeamGoals:number) {
  return Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
}

export {
  getMatchesServices,
  getMatcheByProgressService,
  putMatchService,
  finishMatchService,
  editMatchSerice,
};
