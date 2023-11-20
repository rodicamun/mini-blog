import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, Spin } from 'antd';
import { fetchPostById, updatePost } from '../../services/apiService';
import { Post } from '../../types';
import { PostsUpdateContext } from '../../contexts/PostsUpdateContext';

const EditPost: React.FC = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { setPosts } = useContext(PostsUpdateContext);

  useEffect(() => {
    if (postId) {
      fetchPostById(parseInt(postId))
        .then(fetchedPost => {
          setPost(fetchedPost);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching post details:', error);
          setLoading(false);
        });
    }
  }, [postId]);

  const onFinish = async (values: Post) => {
    try {
      const updatedPost = await updatePost(values);
      setPosts(currentPosts =>
        currentPosts.map(post => (post.id === updatedPost.id ? updatedPost : post))
      );
    } catch (error) {
      console.error('Error updating the post:', error);
    }
  };

  if (loading) {
    return <Spin />;
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <Form
      initialValues={{ title: post.title, body: post.body }}
      onFinish={onFinish}
    >
      <Form.Item
        name="title"
        label="Title"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="body"
        label="Content"
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditPost;
