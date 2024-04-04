import { IUser, IPost, IComment } from '../db/';

export type UserID = Pick<IUser, 'id'>;

export type GetPost = Partial<Pick<IPost, 'id' | 'title'>>;

export type CreatePost = Pick<IPost, 'id' | 'title' | 'content' | 'user_id' | 'image_url'>;

export type DeletePost = Pick<IPost, 'id'>;

export type UpdatePost = Pick<IPost, 'id'> &
  Partial<
    Pick<
      IPost,
      'title' | 'content' | 'likes' | 'updated_at' | 'views' | 'published_at' | 'image_url'
    >
  >;
