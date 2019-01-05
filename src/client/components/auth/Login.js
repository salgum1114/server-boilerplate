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
    login: { marginBottom: 24 },
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

    onGithubLogin = () => {
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            this.register(result);
        }).catch((error) => {
            this.providerLogin(error);
        });
    }

    onGoogleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            this.register(result);
        }).catch((error) => {
            this.providerLogin(error);
        });
    }

    onFacebookLogin = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            this.register(result);
        }).catch((error) => {
            this.providerLogin(error);
        });
    }

    register = (result) => {
        client.get(`/api/users/${result.user.email}`).then((response) => {
            if (response.data.statusCode === 404) {
                const user = {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName,
                    providerId: result.user.providerData[0].providerId,
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

    providerLogin = (error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
            client.get(`/api/users/${error.email}`).then((response) => {
                if (response.data.providerId === 'google.com') {
                    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
                    .then(() => {
                        Router.pushRoute('/posts');
                    });
                } else if (response.data.providerId === 'github.com') {
                    firebase.auth().signInWithRedirect(new firebase.auth.GithubAuthProvider())
                    .then(() => {
                        Router.pushRoute('/posts');
                    });
                } else if (response.data.providerId === 'facebook.com') {
                    firebase.auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider())
                    .then(() => {
                        Router.pushRoute('/posts');
                    });
                }
            });
        }
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
                        style={{ ...styles.login, ...styles.github }}
                        onClick={this.onGithubLogin}
                    >
                        <Icon type="github" />{'Github 로그인하기'}
                    </Button>
                    <Button
                        style={{ ...styles.login, ...styles.google }}
                        onClick={this.onGoogleLogin}
                    >
                        <Icon type="google" />{'Google 로그인하기'}
                    </Button>
                    <Button
                        style={{ ...styles.login, ...styles.facebook }}
                        onClick={this.onFacebookLogin}
                    >
                        <Icon type="facebook" />{'Facebook 로그인하기'}
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Login);