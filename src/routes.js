const routes = require('next-routes');

module.exports = routes()
    .add({ name: 'index', pattern: '/', page: '/' })
    .add({ name: 'login', pattern: '/login', page: '/login' })
    .add({ name: 'register', pattern: '/register', page: '/register' })
    .add({ name: 'find', pattern: '/find', page: '/find' })
    .add({ name: 'profile', pattern: '/profile', page: '/profile' })
    .add({ name: 'posts', pattern: '/posts', page: '/posts' })
    .add({ name: 'post', pattern: '/posts/:id', page: '/posts/post' })