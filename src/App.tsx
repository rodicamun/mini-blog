import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './components/Dashboard/Dashboard';
import Blogs from './components/Blogs/Blogs';
import PostDetails from './components/PostDetails/PostDetails';
import { PostsUpdateProvider } from './contexts/PostsUpdateContext';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PostsUpdateProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="posts/:postId" element={<PostDetails />} />
          </Route>
        </Routes>
      </PostsUpdateProvider>
    </BrowserRouter>
  );
};

export default App;
