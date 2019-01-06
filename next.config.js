/* eslint-disable */
const withLess = require('@zeit/next-less');
const withOffline = require('next-offline');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css')

const getRoutes = require('./src/routes');


module.exports = withOffline(
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
);