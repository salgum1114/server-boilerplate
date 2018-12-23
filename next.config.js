/* eslint-disable */
const withLess = require('@zeit/next-less');
const withOffline = require('next-offline');
const { resolve } = require('path');

const getRoutes = require('./src/server/routes');

module.exports = withOffline({
    exportPathMap: getRoutes,
    ...withLess(),
    generateInDevMode: true,
    // devSwSrc: './src/client/service-worker.js',
    generateSw: false,
    workboxOpts: {
        swSrc: './src/client/service-worker.js',
    },
});