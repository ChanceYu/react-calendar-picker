import React from 'react';
import moment from 'moment';
import MonthCalculator from 'month-calculator';
import './style.css';

import CalendarPickerWeek from './CalendarPickerWeek';

class CalendarPicker extends React.Component{
    constructor(props) {
        super(props);
        
        let state = Object.assign({}, CalendarPicker.defaultProps, props);
        
        this.state = state;
    }
    static defaultProps = {
        startDate: '',
        endDate: '',
        currentDate: '',
        format: 'YYYY-MM-DD',
        current: 0,
        onChange: null
    }
    componentDidMount(){
        this.getTotalMonths();
    }
    componentWillReceiveProps(nextProps){
        this.setState(Object.assign({}, CalendarPicker.defaultProps, nextProps), () => this.getTotalMonths());
    }
    getTotalMonths(){
        let state = this.state;

        let oMonth = new MonthCalculator({
            startDate: state.startDate,
            endDate: state.endDate,
            format: state.format
        });
        let months = oMonth.getTotal();
        let enableToday = oMonth.getToday();
        let options = {};

        options.months = months;

        if (enableToday) {
            options.showTodayBtn = true;
            options.todayMonthIndex = enableToday.monthIndex;
            options.todayDate = enableToday.date;
        }

        this.setState(options);
    }
    onClickDateCell(item){
        if(item.disabled) return;

        this.setState({
            currentDate: item.date
        });

        if(typeof this.props.onChange === 'function'){
            this.props.onChange(item.date);
        }
    }
    changeToToday(){
        this.setState({
            currentDate: this.state.todayDate,
            current: this.state.todayMonthIndex
        });
    }
    changeToPrevMonth(){
        let current = this.state.current;

        current--;
        
        if (current < 0) current = 0;

        this.setState({
            current: current
        });
    }
    changeToNextMonth(){
        let months = this.state.months;
        let current = this.state.current;

        current++;
        
        if (current >= months.length) current = months.length - 1;

        this.setState({
            current: current
        });
    }
    render () {
        let state = this.state;
        let months = state.months || [];
        let currentMonth = months[state.current] || {};

        return (
            <div className="calendar-picker static">
                <div className="calendar-picker-box">
                    <div className="calendar-picker-header">
                        <span className="arrow arrow-left" onClick={this.changeToPrevMonth.bind(this)}>&lt;</span>
                        <span className="title-date">
                            {currentMonth.title}
                            {
                                state.showTodayBtn ?
                                <small className="title-date-today" onClick={this.changeToToday.bind(this)}>今天</small>
                                : null
                            }
                        </span>
                        <span className="arrow arrow-right" onClick={this.changeToNextMonth.bind(this)}>&gt;</span>
                    </div>
                    <CalendarPickerWeek />
                    <div className="calendar-picker-month">
                        {
                            (currentMonth.dates || []).map((item, idx) => {
                                let clsName = 'date-cell';

                                if(item.disabled) clsName += ' disabled';
                                if(item.isPrevMonth) clsName += ' prev-month-day';
                                if(item.isNextMonth) clsName += ' next-month-day';
                                if(item.date == state.currentDate) clsName += ' active';
                                
                                return <span onClick={this.onClickDateCell.bind(this, item)} className={clsName} key={Date.now() + idx}>{item.day}</span>
                            })
                        }
                    </div>
                </div>
                <div className="calendar-picker-mask"></div>
            </div>
        )
    }
};

export default CalendarPicker;