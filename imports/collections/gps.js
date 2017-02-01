import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'gps.insert': function(id, content) {
    Gps.insert({ _id: id, content });
    console.log(id);
  }
});

export const Gps = new Mongo.Collection('gps');
