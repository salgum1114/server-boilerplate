import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Divider, Icon } from 'antd';
import isEmail from 'validator/lib/isEmail';
import firebase from 'firebase/app';
import axios from 'axios';

import { Router, Link } from '../../../routes';

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
                console.log(response.user);
                axios.get(`/api/users/${response.user.email}`)
                .then((response) => {
                    console.log(response);
                });
                Router.pushRoute('/posts');
            })
            .catch((error) => {
                console.error(error);
            });
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
                    <Button style={{ ...styles.login, ...styles.github }}><Icon type="github" />{'Github 로그인하기'}</Button>
                    <Button style={{ ...styles.login, ...styles.google }}><Icon type="google" />{'Google 로그인하기'}</Button>
                    <Button style={{ ...styles.login, ...styles.facebook }}><Icon type="facebook" />{'Facebook 로그인하기'}</Button>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Login);