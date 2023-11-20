import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Layout, List, Tabs, Typography } from 'antd';
import { usePostsUpdate } from '../../contexts/PostsUpdateContext';
import './Blogs.css';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Title, Text } = Typography;

const Blogs: React.FC = () => {
  const navigate = useNavigate();
  const { posts, refreshPosts } = usePostsUpdate();

  useEffect(() => {
    refreshPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewPostDetails = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <Layout>
      <Content >
        <div style={{ textAlign: 'left', padding: '0 0 24px' }}>
          <Title style={{ fontSize: '14px', marginBottom: 0 }}>All Blog posts</Title>
          <Text type="secondary" style={{ fontSize: '10px' }}>for Qatar Development Bank</Text>
        </div>
        <Card bordered={false} style={{ minHeight: 380 }}>
          <Tabs defaultActiveKey="1" size='small'>
            <TabPane tab={<span className="tabTitle">All Posts</span>} key="1">
              <List
                itemLayout="vertical"
                size="large"
                pagination={{ pageSize: 4, style: { textAlign: 'center' } }}
                dataSource={posts}
                renderItem={post => (
                  <List.Item
                    key={post.id}
                    onClick={() => viewPostDetails(post.id)}
                  >
                    <List.Item.Meta
                      avatar={<img alt='' src={`https://picsum.photos/id/${post.id}/150/100`} />}
                      title={<span className="postTitle">{post.title}</span>}
                      description={<span className="postDescription">{post.body}</span>}
                    />
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab={<span className="tabTitle">Latest Posts</span>} key="2">
              <Text type="secondary" className="textMessage">We’re currently curating new content for you. Check back soon for the latest posts!</Text>
            </TabPane>
            <TabPane tab={<span className="tabTitle">Archived</span>} key="3">
              <Text type="secondary" className="textMessage">
                The Archived section is currently empty. We are in the process of organizing and updating our past content to ensure you have access to quality historical insights. Thank you for your patience.
              </Text>
            </TabPane>
          </Tabs>
        </Card>
      </Content>
    </Layout>
  );
};

export default Blogs;
