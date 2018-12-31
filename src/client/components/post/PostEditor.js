import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TuiEditor from 'tui-editor';
import { Button, Input, Select, Form, message } from 'antd';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

import { Router } from '../../../routes';

message.config({
    top: 60,
    duration: 1.5,
})

const styles = {
    container: { margin: '24px 48px', height: 'calc(100% - 48px)' },
    title: { width: '100%' },
    tags: { width: '100%' },
    category: { width: '100%' },
    editor: { marginBottom: 24 },
    cancelButton: { position: 'absolute', bottom: '24px', right: '72px' },
    writeButton: { position: 'absolute', bottom: '24px', right: '24px' },
};

class PostEditor extends Component {
    static propTypes = {
        post: PropTypes.object,
        changeMode: PropTypes.func,
    }

    static defaultProps = {
        post: {},
    }

    componentDidMount() {
        this.editor = new TuiEditor({
            el: document.querySelector('#editor'),
            height: '100%',
            initialEditType: 'markdown',
            previewStyle: 'vertical',
            initialValue: this.props.post.content,
        });
    }

    backPost = () => {
        const { post, changeMode } = this.props;
        if (!isEmpty(post)) {
            Router.pushRoute(`/posts/${post._id}`).then(() => {
                changeMode();
            });
        } else {
            Router.pushRoute('/posts').then(() => {
                changeMode();
            });
        }
    }

    savePost = () => {
        const { form, post, changeMode } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                console.error(err);
                return;
            }
            const content = this.editor.getValue();
            if (!content || content && !content.length) {
                message.warn('내용을 입력하세요.');
                return;
            }
            const { title, tags, category } = values;
            const newPost = {
                title,
                tags,
                category,
                content: content.concat('\n'),
                preview: this.editor.getHtml().concat('\n'),
            };
            if (isEmpty(post)) {
                axios.post('/api/posts', newPost).then((response) => {
                    const { _id } = response.data;
                    message.success('글쓰기 성공.')
                    Router.pushRoute(`/posts/${_id}`);
                }).catch((error) => {
                    console.error(`[ERROR] ${this.constructor.name} savePost()`, error);
                })
            } else {
                axios.put(`/api/posts/${post._id}`, newPost).then((response) => {
                    const { _id } = response.data;
                    message.success('글쓰기 성공.')
                    Router.pushRoute(`/posts/${_id}`).then(() => {
                        console.log('asdfnajdfknasjfknajkfa');
                        changeMode();
                    });
                }).catch((error) => {
                    console.error(`[ERROR] ${this.constructor.name} savePost()`, error);
                })
            }
        });
    }

    render() {
        const { form, post } = this.props;
        return (
            <div style={styles.container}>
                <Form>
                    <Form.Item>
                        {
                            form.getFieldDecorator('title', {
                                initialValue: post.title,
                                rules: [
                                    { required: true, min:0, message: '제목을 입력하세요.' },
                                ]
                            })(<Input style={styles.title} min={0} minLength={0} placeholder="제목" />)
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            form.getFieldDecorator('tags', {
                                initialValue: post.tags,
                            })(<Select style={styles.tags} mode="tags" placeholder="태그" />)
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            form.getFieldDecorator('category', {
                                initialValue: post.category || 'etc',
                                rules: [
                                    { required: true, message: '카테고리를 선택하세요.' },
                                ],
                            })(<Select style={styles.category} placeholder="카테고리" />)
                        }
                    </Form.Item>
                </Form>
                <div id="editor" style={styles.editor} />
                <Button
                    style={styles.cancelButton}
                    size="large"
                    icon="close"
                    type="danger"
                    shape="circle-outline"
                    onClick={this.backPost}
                />
                <Button
                    style={styles.writeButton}
                    size="large"
                    icon="check"
                    type="primary"
                    shape="circle-outline"
                    onClick={this.savePost}
                />
            </div>
        );
    }
}

export default Form.create()(PostEditor);
