import React, { Component } from 'react';

// import Home from '../components/Home';
import Posts from '../components/Posts';
import registerServiceWorker from '../registerServiceWorker';

export default class extends Component {
    componentDidMount() {
        registerServiceWorker();
    }

    render() {
        return <Posts {...this.props} />;
    }
}
