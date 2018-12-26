import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { Layout, Menu, Icon, BackTop } from 'antd';

import { Link } from '../../routes';
import '../styles/index.less';

const MediaQuery = dynamic(import('react-mqls'), {
    ssr: false,
});

const styles = {
    layout: { overflow: 'hidden' },
    sider: { overflow: 'auto', background: '#fff', padding: 0 },
    header: { background: '#fff', padding: 0 },
    content: { height: 'calc(100% - 64px)', overflow: 'auto' },
}

class App extends Component {
    state = {
        collapse: false,
    }

    render() {
        const { children } = this.props;
        return (
            <Layout style={styles.layout}>
                <Layout.Sider style={styles.sider}>
                    <Menu theme="light" mode="inline">
                        <Menu.Item key="home">
                            <Link route="/"><a>홈</a></Link>
                        </Menu.Item>
                        <Menu.Item key="notices">
                            <Link route="/notices"><a>공지 사항</a></Link>
                        </Menu.Item>
                        <Menu.Item key="posts">
                            <Link route="/posts"><a>포스트</a></Link>
                        </Menu.Item>
                    </Menu>
                </Layout.Sider>
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
                                component: <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />,
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
