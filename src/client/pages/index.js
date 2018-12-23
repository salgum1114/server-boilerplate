import React, { Component } from 'react';

import Home from '../components/Home';
import registerServiceWorker from '../registerServiceWorker';

export default class extends Component {
    componentDidMount() {
        registerServiceWorker();
    }

    render() {
        return <Home {...this.props} />;
    }
}
