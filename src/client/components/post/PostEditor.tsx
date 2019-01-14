import React, { Component } from 'react';
import TuiEditor from 'tui-editor';
import { Button, Input, Select, Form, message } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { FormComponentProps } from 'antd/lib/form/Form';

import client from '../../services/client';
import Routes from '../../../routes';
import { IPost } from '../../types/post';

interface PostEditorProps {
    post: IPost,
    changeMode(writeMode: boolean): void,
};

message.config({
    top: 60,
    duration: 1.5,
})

const Router = Routes.Router;

const styles = {
    container: {},
    title: { width: '100%' } as React.CSSProperties,
    tags: { width: '100%' } as React.CSSProperties,
    category: { width: '100%' } as React.CSSProperties,
    editor: { marginBottom: 24 } as React.CSSProperties,
    cancelButton: { position: 'absolute', bottom: '24px', right: '72px' } as React.CSSProperties,
    writeButton: { position: 'absolute', bottom: '24px', right: '24px' } as React.CSSProperties,
};

class PostEditor extends Component<PostEditorProps & FormComponentProps, {}> {
    // static defaultProps: PostEditorProps = {
    //     post: {},
    //     changeMode: (mode) => { console.log(mode); },
    // }

    componentDidMount() {
        this.editor = new TuiEditor({
            el: document.querySelector('#editor'),
            height: '100%',
            initialEditType: 'wysiwyg',
            previewStyle: 'vertical',
            initialValue: this.props.post.content,
        });
    }

    backPost = () => {
        const { post, changeMode } = this.props;
        if (!isEmpty(post)) {
            Router.pushRoute(`/posts/${post._id}`).then(() => {
                changeMode(false);
            });
        } else {
            Router.pushRoute('/posts').then(() => {
                changeMode(false);
            });
        }
    }

    savePost = () => {
        const { form, post, changeMode } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                if (err.title) {
                    message.warn('제목을 확인하세요.');
                }
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
                preview: this.editor.getHtml(),
            };
            if (isEmpty(post)) {
                client.post('/api/posts', newPost).then((response) => {
                    const { _id } = response.data;
                    message.success('글쓰기 성공.')
                    Router.pushRoute(`/posts/${_id}`);
                }).catch((error) => {
                    console.error(`[ERROR] ${this.constructor.name} savePost()`, error);
                })
            } else {
                client.put(`/api/posts/${post._id}`, newPost).then((response) => {
                    const { _id } = response.data;
                    message.success('글쓰기 성공.')
                    Router.pushRoute(`/posts/${_id}`).then(() => {
                        console.log('asdfnajdfknasjfknajkfa');
                        changeMode(false);
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
            <div className="container" style={styles.container}>
                <Form>
                    <Form.Item>
                        {
                            form.getFieldDecorator('title', {
                                initialValue: post.title,
                                rules: [
                                    { required: true, min: 0, message: '제목을 입력하세요.' },
                                    { required: true, max: 100, message: '100 글자 이상 입력할 수 없습니다.' },
                                ]
                            })(<Input style={styles.title} min={0} minLength={0} max={100} maxLength={100} placeholder="제목" />)
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

export default Form.create<PostEditorProps>()(PostEditor);
