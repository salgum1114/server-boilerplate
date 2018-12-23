/* eslint-disable */
const withLess = require('@zeit/next-less');
const getRoutes = require('./src/server/routes');

module.exports = {
    exportPathMap: getRoutes,
    ...withLess(),
};