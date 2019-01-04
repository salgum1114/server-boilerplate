import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import firebase from 'firebase/app';

import { Router } from '../../../routes';

const styles = {
    container: { height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    form: { maxWidth: 576, flex: 1, display: 'flex', flexDirection: 'column' },
    upload: { display: 'flex', justifyContent: 'center' },
}

class Login extends Component {
    componentWillMount() {
        if (this.props.currentUser) {
            Router.pushRoute('/posts');
        }
    }

    onRegister = () => {
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            axios.post('/api/register', values)
            .then((response) => {
                firebase.auth().signInWithEmailAndPassword(values.email, values.password)
                .then((response) => {
                    Router.pushRoute('/posts');
                })
                .catch((error) => {
                    console.error(error);
                });
            })
            .catch(error => console.error(error));
        });
    }

    render() {
        const { form, currentUser } = this.props;
        if (currentUser) {
            return null;
        }
        return (
            <div className="container" style={styles.container}>
                <Form style={styles.form}>
                    <Form.Item label={'이름'} colon={false}>
                        {
                            form.getFieldDecorator('displayName', {
                                rules: [
                                    { required: true, message: '이름을 입력하세요.' },
                                ],
                            })(<Input placeholder="이름을 입력하세요" />)
                        }
                    </Form.Item>
                    <Form.Item label={'이메일'} colon={false}>
                        {
                            form.getFieldDecorator('email', {
                                rules: [
                                    { required: true, message: '이메일을 입력하세요.' },
                                ],
                            })(<Input placeholder="이메일을 입력하세요" />)
                        }
                    </Form.Item>
                    <Form.Item label={'비밀번호'} colon={false}>
                        {
                            form.getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '비밀번호를 입력하세요.' },
                                ],
                            })(<Input placeholder="비밀번호를 입력하세요" type="password" />)
                        }
                    </Form.Item>
                    <Button type="primary" onClick={this.onRegister}>{'회원 가입'}</Button>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Login);