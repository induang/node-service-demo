const db: any = {};
import UserModel from './user';
import GroupModel from './group';
import sequelize from '../loader';
import Sequelize  from 'sequelize';


// set User Model
const User = UserModel(sequelize, Sequelize.DataTypes);
db[User.name] = User;

// set Group Model
const Group = GroupModel(sequelize, Sequelize.DataTypes);
db[Group.name] = Group;

// set association
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
