import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

export default class ShiftItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showExpandedShift: false,
      request: {
        date: '',
        start: '',
        end: '',
        user: '',
        userId: '',
        shiftId: ''
      }
    }
  }

  deleteShift(id) {
    Meteor.call('shifts.delete', id, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  }

  showExpandedShift() {
    this.setState({ showExpandedShift: !this.state.showExpandedShift });
  }

  onSubmit(e) {
    const request = this.state.request;
    request.user = Meteor.user().profile.firstName;
    request.userId = Meteor.userId();
    request.shiftId = this.props._id;
    e.preventDefault();

    if (request) {
      Meteor.call('requests.insert', request, (err, res) => {
        if (!err) {
          this.setState({
            request: {
              date: '',
              start: '',
              end: '',
              user: '',
              userId: '',
              shiftId: ''
            }
          });
          this.showExpandedShift();
        }
      });
    } else {
      console.log(err);
    }
  }

  onChange(propertyName, e) {
    const request = this.state.request;
    request[propertyName] = e.target.value;
    this.setState({ request });
  }

  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.date}</div>
        <div>{this.props.start}</div>
        <div>{this.props.end}</div>
        <div>
          {(this.props.userId !== Meteor.userId()) ? <button onClick={this.showExpandedShift.bind(this)}>REQUEST</button> : undefined}

          {this.state.showExpandedShift ?
            <div>
              <form onSubmit={this.onSubmit.bind(this)}>
                <input
                  type="text"
                  placeholder="Date"
                  value={this.state.request.date}
                  onChange={this.onChange.bind(this, 'date')}
                />
                <input
                  type="text"
                  placeholder="Start"
                  value={this.state.request.start}
                  onChange={this.onChange.bind(this, 'start')}
                />
                <input
                  type="text"
                  placeholder="End"
                  value={this.state.request.end}
                  onChange={this.onChange.bind(this, 'end')}
                />
                <button>Add Shift</button>
              </form>
            </div> : undefined}

          {(this.props.userId === Meteor.userId()) ? <button onClick={this.deleteShift.bind(this, this.props._id)}>DELETE</button> : undefined}
        </div>
      </div>
    )
  }
}

ShiftItem.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired
}
