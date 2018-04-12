import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Geetest from './geetest'

export default class Captcha extends Component {
    state = {
        hasRegisted: false,
        geetest: {
            gt: '',
            challenge: '',
            success: 0,
        },
        success : false,
    };

    componentWillMount() {
        Meteor.call('geetest.register', (err, data) => {
            if (!err) {
                this.setState({
                    hasRegisted: true,
                    geetest: data
                })
            }
        });
    }

    handlerGeetest = (data) => {
        Meteor.call('geetest.validate', data, (err, success) => {
            if (!err) {
                this.setState({ success: success});
            }
        });
    };

    render() {
        return (
            <div>
            {
                this.state.hasRegisted ?
                <Geetest
                    gt={this.state.geetest.gt}
                    challenge={this.state.geetest.challenge}
                    success={this.state.geetest.success}
                    onSuccess={this.handlerGeetest}
                /> : ''
            }
            </div>
        );
    }
};