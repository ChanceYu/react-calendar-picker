import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CalendarPicker from '../../src/CalendarPicker';

class Page extends Component {
  onChangeDate(date){
    console.log(date)
  }
  render() {
    return (
      <div>
        <CalendarPicker
          startDate="2017-07-17"
          endDate="2018-08-18"
          onChange={this.onChangeDate}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('app')
);
