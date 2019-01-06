import React, { Component } from 'react';
import { Avatar, Dropdown, Menu, Icon } from 'antd';
import isEmpty from 'lodash/isEmpty';
import firebase from 'firebase/app';

import { Router, Link } from '../../../routes';

const styles = {
    avatar: { margin: '0 24px', cursor: 'pointer' },
};

class UserAvatar extends Component {
    state = {
        currentUser: null,
    }

    componentDidMount() {
        if (firebase.apps.length) {
            firebase.auth().onAuthStateChanged((currentUser) => {
                if (currentUser) {
                    this.setState({
                        currentUser,
                    });
                } else {
                    this.setState({
                        currentUser: null,
                    });
                }
            });
        }
    }

    onLogout = () => {
        firebase.auth().signOut()
        .then(() => {
            Router.pushRoute('/posts');
        });
    }

    render() {
        const { currentUser } = this.state;
        if (isEmpty(currentUser)) {
            return (
                <Avatar style={styles.avatar} onClick={() => { Router.pushRoute('/login'); }}>
                    <Icon type="user" />
                </Avatar>
            );
        }
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link route="/profile"><a>{'내 프로필'}</a></Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item>
                    <a onClick={this.onLogout}>{'로그 아웃'}</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <Dropdown overlay={menu} trigger={['click']}>
                <Avatar src={currentUser.photoURL} style={styles.avatar}>
                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : ''}
                </Avatar>
            </Dropdown>
        );
    }
}

export default UserAvatar;