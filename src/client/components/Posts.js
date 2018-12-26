import React, { Component } from 'react';
import { List, Card, Button, Avatar } from 'antd';
import axios from 'axios';

import { Router } from '../../routes';

import Tags from './common/Tags';

const styles = {
    container: { margin: '24px 48px' },
    editButton: { position: 'absolute', bottom: '24px', right: '24px' },
};

class Posts extends Component {
    state = {
        posts: [],
    }

    componentDidMount() {
        axios.get('/api/posts').then((response) => {
            this.setState({
                posts: response.data,
            });
        })
    }

    render() {
        const { posts } = this.state;
        return (
            <div style={styles.container}>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={posts}
                    renderItem={(post) => {
                        return (
                            <List.Item
                                onClick={() => { Router.pushRoute(`/posts/${post._id}`); }}
                                key={post._id}
                                extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                                actions={[<Tags tags={post.tags} />]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                                    title={post.title}
                                    description={post.updatedAt}
                                />
                                {post.content}
                            </List.Item>
                        );
                    }}
                />
                <Button
                    style={styles.editButton}
                    size="large"
                    icon="edit"
                    shape="circle-outline"
                />
            </div>
        );
    }
}

export default Posts;
