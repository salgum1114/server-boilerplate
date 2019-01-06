import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Tabs, Avatar, Divider, Button } from 'antd';

import { Router } from '../../../routes';
import client from '../../services/client';
import Tags from '../common/Tags';

const styles = {
    container: { display: 'flex', flexDirection: 'column' },
    userContainer: { display: 'flex', flexWrap: 'wrap' },
    userAvatarContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    userAvatar: {
        width: '12rem',
        height: '12rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '6rem',
    },
    userAvatarButton: { margin: '16px 0', width: '100%' },
    userInfo: { flex: 1 },
    displayName: {
        fontSize: '1.5rem',
        fontWeight: 600,
        margin: 0,
    },
    bio: {
        lineHeight: 1.5,
        marginTop: '1rem',
        marginBottom: '1rem',
        fontSize: '1.125rem',
    },
    activityContainer: { marginTop: 32 },
};

class Profile extends Component {
    state = {
        tags: [],
    }
    
    componentWillMount() {
        if (isEmpty(this.props.currentUser)) {
            Router.pushRoute('/posts');
        }
        client.get('/api/posts', {
            email: this.props.currentUser.email
        }).then((response) => {
            console.log(response.data);
        })
        client.get('/api/posts/tags', {
            email: this.props.currentUser.email
        }).then((response) => {
            this.setState({
                tags: response.data,
            });
        })
    }

    render() {
        const { currentUser } = this.props;
        if (isEmpty(currentUser)) {
            return null;
        }
        const { tags } = this.state;
        return (
            <div className="container" style={styles.container}>
                <div style={styles.userContainer}>
                    <div className="profile-user-avatar" style={styles.userAvatarContainer}>
                        <Avatar style={styles.userAvatar} size="large" src={currentUser.photoURL}>
                            {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : ''}
                        </Avatar>
                        <Button style={styles.userAvatarButton} type="primary">{'썸네일 변경'}</Button>
                    </div>
                    <div className="profile-user-info" style={styles.userInfo}>
                        <div style={styles.displayName}>{currentUser.displayName}</div>
                        <Divider />
                        <div style={styles.bio}>{currentUser.bio || '짧은 소개를 입력하세요.'}</div>
                    </div>
                </div>
                <div style={styles.activityContainer}>
                    <h2>{'활동 내역'}</h2>
                    <Tabs>
                        <Tabs.TabPane key="posts" tab={'작성 글'}>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="tags" tab={'태그'}>
                            <Tags tags={tags} />
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default Profile;