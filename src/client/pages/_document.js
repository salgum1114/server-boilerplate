import Document, { Head, Main, NextScript } from 'next/document';

import ContainerLoader from '../components/loader/ContainerLoader';

export default class RootDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <html>
                <Head>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <meta charSet='utf-8' />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="/loader.css" />
                    <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/antd/3.11.2/antd.min.css' />
                    <style jsx global>
                        {`
                            body {
                                height: 100%;
                                width: 100%;
                            }
                            body > div:first-child,
                            #__next,
                            #__next > div,
                            #__next > div > div {
                                height: 100%;
                            }
                        `}
                    </style>
                </Head>
                <body>
                    <Main />
                    <ContainerLoader />
                    <NextScript />
                </body>
            </html>
        );
    }
}