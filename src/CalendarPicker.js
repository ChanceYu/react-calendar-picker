import React from 'react';
import moment from 'moment';
import MonthCalculator from 'month-calculator';
import './CalendarPicker.css';

import CalendarPickerHeader from './CalendarPickerHeader';
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
        mode: 'static',
        show: false,
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

        let currentDate = this.state.currentDate;

        if(currentDate){
            let i = 0;
            let monthsLen = months.length;

            loopMonth:
            for(; i < monthsLen; i++){
                if(months[i].dates){
                    let dates = months[i].dates;
                    let datesLen = dates.length;

                    for(let j = 0; j < datesLen; j++){
                        let date = dates[j].date;

                        if(date === currentDate && !date.disabled){
                            options.current = i;
                            break loopMonth;
                        }
                    }
                }
            }
        }

        this.setState(options);

        setTimeout(() => {
            let CalendarPickerBox = this.refs.CalendarPickerBox;
            let clsName = CalendarPickerBox.className;

            if(this.state.show){
                clsName += ' animated';
            }else{
                clsName = clsName.replace(' animated', '');
            }
            
            CalendarPickerBox.className = clsName;
        });
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
    onClickMask(){
        this.setState({
            show: false
        });
    }
    render () {
        let state = this.state;
        let months = state.months || [];
        let currentMonth = months[state.current] || {};
        let boxClass = 'calendar-picker';

        if(state.mode) boxClass += ' ' + state.mode;
        if(state.show) boxClass += ' shown';

        return (
            <div className={boxClass} ref="CalendarPickerBox">
                <div className="calendar-picker-box">
                    <CalendarPickerHeader
                        title={currentMonth.title}
                        showTodayBtn={state.showTodayBtn}
                        changeToToday={this.changeToToday.bind(this)}
                        changeToPrevMonth={this.changeToPrevMonth.bind(this)}
                        changeToNextMonth={this.changeToNextMonth.bind(this)}
                    />
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
                <div className="calendar-picker-mask" onClick={this.onClickMask.bind(this)}></div>
            </div>
        )
    }
};

export default CalendarPicker;