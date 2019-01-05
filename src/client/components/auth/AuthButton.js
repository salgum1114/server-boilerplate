import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import firebase from 'firebase/app';

class AuthButton extends Component {
    static propTypes = {
        compareUid: PropTypes.string,
    }
    
    state = {
        auth: false,
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((currentUser) => {
            if (!currentUser) {
                this.setState({
                    auth: false,
                });
            } else {
                this.setState({
                    auth: this.props.compareUid ? currentUser.uid === this.props.compareUid : true,
                });
            }
        })
    }

    render() {
        const { children, compareUid, ...other } = this.props;
        const { auth } = this.state;
        return auth ? (
            <Button {...other} >
                {children}
            </Button>
        ) : null;
    }
}

export default AuthButton;