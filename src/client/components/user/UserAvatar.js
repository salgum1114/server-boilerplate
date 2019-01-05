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
                        currentUser: currentUser.providerData[0],
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
        firebase.auth().signOut();
    }

    render() {
        const { currentUser } = this.state;
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link route="/profile"><a>{'프로필 설정'}</a></Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item>
                    <Link route="/write"><a>{'내 포스트'}</a></Link>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item>
                    <Link route="/posts"><a onClick={this.onLogout}>{'로그 아웃'}</a></Link>
                </Menu.Item>
            </Menu>
        );
        return isEmpty(currentUser) ? (
            <Avatar style={styles.avatar} onClick={() => { Router.pushRoute('/login'); }}><Icon type="user" /></Avatar>
        ) : (
            <Dropdown overlay={menu} trigger={['click']}>
                <Avatar src={currentUser.photoURL} style={styles.avatar}>
                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : ''}
                </Avatar>
            </Dropdown>
        );
    }
}

export default UserAvatar;