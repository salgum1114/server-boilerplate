import React, { Component } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Layout, Menu, Icon } from 'antd';
// import MediaQuery from 'react-mqls';

const MediaQuery = dynamic(import('react-mqls'), {
    ssr: false,
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { collapse: false };
    }

    render() {
        const { children } = this.props;
        return (
            <Layout>
                <Layout.Sider style={{ overflow: 'auto', background: '#fff', padding: 0 }}>
                    <Menu theme="light" mode="inline">
                        <Menu.Item key="home">
                            <Link href="/"><a>홈</a></Link>
                        </Menu.Item>
                        <Menu.Item key="notices">
                            <Link href="/notices"><a>공지 사항</a></Link>
                        </Menu.Item>
                        <Menu.Item key="posts">
                            <Link href="/posts"><a>포스트</a></Link>
                        </Menu.Item>
                    </Menu>
                </Layout.Sider>
                <Layout>
                    <Layout.Header style={{ background: '#fff', padding: 0 }}>
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
                    <Layout.Content>
                        {children}
                    </Layout.Content>
                </Layout>
            </Layout>
        );
    }
}
export default App;
