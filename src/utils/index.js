module.exports = {
    matchesImage: str => str.match(`<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>`),
};