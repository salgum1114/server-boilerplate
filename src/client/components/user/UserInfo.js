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

class UserInfo extends Component {
    static propTypes = {
        user: PropTypes.object,
    }

    render() {
        const { user } = this.props;
        return (
            <div style={styles.container}>
                <div style={styles.avatarContainer}>
                    <Avatar style={styles.avatar} src={user.avatar} alt={user.username} size="large">{user.username.charAt(0).toUpperCase()}</Avatar>
                </div>
                <div>
                    <Link route={`/account/${user.userId}`}><a style={styles.id}>{user.userId}</a></Link>
                    <div style={styles.description}>{user.bio}</div>
                </div>
            </div>
        );
    }
}

export default UserInfo;