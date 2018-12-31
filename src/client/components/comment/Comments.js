import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

const styles = {
    container: { height: '100%' },
}

class Comments extends Component {
    static propTypes = {
        post: PropTypes.object,
    }

    state = {
        loading: true,
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.setAttribute('src', 'https://utteranc.es/client.js');
        script.setAttribute('repo', 'salgum1114/blog-comments');
        script.setAttribute('branch', 'master');
        script.setAttribute('issue-term', 'pathname');
        script.setAttribute('theme', 'github-light');
        script.setAttribute('crossOrigin', 'anonymous');
        script.setAttribute('async', true);
        script.onload = () => {
            this.setState({
                loading: false,
            });
        }
        this.commentsRef.appendChild(script);
    }

    render() {
        const { loading } = this.state;
        return (
            <Spin spinning={loading}>
                <div ref={(c) => { this.commentsRef = c; }} style={styles.container} />
            </Spin>
        );
    }
}

export default Comments;
