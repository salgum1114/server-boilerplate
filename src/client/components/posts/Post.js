import React, { Component } from 'react';
import { Button } from 'antd';

import PostEditor from './PostEditor';

const styles = {
    container: { margin: '24px 24px' },
    editButton: { position: 'absolute', bottom: '24px', right: '24px' },
    noticeSummary: { cursor: 'pointer' },
};

class Post extends Component {
    state = {
        editMode: false,
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        const { editMode } = this.state;
        return editMode ? <PostEditor /> : (
            <div style={styles.container}>
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
