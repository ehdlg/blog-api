import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from './config';
import { UUID } from 'crypto';

export interface IPost extends Model<InferAttributes<IPost>, InferCreationAttributes<IPost>> {
  id: UUID;
  title: string;
  content: string;
  likes?: number;
  views?: number;
  published_at?: Date;
  updated_at?: Date;
  user_id: UUID;
}

const Post = sequelize.define<IPost>('Post', {
  id: { type: DataTypes.UUID, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.STRING, allowNull: false },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  views: { type: DataTypes.INTEGER, defaultValue: 0 },
  published_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  user_id: { type: DataTypes.UUID, allowNull: false },
});

export default Post;
