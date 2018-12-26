const routes = require('next-routes');

module.exports = routes()
    .add({ name: 'index', pattern: '/', page: '/' }) 
    .add({ name: 'posts', pattern: '/posts', page: '/posts' })
    .add({ name: 'post', pattern: '/posts/:id', page: '/posts/post' });