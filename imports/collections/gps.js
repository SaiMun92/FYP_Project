import { Mongo } from 'meteor/mongo';

// creating the mongoDB database -> name it Employees
Meteor.methods({
  'gps.insert': function(id, content) {
    Gps.insert({ _id: id, content });
    console.log(id);
  }
});

export const Gps = new Mongo.Collection('gps');
