import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Dropdown, Menu, Icon } from 'antd';
import isEmpty from 'lodash/isEmpty';

import { Router, Link } from '../../../routes';

const styles = {
    avatar: { margin: '0 24px', cursor: 'pointer' },
};

class UserAvatar extends Component {
    static propTypes = {
        user: PropTypes.object,
    }

    render() {
        const { user } = this.props;
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link route="/profile"><a>{'프로필 설정'}</a></Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item>
                    <Link route="/admin"><a>{'내 포스트'}</a></Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item>
                    <Link route="/posts"><a>{'로그 아웃'}</a></Link>
                </Menu.Item>
            </Menu>
        );
        return isEmpty(user) ? (
            <Avatar style={styles.avatar} onClick={() => { Router.pushRoute('/login'); }}><Icon type="user" /></Avatar>
        ) : (
            <Dropdown overlay={menu} trigger={['click']}>
                <Avatar style={styles.avatar}>{'Admin'.charAt(0).toUpperCase()}</Avatar>
            </Dropdown>
        );
    }
}

export default UserAvatar;