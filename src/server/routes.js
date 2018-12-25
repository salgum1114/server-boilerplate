module.exports = () => {
    return {
        '/': { page: '/' },
        '/notices': { page: '/notices' },
        '/posts': { page: '/posts' },
        '/posts/:id': { page: '/posts/post' },
    };
};
