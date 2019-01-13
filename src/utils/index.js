export default {
    matchesImage: str => str.match(`<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>`),
};