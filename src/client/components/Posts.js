import React, { Component } from 'react';
import { List, Card, Button, Avatar } from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';

import { Link } from '../../routes';

import Tags from './common/Tags';

const PostEditor = dynamic(import('./posts/PostEditor'), {
    ssr: false,
});

const styles = {
    container: { margin: '24px 48px' },
    writeButton: { position: 'absolute', bottom: '24px', right: '24px' },
    thumbnailContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 160,
        overflow: 'hidden',
    },
};

class Posts extends Component {
    state = {
        posts: [],
        writeMode: false,
    }

    componentDidMount() {
        console.log('componentDidMount', this.props);
        this.getPosts();
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
        this.getPosts();
    }

    getPosts = () => {
        axios.get('/api/posts').then((response) => {
            this.setState({
                posts: response.data,
            });
        });
    }

    changeMode = () => {
        this.setState({
            writeMode: !this.state.writeMode,
        });
    }

    render() {
        const { posts, writeMode } = this.state;
        return writeMode ? <PostEditor changeMode={this.changeMode} /> : (
            <div style={styles.container}>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={posts}
                    renderItem={(post) => {
                        return (
                            <List.Item
                                style={styles.postSummary}
                                key={post._id}
                                extra={
                                    <Link route={`/posts/${post._id}`}>
                                        <a style={styles.thumbnailContainer}>
                                            <img
                                                width="100%"
                                                alt="logo"
                                                src={post.thumbnail && post.thumbnail.length ? post.thumbnail : 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'}
                                            />
                                        </a>
                                    </Link>
                                }
                                actions={[<Tags tags={post.tags} />]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                                    title={<Link route={`/posts/${post._id}`}><a>{post.title}</a></Link>}
                                    description={post.updatedAt}
                                />
                                {post.preview}
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
