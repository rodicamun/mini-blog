import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Form, Input, Row, Col, Spin, message } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { PostsUpdateContext } from '../../contexts/PostsUpdateContext';
import { updatePost, deletePost } from '../../services/apiService';
import { Post } from '../../types';

const PostDetails: React.FC = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const { posts, setPosts } = useContext(PostsUpdateContext);

  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const { postId: postIdParam } = useParams<{ postId: string }>();
  const postId = postIdParam ? parseInt(postIdParam, 10) : null;

  useEffect(() => {
    if (postId !== null) {
      const localPost = posts.find(post => post.id === postId);
      if (localPost) {
        setPost(localPost);
        form.setFieldsValue(localPost);
      }
    }
  }, [postId, posts, form]);

  const onEdit = () => setIsEditing(true);

  const onSave = async (values: Post) => {
    if (!postId) return;

    if (postId) {
      try {
        const updatedPost = await updatePost({ ...values, id: postId });
        setPost(updatedPost);
        setPosts(currentPosts =>
          currentPosts.map(post => (post.id === updatedPost.id ? updatedPost : post))
        );
        setIsEditing(false);
        message.success('Post updated successfully!');
        navigate('/blogs');
      } catch (error) {
        message.error('Failed to update the post.');
      }
    }
  };

  const onDelete = async () => {
    if (!postId) return;

    try {
      await deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
      navigate('/blogs');
      message.success('Post deleted successfully!');
    } catch (error) {
      message.error('Failed to delete the post.');
    }
  };

  if (!post) {
    return <Spin />;
  }

  const onCancel = () => {
    navigate('/blogs');
  };

  return (
    <Card title={isEditing ? 'Edit Post' : post?.title}
      extra={
        !isEditing && <Button onClick={onCancel} type="link" icon={<ArrowLeftOutlined />}>
          Back
        </Button>
      }>
      {isEditing ? (
        <Form form={form} onFinish={onSave}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="body" label="Content" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Row justify="end" style={{ marginBottom: 16 }}>
            <Col>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
          <Button onClick={() => setIsEditing(false)} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
          </Col>
          </Row>
        </Form>
      ) : (
        <>
          <p>{post?.body}</p>
          <Row justify="end" style={{ marginBottom: 16 }}>
            <Col>
              <Button onClick={onEdit} icon={<EditOutlined />} type="primary">
                Edit
              </Button>
              <Button onClick={onDelete} icon={<DeleteOutlined />} danger style={{ marginLeft: 8 }}>
                Delete
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

export default PostDetails;
