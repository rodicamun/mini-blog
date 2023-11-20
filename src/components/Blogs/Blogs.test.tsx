import React, { ReactElement } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { usePostsUpdate } from '../../contexts/PostsUpdateContext';
import Blogs from './Blogs';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../contexts/PostsUpdateContext', () => ({
  usePostsUpdate: jest.fn(),
}));

const renderWithRouter = (component: ReactElement) => {
  return render(<Router>{component}</Router>);
};

const mockPosts = [
  { id: 1, title: 'First Post', body: 'Content for the first post' },
  { id: 2, title: 'Second Post', body: 'Content for the second post' },
  { id: 3, title: 'Third Post', body: 'Content for the third post' },
];

describe('Blogs Component', () => {
  beforeEach(() => {
    (usePostsUpdate as jest.Mock).mockReturnValue({
      posts: mockPosts,
      refreshPosts: jest.fn(),
    });
  });

  it('renders the Blogs component', () => {
    renderWithRouter(<Blogs />);
    expect(screen.getByText('All Blog posts')).toBeInTheDocument();
  });

  it('displays the posts', () => {
    renderWithRouter(<Blogs />);
    for (const post of mockPosts) {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.body)).toBeInTheDocument();
    }
  });

  it('navigates to post details when a post is clicked', async () => {
    const navigate = useNavigate();
    renderWithRouter(<Blogs />);
    const firstPostTitle = screen.getByText('First Post');
    fireEvent.click(firstPostTitle);
    const postId = mockPosts[0].id;
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith(`/posts/${postId}`);
    });
  });

});