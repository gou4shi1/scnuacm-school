import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Members = new Mongo.Collection('members');

if (Meteor.isServer) {
    Meteor.publish('members', function() {
        return Members.find({}, {"phone": 0, "email": 0});
    });
}
// TODO: id need to be unique?
/*
Meteor.methods({
    'members.insert'(member) {
        check(member, {
            name: String,
            gender: String,
            institute: String,
            id: String,
            phone: String,
            email: String,
        });

        return Members.insert({
            createdAt: new Date(),
            ...member,
        });
    },
});
*/