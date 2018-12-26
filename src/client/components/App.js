import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { Layout, Menu, Icon, BackTop, Drawer } from 'antd';

import { Link } from '../../routes';
import '../styles/index.less';

const MediaQuery = dynamic(import('react-mqls'), {
    ssr: false,
});

const styles = {
    layout: { overflow: 'hidden' },
    sider: { overflow: 'auto', background: '#fff', padding: 0 },
    drawer: { padding: 24, background: 'green' },
    header: { background: '#fff', padding: 0 },
    content: { height: 'calc(100% - 64px)', overflow: 'auto' },
    menuIcon: { margin: '0 24px', cursor: 'pointer' },
}

class App extends Component {
    state = {
        collapsed: false,
    }

    onClose = () => this.setState({ collapsed: false });

    render() {
        const { children } = this.props;
        const { collapsed } = this.state;
        return (
            <Layout style={styles.layout}>
                <MediaQuery
                    queries={[
                        {
                            query: '(min-width: 768px)',
                            component: (
                                <Layout.Sider style={styles.sider}>
                                    <Menu theme="light" mode="inline">
                                        <Menu.Item key="home">
                                            <Link prefetch route="/"><a>홈</a></Link>
                                        </Menu.Item>
                                        <Menu.Item key="notices">
                                            <Link prefetch route="/notices"><a>공지 사항</a></Link>
                                        </Menu.Item>
                                        <Menu.Item key="posts">
                                            <Link prefetch route="/posts"><a>포스트</a></Link>
                                        </Menu.Item>
                                    </Menu>
                                </Layout.Sider>
                            ),
                        },
                        {
                            query: '(max-width: 767px)',
                            component: (
                                <Drawer
                                    title="Totalog"
                                    placement="left"
                                    style={styles.drawer}
                                    visible={collapsed}
                                    closable={false}
                                    onClose={this.onClose}
                                >
                                    <Menu theme="light" mode="inline">
                                        <Menu.Item key="home" onClick={this.onClose}>
                                            <Link route="/"><a>홈</a></Link>
                                        </Menu.Item>
                                        <Menu.Item key="notices" onClick={this.onClose}>
                                            <Link route="/notices"><a>공지 사항</a></Link>
                                        </Menu.Item>
                                        <Menu.Item key="posts" onClick={this.onClose}>
                                            <Link route="/posts"><a>포스트</a></Link>
                                        </Menu.Item>
                                    </Menu>
                                </Drawer>
                            ),
                        },
                    ]}
                />
                <Layout>
                    <Layout.Header style={styles.header}>
                    <MediaQuery
                        queries={[
                            {
                                query: '(min-width: 768px)',
                                component: null,
                            },
                            {
                                query: '(max-width: 767px)',
                                component: (
                                    <Icon
                                        type="menu-unfold"
                                        style={styles.menuIcon}
                                        onClick={() => { this.setState({ collapsed: true }); }}
                                    />
                                ),
                            },
                        ]}
                    />
                    </Layout.Header>
                    <Layout.Content style={styles.content}>
                        <BackTop>UP</BackTop>
                        {children}
                    </Layout.Content>
                </Layout>
            </Layout>
        );
    }
}
export default App;
