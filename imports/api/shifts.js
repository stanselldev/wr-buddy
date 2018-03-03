import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';
import shortid from 'shortid';

export const Shifts = new Mongo.Collection('shifts');

if (Meteor.isServer) {
  Meteor.publish('shifts', function () {
    return Shifts.find();
  });
}

Meteor.methods({
  'shifts.insert' (shift) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Shifts.insert({
      _id: shortid.generate(),
      name: Meteor.user().profile.firstName,
      date: shift.date,
      start: shift.start,
      end: shift.end,
      userId: this.userId,
      requests: []
    });
  },

  'shifts.delete' (id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Shifts.remove({ _id: id});
  },

  'requests.insert' (request) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Shifts.update({ _id: request.shiftId }, {
      $push: {
        requests: {
          user: request.user,
          userId: request.userId,
          date: request.date,
          start: request.start,
          end: request.end
        }
      }
    });
  }
});
