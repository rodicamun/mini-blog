import React, { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';

const renderWithRouter = (component: ReactElement) => {
  return render(<Router>{component}</Router>);
};
describe('Dashboard', () => {
  it('renders the Dashboard component', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});