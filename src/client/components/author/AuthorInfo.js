import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import { Link } from '../../../routes';

const styles = {
    container: { display: 'flex', margin: '16px 0' },
    avatarContainer: { marginRight: 16 },
    avatar: {},
    id: { fontWeight: 500, color: '#212529' },
    description: { wordBreak: 'break-word', color: '#868e96' },
}

class AuthorInfo extends Component {
    static propTypes = {
        author: PropTypes.object,
    }

    render() {
        const { author } = this.props;
        return (
            <div style={styles.container}>
                <div style={styles.avatarContainer}>
                    <Avatar style={styles.avatar} src={author.avatar} alt={author.name} size="large">{author.name.charAt(0).toUpperCase()}</Avatar>
                </div>
                <div>
                    <Link route={`/account/${author.id}`}><a style={styles.id}>{author.id}</a></Link>
                    <div style={styles.description}>{author.description}</div>
                </div>
            </div>
        );
    }
}

export default AuthorInfo;