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
      showTotal: false,
      mode: 'top'
    }
  }
  onChangeDate(date){
    document.title = date;
    
    this.setState({
      currentDate: date
    })
  }
  showCalendarPicker(){
    let form = document.getElementById('configForm');
    let mode = form.mode.value;
    let showTotal = form.showTotal.value;

    console.log(showTotal == 1)

    this.setState({
      showPicker: true,
      mode: mode,
      showTotal: showTotal == 1
    })
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.showCalendarPicker.bind(this)}>选择日期，当前: {this.state.currentDate}</button>
        <form id="configForm" className="form-box">
          <div className="control-box">
            <div className="control-title">显示模式</div>
            <label><input type="radio" onChange={this.showCalendarPicker.bind(this)} name="mode" value="top" />固定在顶部</label>
            <label><input type="radio" onChange={this.showCalendarPicker.bind(this)} name="mode" value="bottom" defaultChecked />固定在底部</label>
            <label><input type="radio" onChange={this.showCalendarPicker.bind(this)} name="mode" value="static" />静态展示</label>
          </div>
          <div className="control-box">
            <div className="control-title">全部显示</div>
            <label><input type="radio" onChange={this.showCalendarPicker.bind(this)} name="showTotal" value="1" />是</label>
            <label><input type="radio" onChange={this.showCalendarPicker.bind(this)} name="showTotal" value="0" defaultChecked />否</label>
          </div>
        </form>

        <CalendarPicker
          currentDate={this.state.currentDate}
          startDate="2017-07-17"
          endDate="2018-08-18"
          onChange={this.onChangeDate.bind(this)}
          mode={this.state.mode}
          showTotal={this.state.showTotal}
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
