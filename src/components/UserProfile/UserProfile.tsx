import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { fetchRandomUser } from '../../services/apiService';
import { User } from '../../types';

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchRandomUser()
      .then(setUser)
      .catch(error => console.error('Failed to fetch user:', error));
  }, []);
  
  return <div style={{ padding: 20, textAlign: 'center' }}>
    {user ? (
      <>
        <Avatar size="large" style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </>
    ) : (
      <Avatar size="large" icon={<UserOutlined />} />
    )}
  </div>;
};

export default UserProfile;