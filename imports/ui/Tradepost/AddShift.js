import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

export default class AddShift extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shift: {
        date: '',
        start: '',
        end: ''
      }
    };
  }

  onSubmit(e) {
    const shift = this.state.shift;
    e.preventDefault();

    if (shift) {
      Meteor.call('shifts.insert', shift, (err, res) => {
        if (!err) {
          this.setState({
            shift: {
              date: '',
              start: '',
              end: ''
            }
          });
        }
      });
    } else {
      console.log(err);
    }
  }

  onChange(propertyName, e) {
    const shift = this.state.shift;
    shift[propertyName] = e.target.value;
    this.setState({ shift });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            placeholder="Date"
            value={this.state.shift.date}
            onChange={this.onChange.bind(this, 'date')}
          />
          <input
            type="text"
            placeholder="Start"
            value={this.state.shift.start}
            onChange={this.onChange.bind(this, 'start')}
          />
          <input
            type="text"
            placeholder="End"
            value={this.state.shift.end}
            onChange={this.onChange.bind(this, 'end')}
          />
          <button>Add Shift</button>
        </form>
      </div>
    )
  }
}
