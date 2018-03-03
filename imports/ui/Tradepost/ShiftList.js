import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Shifts } from '../../api/shifts';
import ShiftItem from './ShiftItem';

export default class ShiftList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myShifts: [],
      openShifts: [],
      sentRequests: [],
      availableOffers: []
    }
  }

  componentDidMount() {
    this.shiftListTracker = Tracker.autorun(() => {
      Meteor.subscribe('shifts');
      const myShifts = Shifts.find({ userId: Meteor.userId() }).fetch();
      const openShifts = Shifts.find({ userId: { $ne: Meteor.userId() } }).fetch();
      const sentRequests = Shifts.find({}).fetch();

      console.log(sentRequests);
      this.setState({ myShifts, openShifts });
    });
  }

  componentWillUnmount() {
    this.shiftListTracker.stop();
  }

  renderMyShifts() {
    return this.state.myShifts.map((shift) => {
      return <ShiftItem key={shift._id} {...shift}/>
    });
  }

  renderOpenShifts() {
    return this.state.openShifts.map((shift) => {
      return <ShiftItem key={shift._id} {...shift}/>
    });
  }

  renderSentRequests() {
    // return this.state.sentRequests.map((request) => {
    //   return <ShiftItem key={shift._id} {...shift}/>
    // });
  }

  renderAvailableOffers() {

  }

  render() {
    return (
      <div>
        <div>
          <h1>My Shifts</h1>
          {this.renderMyShifts()}
        </div>
        <div>
          <h1>Available Shifts</h1>
          {this.renderOpenShifts()}
        </div>
        <div>
          <h1>Sent Requests</h1>
          {this.renderSentRequests()}
        </div>
        <div>
          <h1>Available Offers</h1>
          {this.renderAvailableOffers()}
        </div>
      </div>
    )
  }
}
