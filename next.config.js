/* eslint-disable */
const withLess = require('@zeit/next-less');
const withOffline = require('next-offline');
const { resolve } = require('path');

const getRoutes = require('./src/routes');

module.exports = withOffline({
    ...withLess(),
    exportPathMap: getRoutes,
    generateInDevMode: false,
    generateSw: false,
    workboxOpts: {
        swSrc: './src/client/service-worker.js',
    },
});