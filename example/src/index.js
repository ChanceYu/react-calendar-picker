import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import './style.css';
import CalendarPicker from '../../src/CalendarPicker';

class Page extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentDate: '2017-08-09',
      showPicker: false,
      mode: 'top'
    }
  }
  onChangeDate(date){
    this.setState({
      currentDate: date
    })
  }
  showCalendarPicker(){
    let oSelect = document.getElementById('oSelect');

    this.setState({
      showPicker: true,
      mode: oSelect.value
    })
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.showCalendarPicker.bind(this)}>选择日期</button>
        <div className="info">
          <select id="oSelect">
            <option value="top">固定在顶部</option>
            <option value="bottom">固定在底部</option>
            <option value="static">静态展示</option>
          </select>
          选择的是：{this.state.currentDate}
        </div>

        <CalendarPicker
          currentDate={this.state.currentDate}
          startDate="2017-07-17"
          endDate="2018-08-18"
          onChange={this.onChangeDate.bind(this)}
          mode={this.state.mode}
          show={this.state.showPicker}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('app')
);
