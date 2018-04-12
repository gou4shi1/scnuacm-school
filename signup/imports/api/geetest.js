import React from 'react';
import { Meteor } from 'meteor/meteor';
import Geetest from 'gt3-sdk';

var _Geetest = new Geetest({
    geetest_id: '78d50ef0d873ded844bc1a265fdab2f5',
    geetest_key: '8f78a9ae63f05966be16f35d81ba4595'
});

Meteor.methods({
    'geetest.register'() {
        return new Promise((resolve, reject) => {
            _Geetest.register(null, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    },
    'geetest.validate'(data) {
        return new Promise((resolve, reject) => {
            _Geetest.validate(false, data, (err, success) => {
                if (err)
                    reject(err);
                else
                    resolve(success);
            })
        });
    }
});
