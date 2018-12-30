import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TuiEditor from 'tui-editor/dist/tui-editor-Viewer';

const styles = {
    container: { height: '100%' },
};

class PostViewer extends Component {
    static propTypes = {
        post: PropTypes.object,
    }

    componentDidMount() {
        this.editor = new TuiEditor({
            el: document.querySelector('#editor'),
            height: '100%',
            initialValue: this.props.post.content,
        });
    }

    render() {
        return (
            <div style={styles.container}>
                <div id="editor" />
            </div>
        );
    }
}

export default PostViewer;
