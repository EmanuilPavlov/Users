import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('user_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log
});

export default sequelize;
