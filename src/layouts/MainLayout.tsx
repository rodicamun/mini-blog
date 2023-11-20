import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, ReadOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import UserProfile from '../components/UserProfile/UserProfile';

const { Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['dashboard']);

  useEffect(() => {
    const pathSnippets = location.pathname.split('/').filter(i => i);
    if (pathSnippets.length === 0) {
      setSelectedKeys(['dashboard']);
    } else {
      setSelectedKeys([pathSnippets[0]]);
    }
  }, [location]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} theme="light">
        <UserProfile />
        <Menu theme="light" mode="inline" selectedKeys={selectedKeys}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />} style={{ fontSize: '12px', fontWeight: 'bold' }}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="blogs" icon={<ReadOutlined />} style={{ fontSize: '12px', fontWeight: 'bold' }}>
            <Link to="/blogs">Blogs</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 250 }}>
        <Content style={{ margin: '16px', overflow: 'initial' }}>
          <div style={{ padding: '16px', minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
