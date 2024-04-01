import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from './config';
import { UUID } from 'crypto';

interface IComment extends Model<InferAttributes<IComment>, InferCreationAttributes<IComment>> {
  id: UUID;
  author: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  post_id: UUID;
}

const Comment = sequelize.define<IComment>('Comment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  author: {
    type: DataTypes.STRING,
    defaultValue: 'Anon',
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  post_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

// Comment.belongsTo(Post, { foreignKey: 'post_id' });

export default Comment;
