import Team from '../database/models/team';

async function getTeamsService() {
  const teams = await Team.findAll();
  return teams;
}

async function getTeamByIdService(id: number) {
  const team = await Team.findByPk(id);
  console.log('services', team);
  return team;
}

export {
  getTeamsService,
  getTeamByIdService,
};
