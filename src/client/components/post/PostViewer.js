import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Tag, Icon } from 'antd';
import TuiEditor from 'tui-editor/dist/tui-editor-Viewer';

import AuthorInfo from '../author/AuthorInfo';
import Comments from '../comment/Comments';
import Tags from '../common/Tags';

const styles = {
    container: { height: '100%', maxWidth: 768 },
    title: { fontSize: '2.5em', lineHeight: '3.2rem', wordBreak: 'break-word' },
    createdTime: { fontSize: '1.125em', color: '#868e96', margin: '16px 0' },
    authorInfo: { margin: '32px 0 32px 0' },
    tags: { display: 'flex', alignItems: 'center', margin: '64px 0 32px 0' },
    tagsIcon: { fontSize: 18, marginRight: 16 },
};

class PostViewer extends Component {
    static propTypes = {
        post: PropTypes.object,
    }

    componentDidMount() {
        const { post } = this.props;
        this.editor = new TuiEditor({
            el: document.querySelector('#editor'),
            height: '100%',
            initialValue: post.content,
        });
    }

    render() {
        const { post } = this.props;
        return (
            <div style={styles.container}>
                <h1 style={styles.title}>{post.title}</h1>
                <div style={styles.createdTime}>{post.createdAt}</div>
                <Divider />
                <div id="editor" />
                <div style={styles.tags}>
                    <Icon type="tags" style={styles.tagsIcon} />
                    <Tags tags={post.tags} />
                </div>
                <Divider />
                <div style={styles.authorInfo}>
                    <AuthorInfo author={post.author || { name: 'Admin', id: 'admin', description: '신규 프로젝트팀에서 업무를 하고 있습니다. 프로토타이핑 및 인터렉티브한 UI 제작 작업을을 좋아합니다. 최근에는 리엑트 컴포넌트 기반의 디자인 시스템에 관심이 많습니다.', }} />
                </div>
                <Divider />
                <Comments post={post} />
            </div>
        );
    }
}

export default PostViewer;
