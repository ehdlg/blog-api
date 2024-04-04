import User, { type IUser } from './sequelize/User';
import Comment, { type IComment } from './sequelize/Comment';
import Post, { type IPost } from './sequelize/Post';
import sequelize from './sequelize/config';
import 'dotenv/config';

export const initDb = () => {
  Post.belongsTo(User, { foreignKey: 'user_id' });
  User.hasMany(Post, { foreignKey: 'user_id' });
  Comment.belongsTo(Post, { foreignKey: 'post_id' });
  Post.hasMany(Comment, { foreignKey: 'post_id' });

  sequelize
    .sync()
    .then(() => {
      console.log('Tables synced');
    })
    .catch((e) => {
      console.error('Error while trying to sync the tables ', e);
    });
};

export { User, Post, Comment, IPost, IComment, IUser };
