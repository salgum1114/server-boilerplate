import App, { Container } from 'next/app';
import React from 'react';
import { LocaleProvider } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';
import NProgress from 'nprogress';
import Router from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';

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

    constructor(props) {
        super(props);
        const initializeFirebase = async () => {
            const config = {
            };
            //initialize firebase
            await firebase.initializeApp(config);
        };
        if (!firebase.apps.length) {
            initializeFirebase();
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    initLoading: false,
                    currentUser: user,
                });
            } else {
                this.setState({
                    initLoading: false,
                    currentUser: null,
                });
            }
        });
    }

    state = {
        initLoading: true,
        currentUser: null,
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
        const { currentUser, initLoading } = this.state;
        if (!initLoading) {
            const loadingEl = document.getElementById('loader');
            if (loadingEl) {
                loadingEl.style.opacity = 0;
                loadingEl.remove ? loadingEl.remove() : loadingEl.removeNode(true);
            }
            return (
                <Container>
                    <LocaleProvider locale={koKR}>
                        <Layout>
                            <Component {...other} currentUser={currentUser} />
                        </Layout>
                    </LocaleProvider>
                </Container>
            );
        }
        return null;
    }
}