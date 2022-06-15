import { Model, STRING } from 'sequelize';
import db from '.';
import match from './match';

class Team extends Model {
  team_name: string;
}

Team.init({
  team_name: STRING
}, {
  underscored: true,
  sequelize: db,
  modelName: 'team',
  timestamps: false,
});

match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(match, { foreignKey: 'homeTeam', as: 'teamHome' });
Team.hasMany(match, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Team;
  