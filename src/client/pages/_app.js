import App, { Container } from 'next/app';
import React from 'react';
import { LocaleProvider } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';

import Layout from '../components/App';

export default class RootApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        const { statusCode } = ctx.res || {};
        return { statusCode, pageProps };
    }

    render() {
        const { Component, pageProps, statusCode } = this.props;
        return (
            <Container>
                <LocaleProvider locale={koKR}>
                    <Layout>
                        <Component pageProps={pageProps} statusCode={statusCode} />
                    </Layout>
                </LocaleProvider>
            </Container>
        );
    }
}