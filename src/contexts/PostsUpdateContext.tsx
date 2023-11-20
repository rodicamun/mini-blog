import React, { createContext, useEffect, useContext, useState, useCallback, ReactNode } from 'react';
import { Post, User } from '../types';
import { fetchPostsForUser, fetchUserById } from '../services/apiService';

interface PostsUpdateContextType {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  refreshPosts: () => Promise<void>;
}

interface PostsUpdateProviderProps {
  children: ReactNode;
}

export const PostsUpdateContext = createContext<PostsUpdateContextType>({
  posts: [],
  setPosts: () => { },
  refreshPosts: async () => { },
});

export const usePostsUpdate = () => useContext(PostsUpdateContext);

export const PostsUpdateProvider: React.FC<PostsUpdateProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    console.log('Fetching user profile');

    const loadUserProfile = async () => {
      if (!userProfile) {
        const userId = Math.floor(Math.random() * 10) + 1;
        const profile = await fetchUserById(userId);
        setUserProfile(profile);
      }
    };

    loadUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [shouldRefresh, setShouldRefresh] = useState(true);
  const refreshPosts = useCallback(async () => {
    if (shouldRefresh) {
      try {
        const userId = parseInt(localStorage.getItem('userId') || '1', 10);
        const updatedPosts = await fetchPostsForUser(userId);
        setPosts(updatedPosts);
        setShouldRefresh(false);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    }
  }, [shouldRefresh]);

  return (
    <PostsUpdateContext.Provider value={{ posts, setPosts, refreshPosts }}>
      {children}
    </PostsUpdateContext.Provider>
  );
};
