import App, { Container } from 'next/app';
import React from 'react';
import { LocaleProvider } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';
import NProgress from 'nprogress';
import Router from 'next/router';

import Layout from '../components/App';

Router.events.on('routeChangeStart', (url) => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default class RootApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        const { statusCode } = ctx.res || {};
        return { statusCode, pageProps };
    }

    componentDidMount() {
        const loadingEl = document.getElementById('loader');
        if (loadingEl) {
            loadingEl.style.opacity = 0;
            setTimeout(() => {
                loadingEl.remove ? loadingEl.remove() : loadingEl.removeNode(true);
            }, 1000);
        }
    }

    render() {
        const { Component, ...other } = this.props;
        return (
            <Container>
                <LocaleProvider locale={koKR}>
                    <Layout>
                        <Component {...other} />
                    </Layout>
                </LocaleProvider>
            </Container>
        );
    }
}