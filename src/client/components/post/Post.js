import React, { Component } from 'react';
import { Button, message, Modal } from 'antd';
import dynamic from 'next/dynamic';
import axios from 'axios';

import { Router } from '../../../routes';
import AuthButton from '../auth/AuthButton';

message.config({
    top: 60,
    duration: 1,
})

const PostEditor = dynamic(import('./PostEditor'), {
    ssr: false,
    loading: () => '',
});

const PostViewer = dynamic(import('./PostViewer'), {
    ssr: false,
    loading: () => '',
});

const styles = {
    container: { display: 'flex', justifyContent: 'center' },
    noticeSummary: { cursor: 'pointer' },
    buttonContainer: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        display: 'flex',
    },
    button: {
        margin: '0 4px',
    },
    editButton: { marginLeft: 4 },
};

class Post extends Component {
    state = {
        editMode: false,
    }

    componentDidMount() {
        console.log('componentDidMount', this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps);
    }

    changeMode = () => {
        this.setState({
            editMode: !this.state.editMode,
        });
    }

    deletePost = (id) => {
        axios.delete(`/api/posts/${id}`).then(() => {
            message.success('글 삭제 성공');
            Router.pushRoute('/posts');
        }).catch((error) => {
            console.error(`[ERROR] ${this.constructor.name} deletePost()`, error);
        });
    }

    render() {
        const { pageProps } = this.props;
        const { editMode } = this.state;
        return editMode ? <PostEditor post={pageProps.post} changeMode={this.changeMode} /> : (
            <div className="container" style={styles.container}>
                <PostViewer post={pageProps.post} />
                <div style={styles.buttonContainer}>
                    <AuthButton
                        style={styles.button}
                        size="large"
                        icon="delete"
                        type="danger"
                        shape="circle-outline"
                        compareUid={pageProps.post.user.uid}
                        onClick={() => {
                            Modal.confirm({
                                title: '글 삭제',
                                content: '글을 정말 삭제하시겠습니까?',
                                okText: '확인',
                                cancelText: '취소',
                                onOk: () => this.deletePost(pageProps.post._id),
                            });
                        }}
                    />
                    <Button
                        style={styles.button}
                        size="large"
                        icon="bars"
                        shape="circle-outline"
                        onClick={() => { Router.pushRoute('/posts'); }}
                    />
                    <AuthButton
                        style={styles.editButton}
                        size="large"
                        icon="edit"
                        type="primary"
                        shape="circle-outline"
                        compareUid={pageProps.post.user.uid}
                        onClick={() => { this.setState({ editMode: true }); }}
                    />
                </div>
            </div>
        );
    }
}

export default Post;
