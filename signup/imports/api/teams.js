import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Members } from "./members";

export const Teams = new Mongo.Collection('teams');

if (Meteor.isServer) {
    Meteor.publish('teams', function() {
        return Teams.find();
    });
}

Meteor.methods({
    'teams.insert'(info) {
        // TODO: need to be more concreted
        check(info, Array);

        let members = [];
        for (let i = 1; i <= 3; ++i) {
            if (!info[i].id)
                break;
            const _id = Members.insert({
                createdAt: new Date(),
                ...info[i],
            });
            members.push({
                _id,
                name: Members.findOne({_id}).name,
            });
        }

        Teams.insert({
            createdAt: new Date(),
            pending: true,
            members,
            ...info[0],
        });
    },
});