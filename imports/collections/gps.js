import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'gps.insert': function(id, content) {
    Gps.insert({ id, content });
    // everytime u insert something into the db, the id of the data will be shown in the terminal
  }
});

export const Gps = new Mongo.Collection('gps');
