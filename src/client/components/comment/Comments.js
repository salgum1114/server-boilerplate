import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
    container: { height: '100%' },
}

class Comments extends Component {
    static propTypes = {
        post: PropTypes.object,
        comments: PropTypes.array,
    }

    static defaultProps = {
        comments: [],
    }

    render() {
        const { post } = this.props;
        return (
            // <div style={styles.container}>
                <script
                    src="https://utteranc.es/client.js"
                    repo="salgum1114/blog-comments"
                    issue-term="pathname"
                    theme="github-light"
                    crossOrigin="anonymous"
                    async
                >
                </script>
            // </div>
        );
    }
}

export default Comments;
