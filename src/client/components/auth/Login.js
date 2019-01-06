import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Divider, Icon } from 'antd';
import isEmail from 'validator/lib/isEmail';
import firebase from 'firebase/app';

import { Router, Link } from '../../../routes';
import client from '../../services/client';

const styles = {
    container: { height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    form: { maxWidth: 576, flex: 1, display: 'flex', flexDirection: 'column' },
    register: { display: 'flex', justifyContent: 'space-evenly' },
    login: { marginBottom: 24, height: 48, fontSize: '1.25em', fontWeight: 500 },
    github: { background: '#e9ecef', color: '#212529', border: '1px solid #ced4da' },
    google: { background: '#c92a2a', color: '#fff', border: '1px solid #d72020' },
    facebook: { background: '#1971c2', color: '#fff', border: '1px solid #1864ab' },
}

class Login extends Component {
    static propTypes = {
        currentUser: PropTypes.object,
    }
    
    componentWillMount() {
        if (this.props.currentUser) {
            Router.pushRoute('/posts');
        }
    }

    getProvider = (method) => {
        switch (method) {
            case 'password':
                return new firebase.auth.EmailAuthProvider();
            case 'github.com':
                return new firebase.auth.GithubAuthProvider();
            case 'google.com':
                return new firebase.auth.GoogleAuthProvider();
            case 'facebook.com':
                return new firebase.auth.FacebookAuthProvider();
        }
    }

    onLogin = () => {
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then((response) => {
                Router.pushRoute('/posts');
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }

    onProviderLogin = (method, error) => {
        if (error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                var pendingCred = error.credential;
                var email = error.email;
                firebase.auth().fetchSignInMethodsForEmail(email).then((methods) => {
                    const provider = this.getProvider(methods[0]);
                    firebase.auth().signInWithRedirect(provider)
                    .then((result) => {
                        result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
                            Router.pushRoute('/posts');
                        });
                    });
                });
            }
            return;
        }
        const provider = this.getProvider(method);
        firebase.auth().signInWithPopup(provider).then((result) => {
            this.onRegister(result);
        }).catch((error) => {
            this.onProviderLogin(null, error);
        });
    }

    onRegister = (result) => {
        client.get(`/api/users/${result.user.email}`).then((response) => {
            if (response.data.statusCode === 404) {
                const user = {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    phoneNumber: result.user.phoneNumber,
                    photoURL: result.user.photoURL,
                    role: 'user',
                };
                client.post('/api/users', user)
                .then(() => {
                    Router.pushRoute('/posts');
                });
            } else {
                Router.pushRoute('/posts');
            }
        });
    }

    validateEmail = (rule, value, callback) => {
        const validate = isEmail(value);
        if (validate) {
            callback();
        } else {
            callback('이메일 형식에 맞지 않습니다.')
        }
    }

    render() {
        const { form, currentUser } = this.props;
        if (currentUser) {
            return null;
        }
        return (
            <div className="container" style={styles.container}>
                <Form style={styles.form}>
                    <Form.Item>
                        {
                            form.getFieldDecorator('email', {
                                rules: [
                                    { required: true, message: '이메일을 입력하세요.' },
                                    { validator: this.validateEmail },
                                ],
                            })(<Input placeholder="이메일을 입력하세요" />)
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            form.getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '비밀번호를 입력하세요.' },
                                ],
                            })(<Input type="password" placeholder="비밀번호를 입력하세요" />)
                        }
                    </Form.Item>
                    <Button type="primary" style={styles.login} onClick={this.onLogin}>{'로그인'}</Button>
                    <div style={styles.register}>
                        <Link route="/register"><a>{'회원 가입'}</a></Link>
                        <Link route="/find"><a>{'아이디 / 비밀번호 찾기'}</a></Link>
                    </div>
                    <Divider>{'또는'}</Divider>
                    <Button
                        size="large"
                        style={{ ...styles.login, ...styles.github }}
                        onClick={() => { this.onProviderLogin('github.com'); } }
                    >
                        <Icon type="github" />{'Github 로그인하기'}
                    </Button>
                    <Button
                        size="large"
                        style={{ ...styles.login, ...styles.google }}
                        onClick={() => { this.onProviderLogin('google.com'); } }
                    >
                        <Icon type="google" />{'Google 로그인하기'}
                    </Button>
                    <Button
                        size="large"
                        style={{ ...styles.login, ...styles.facebook }}
                        onClick={() => { this.onProviderLogin('facebook.com'); } }
                    >
                        <Icon type="facebook" />{'Facebook 로그인하기'}
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Login);