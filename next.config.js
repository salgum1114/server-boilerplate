/* eslint-disable */
const withLess = require('@zeit/next-less');
const withOffline = require('next-offline');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');

const getRoutes = require('./src/routes');

module.exports = withTypescript(withOffline(
    withCSS(withLess({
        ...withImages(),
        exportPathMap: getRoutes,
        generateInDevMode: false,
        generateSw: false,
        workboxOpts: {
            swSrc: './src/client/service-worker.js',
        },
        lessLoaderOptions: {
            javascriptEnabled: true,
        },
    }))
));