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

export {
  getMatchesServices,
  getMatcheByProgressService,
};
