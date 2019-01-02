import React, { Component } from 'react';
import { Form, Input, Button, Divider, Icon } from 'antd';

import { Link } from '../../../routes';

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
    render() {
        const { form } = this.props;
        return (
            <div className="container" style={styles.container}>
                <Form style={styles.form}>
                    <Form.Item>
                        {
                            form.getFieldDecorator('userId', {
                                rules: [
                                    { required: true, message: '아이디를 입력하세요.' },
                                ],
                            })(<Input placeholder="아이디를 입력하세요" />)
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            form.getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '비밀번호를 입력하세요.' },
                                ],
                            })(<Input placeholder="비밀번호를 입력하세요" />)
                        }
                    </Form.Item>
                    <Button type="primary" style={styles.login} onClick={() => {}}>{'로그인'}</Button>
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