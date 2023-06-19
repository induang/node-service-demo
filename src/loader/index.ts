import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_LINK as string, { logging: false });


export default sequelize;
