import Match from '../database/models/match';
import Team from '../database/models/team';

interface Obj {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

function counter(match: Match, obj: Obj) {
  const obj2 = obj;
  if (match.homeTeamGoals > match.awayTeamGoals) {
    obj2.totalPoints += 3;
    obj2.totalVictories += 1;
  }
  if (match.homeTeamGoals === match.awayTeamGoals) {
    obj2.totalPoints += 1;
    obj2.totalDraws += 1;
  }
  if (match.homeTeamGoals < match.awayTeamGoals) obj2.totalLosses += 1;
  obj2.goalsFavor += match.homeTeamGoals;
  obj2.goalsOwn += match.awayTeamGoals;

  obj2.totalGames += 1;
  return obj2;
}
function teamData(team: Team, matches: Match[]) {
  let obj = { name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0 };
  obj.name = team.teamName;
  matches
    .filter((match) => (match.homeTeam === team.id) && !match.inProgress)
    .forEach((match) => { obj = counter(match, obj); });
  obj.goalsBalance = obj.goalsFavor - obj.goalsOwn;
  obj.efficiency = (obj.totalPoints / (obj.totalGames * 3)) * 100;
  obj.efficiency = Number(obj.efficiency.toFixed(2));
  return obj;
}

const leaderBoard = (teams: Team[], matches: Match[]) => teams
  .map((team) => teamData(team, matches))
  .sort((a, b) =>
    b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || a.goalsOwn - b.goalsOwn);

const generalLeaderBoard = async () => {
  const matches = await Match.findAll();
  const teams = await Team.findAll();
  const board = leaderBoard(teams, matches);
  return board;
};

export default generalLeaderBoard;
