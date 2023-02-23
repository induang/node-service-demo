
import { Model, ModelStatic, Sequelize, UUIDV4 } from 'sequelize';
import { Permission } from '../types/group.type';

interface GroupAttributes {
  id: string;
  name: string;
  permissions: Array<Permission>
}
export default (sequelize: Sequelize, DataTypes: any) => {
  class Group extends Model<GroupAttributes> implements GroupAttributes {
    id!: string;
    name!: string;
    permissions!: Array<Permission>;

    static associate(models: { User: ModelStatic<Model<Sequelize, any>>; }) {
      Group.belongsToMany(models.User, {
        through: 'UserGroup'
      });
    }
  }
  Group.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  }, {
    sequelize,
    modelName: 'Group'
  });
  return Group;
};
