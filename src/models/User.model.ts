import { User } from '../db';

export default class UserModel {
  static async get({ username }: { username?: string }) {
    try {
      if (null == username) return await User.findAll();

      const newUser = await User.findOne({ where: { username: username } });

      return newUser;
    } catch (e) {
      throw e;
    }
  }

  static async create({ username, password }: { username: string; password: string }) {
    try {
      const newUser = await User.create({ username, password, id: crypto.randomUUID() });

      return { data: newUser, message: 'User created succesully' };
    } catch (e) {
      throw e;
    }
  }

  static async delete({ username }: { username: string }) {
    try {
      const deletedUser = await User.destroy({ where: { username } });

      const success = deletedUser === 1;

      const message = `User ${username} ${success ? 'deleted' : 'not found'}`;

      return { data: deletedUser, message };
    } catch (e) {
      throw e;
    }
  }

  static async update({
    username,
    updatedUser,
  }: {
    username: string;
    updatedUser: { username: string; password: string };
  }) {
    try {
      return await User.update(updatedUser, { where: { username } });
    } catch (e) {
      throw e;
    }
  }
}
