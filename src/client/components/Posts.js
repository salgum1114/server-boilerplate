import React, { Component } from 'react';
import { List, Card, Button, Avatar } from 'antd';
import axios from 'axios';

import { Router, Link } from '../../routes';

import Tags from './common/Tags';
import PostEditor from './posts/PostEditor';

const styles = {
    container: { margin: '24px 48px' },
    writeButton: { position: 'absolute', bottom: '24px', right: '24px' },
    postSummary: { cursor: 'pointer' },
};

class Posts extends Component {
    state = {
        posts: [],
        writeMode: false,
    }

    componentDidMount() {
        axios.get('/api/posts').then((response) => {
            this.setState({
                posts: response.data,
            });
        })
    }

    render() {
        const { posts, writeMode } = this.state;
        return writeMode ? <PostEditor /> : (
            <div style={styles.container}>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={posts}
                    renderItem={(post) => {
                        return (
                            <List.Item
                                onClick={() => { Router.pushRoute(`/posts/${post._id}`); }}
                                style={styles.postSummary}
                                key={post._id}
                                extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                                actions={[<Tags tags={post.tags} />]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                                    title={<Link route={`/posts/${post._id}`}><a>{post.title}</a></Link>}
                                    description={post.updatedAt}
                                />
                                {post.content}
                            </List.Item>
                        );
                    }}
                />
                <Button
                    style={styles.writeButton}
                    size="large"
                    icon="edit"
                    type="primary"
                    shape="circle-outline"
                    onClick={() => { this.setState({ writeMode: true }); }}
                />
            </div>
        );
    }
}

export default Posts;
