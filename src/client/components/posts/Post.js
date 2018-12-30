import React, { Component } from 'react';
import { Button } from 'antd';
import dynamic from 'next/dynamic';

import { Router } from '../../../routes';

const PostEditor = dynamic(import('./PostEditor'), {
    ssr: false,
});

const PostViewer = dynamic(import('./PostViewer'), {
    ssr: false,
});

const styles = {
    container: { margin: '24px 48px' },
    noticeSummary: { cursor: 'pointer' },
    deleteButton: { position: 'absolute', bottom: '24px', right: '120px' },
    listButton: { position: 'absolute', bottom: '24px', right: '72px' },
    editButton: { position: 'absolute', bottom: '24px', right: '24px' },
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

    render() {
        const { pageProps } = this.props;
        const { editMode } = this.state;
        return editMode ? <PostEditor post={pageProps.post} changeMode={this.changeMode} /> : (
            <div style={styles.container}>
                <PostViewer post={pageProps.post} />
                <Button
                    style={styles.deleteButton}
                    size="large"
                    icon="delete"
                    type="danger"
                    shape="circle-outline"
                    onClick={() => { }}
                />
                <Button
                    style={styles.listButton}
                    size="large"
                    icon="bars"
                    shape="circle-outline"
                    onClick={() => { Router.pushRoute('/posts'); }}
                />
                <Button
                    style={styles.editButton}
                    size="large"
                    icon="edit"
                    type="primary"
                    shape="circle-outline"
                    onClick={() => { this.setState({ editMode: true }); }}
                />
            </div>
        );
    }
}

export default Post;
