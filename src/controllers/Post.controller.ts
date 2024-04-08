import { RequestHandler } from 'express';
import PostModel from '../models/Post.model';
import { GetPost, CreatePost, DeletePost, UpdatePost } from '../models/types';
import { UUID } from 'crypto';

export class PostController {
  static get: RequestHandler = async (req, res, next) => {
    try {
      const { id, title }: GetPost = req.body;

      const posts = await PostModel.get({ id, title });

      return res.json(posts);
    } catch (error) {
      next(error);
    }
  };

  static create: RequestHandler = async (req, res, next) => {
    try {
      const { title, content, user_id }: CreatePost = req.body;
      const id = crypto.randomUUID();

      const newPost: CreatePost = await PostModel.create({
        id,
        title,
        content,
        user_id,
      });

      return res.status(201).json({ data: newPost, message: `Post ${id} created succesfully` });
    } catch (error) {
      next(error);
    }
  };

  static delete: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.body;

      const deletedPost = await PostModel.delete({ id });

      const success = deletedPost === 1;

      const message = `Post with id:${id} ${success ? 'deleted.' : 'not found.'}`;

      return res.status(success ? 200 : 404).json({ data: deletedPost, message });
    } catch (error) {
      next(error);
    }
  };

  static update: RequestHandler = async (req, res, next) => {
    try {
      const { id, content, likes, published_at, title, updated_at, views }: UpdatePost = req.body;

      const updatedPost = await PostModel.update({
        id,
        content,
        likes,
        published_at,
        title,
        updated_at,
        views,
      });

      return res.json({ data: updatedPost, message: `Post ${id} succesfully updated.` });
    } catch (error) {
      next(error);
    }
  };
}
