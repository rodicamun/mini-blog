import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';
import { fetchRandomUser } from '../../services/apiService';

jest.mock('../../services/apiService', () => ({
  fetchRandomUser: jest.fn(),
}));

describe('UserProfile', () => {
  it('calls fetchRandomUser on mount', async () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    (fetchRandomUser as jest.Mock).mockResolvedValueOnce(user);
    render(<UserProfile />);
    await waitFor(() => expect(fetchRandomUser).toHaveBeenCalled());
  });

  it('renders user information if fetch is successful', async () => {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
    (fetchRandomUser as jest.Mock).mockResolvedValueOnce(user);
    render(<UserProfile />);
    expect(await screen.findByText(user.name)).toBeInTheDocument();
    expect(await screen.findByText(user.email)).toBeInTheDocument();
  });

  it('handles the error state if fetch fails', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    (fetchRandomUser as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch user'));
    render(<UserProfile />);
    await waitFor(() => expect(consoleError).toHaveBeenCalledWith('Failed to fetch user:', expect.any(Error)));
    consoleError.mockRestore();
  });
  
});