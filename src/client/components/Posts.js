import React, { Component } from 'react';
import { List, Card, Button, Avatar, Col, Row } from 'antd';
import axios from 'axios';
import dynamic from 'next/dynamic';

import { Router, Link } from '../../routes';

import Tags from './common/Tags';

const PostEditor = dynamic(import('./post/PostEditor'), {
    ssr: false,
    loading: () => '',
});

const styles = {
    container: { height: '100%' },
    writeButton: { position: 'absolute', bottom: '24px', right: '24px' },
    thumbnail: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 160,
        overflow: 'hidden',
    },
    title: { wordBreak: 'break-word' },
    card: { margin: '16px 0' },
    cardBody: { height: '12rem' },
    cardCover: {
        width: '100%',
        paddingTop: '56.25%',
        position: 'relative',
        display: 'block',
    },
    cardThumbnail: {
        OObjectFit: 'cover',
        objectFit: 'cover',
        display: 'block',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    cardPreview: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        wordWrap: 'break-word',
        marginTop: '1.5rem',
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
        this.changeMode(false);
        // this.getPosts();
    }

    getPosts = (callback) => {
        axios.get('/api/posts').then((response) => {
            this.setState({
                posts: response.data,
                writeMode: false,
            }, () => {
                if (callback) {
                    callback();
                }
            });
        });
    }

    changeMode = (writeMode) => {
        this.setState({
            writeMode,
        });
    }

    renderList = () => {
        const { posts } = this.state;
        return (
            <List
                itemLayout="vertical"
                size="large"
                locale={{ emptyText: '' }}
                dataSource={posts}
                renderItem={(post) => {
                    return (
                        <List.Item
                            key={post._id}
                            extra={
                                <Link route={`/posts/${post._id}`}>
                                    <a style={styles.thumbnail}>
                                        <img
                                            width="100%"
                                            alt="logo"
                                            src={post.thumbnail && post.thumbnail.length ? post.thumbnail : 'https://cdn.shopify.com/s/files/1/1380/9193/t/3/assets/no-image.svg?2375582141201571545'}
                                        />
                                    </a>
                                </Link>
                            }
                            actions={[<Tags tags={post.tags} />]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                                title={
                                    <Link route={`/posts/${post._id}`}>
                                        <a style={styles.title}>{post.title.length > 30 ? post.title.substring(0, 30).concat('...') : post.title}
                                        </a>
                                    </Link>
                                }
                                description={post.updatedAt}
                            />
                            {post.preview}
                        </List.Item>
                    );
                }}
            />
        );
    }

    renderCard = () => {
        const { posts } = this.state;
        return (
            posts.map((post) => {
                return (
                    <Col key={post._id} className="container-col" xs={24} md={24} lg={12} xl={8} xxl={6}>
                        <Card
                            hoverable
                            onClick={() => { Router.pushRoute(`/posts/${post._id}`); }}
                            cover={
                                <Link route={`/posts/${post._id}`}>
                                    <a style={styles.cardCover}>
                                        <img
                                            style={styles.cardThumbnail}
                                            alt="logo"
                                            src={post.thumbnail && post.thumbnail.length ? post.thumbnail : 'https://cdn.shopify.com/s/files/1/1380/9193/t/3/assets/no-image.svg?2375582141201571545'}
                                        />
                                    </a>
                                </Link>
                            }
                            bodyStyle={styles.cardBody}
                        >
                            <Card.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={post.title.length > 30 ? post.title.substring(0, 30).concat('...') : post.title}
                                description={post.updatedAt}
                            />
                            <div style={styles.cardPreview}>
                                {post.preview}
                            </div>
                        </Card>
                    </Col>
                );
            })
        );
    }

    render() {
        const { writeMode } = this.state;
        return writeMode ? <PostEditor changeMode={this.changeMode} /> : (
            <>
                <div className="container" style={styles.container}>
                    {this.renderCard()}
                </div>
                <Button
                    style={styles.writeButton}
                    size="large"
                    icon="edit"
                    type="primary"
                    shape="circle-outline"
                    onClick={() => { this.setState({ writeMode: true }); }}
                />
            </>
        );
    }
}

export default Posts;
