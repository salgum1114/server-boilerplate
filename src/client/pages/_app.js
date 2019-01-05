import App, { Container } from 'next/app';
import React from 'react';
import { LocaleProvider } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';
import NProgress from 'nprogress';
import Router from 'next/router';
import firebase from 'firebase/app';

import Layout from '../components/App';
import { initializeFirebase } from '../firebase/firebase';
import client from '../services/client';

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
        initializeFirebase();
        firebase.auth().onAuthStateChanged((currentUser) => {
            if (currentUser) {
                // const user = {
                //     uid: currentUser.uid,
                //     displayName: currentUser.displayName,
                //     photoURL: currentUser.photoURL,
                //     phoneNumber: currentUser.phoneNumber,
                //     email: currentUser.email,
                //     providerId: currentUser.providerId,
                // };
                // client.put(`/api/users/${currentUser.email}`, user).then((response) => {
                this.setState({
                    initLoading: false,
                    currentUser,
                });
                // });
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