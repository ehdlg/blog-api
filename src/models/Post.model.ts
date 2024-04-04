import { Post } from '../db';
import { Op, where } from 'sequelize';
import { CreatePost, UpdatePost, DeletePost, GetPost } from './types';

export default class PostModel {
  static async get({ id, title }: GetPost) {
    try {
      if (null == id && null == title) return await Post.findAll();

      if (null !== id) return await Post.findOne({ where: { id } });

      return await Post.findAll({
        where: {
          title: {
            [Op.like]: `${title}%`,
          },
        },
      });
    } catch (e) {
      throw e;
    }
  }

  static async create({ id, title, content, user_id, image_url }: CreatePost) {
    try {
      return await Post.create({ id, title, content, user_id, image_url });
    } catch (e) {
      throw e;
    }
  }

  static async delete({ id }: DeletePost) {
    try {
      return await Post.destroy({ where: { id } });
    } catch (e) {
      throw e;
    }
  }

  static async update({
    id,
    title,
    content,
    likes,
    views,
    updated_at,
    published_at,
    image_url,
  }: UpdatePost) {
    try {
      return await Post.update(
        { title, content, likes, views, updated_at, published_at, image_url },
        { where: { id } }
      );
    } catch (e) {
      throw e;
    }
  }
}
