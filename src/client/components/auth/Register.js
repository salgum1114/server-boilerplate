import React, { Component } from 'react';
import { Form, Input, Button, Divider, Icon, Upload } from 'antd';

import { Link } from '../../../routes';

const styles = {
    container: { height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    form: { maxWidth: 576, flex: 1, display: 'flex', flexDirection: 'column' },
    upload: { display: 'flex', justifyContent: 'center' },
}

class Login extends Component {
    state = {
        loading: false,
    }

    render() {
        const { form } = this.props;
        const { imageUrl, loading } = this.state;
        // const uploadButton = (
        //     <div>
        //         <Icon type={loading ? 'loading' : 'plus'} />
        //         <div>Upload</div>
        //     </div>
        // );
        return (
            <div className="container" style={styles.container}>
                <Form style={styles.form}>
                    {/* <Form.Item style={styles.upload}>
                        {
                            form.getFieldDecorator('avatar', {

                            })(
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                                </Upload>
                            )
                        }
                    </Form.Item> */}
                    <Form.Item label={'아이디'} colon={false}>
                        {
                            form.getFieldDecorator('userId', {
                                rules: [
                                    { required: true, message: '아이디를 입력하세요.' },
                                ],
                            })(<Input placeholder="아이디를 입력하세요" />)
                        }
                    </Form.Item>
                    <Form.Item label={'이름'} colon={false}>
                        {
                            form.getFieldDecorator('username', {
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
                    <Form.Item>
                        {
                            form.getFieldDecorator('password-checked', {
                                rules: [
                                    { required: true, message: '비밀번호를 입력하세요.' },
                                ],
                            })(<Input placeholder="비밀번호를 한번 더 입력하세요." type="password" />)
                        }
                    </Form.Item>
                    <Button type="primary" onClick={() => {}}>{'회원 가입'}</Button>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Login);