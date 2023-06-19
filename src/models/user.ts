
import  {
  Model, ModelStatic, Sequelize, UUIDV4
} from 'sequelize';

interface UserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export default (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: string;
    login!: string;
    password!: string;
    age!: number;
    isDeleted!: boolean;
    static associate(models: { Group: ModelStatic<Model<Sequelize, any>>; }) {
      User.belongsToMany(models.Group, {
        through: 'UserGroup'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};

