import User from './User';
import Comment from './Comment';
import Post from './Post';
import sequelize from '../../db';

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
