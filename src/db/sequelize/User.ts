import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from './config';
import { UUID } from 'crypto';

interface IUser extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
  id: UUID;
  username: string;
  password: string;
}

const User = sequelize.define<IUser>('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
