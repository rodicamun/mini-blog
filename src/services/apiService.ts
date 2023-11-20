import { Post, User } from '../types';
const BASE_URL = process.env.REACT_APP_API_URL;;

export const fetchRandomUser = async (): Promise<User> => {
  const randomId = Math.floor(Math.random() * 10) + 1;
  try {
    const response = await fetch(`${BASE_URL}/users/${randomId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok. ');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch random user. ');
  }
};

export const fetchUserById = async (userId: number): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok. ');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch user. ');
  }
};

export const fetchPostsForUser = async (userId: number): Promise<Post[]> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/posts`);
    if (!response.ok) {
      throw new Error('Network response was not ok. ');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch posts. ');
  }
};

export const fetchPostById = async (postId: number): Promise<Post> => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok. ');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch post. ');
  }
};

export const updatePost = async (post: Post): Promise<Post> => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok. ');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Failed to update post. ');
  }
};

export const deletePost = async (postId: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok. ');
    }
  } catch (error) {
    throw new Error('Failed to delete post. ');
  }
};
