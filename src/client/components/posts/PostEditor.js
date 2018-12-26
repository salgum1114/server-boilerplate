import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
    container: { margin: '24px 24px' },
};

class PostEditor extends Component {
    static propTypes = {
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        post: PropTypes.object,
    }

    render() {
        const { id, post } = this.props;
        return (
            <div style={styles.container}>
                PostEditor
            </div>
        );
    }
}

export default PostEditor;
