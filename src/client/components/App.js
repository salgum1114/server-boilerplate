import React, { Component } from 'react';
import Link from 'next/link';
import { Layout, Menu } from 'antd';

class App extends Component {
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
