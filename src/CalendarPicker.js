import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import MonthCalculator from 'month-calculator';

import './CalendarPicker.css';

import CalendarPickerHeader from './CalendarPickerHeader';
import CalendarPickerWeek from './CalendarPickerWeek';
import CalendarPickerMonth from './CalendarPickerMonth';

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
        mode: 'bottom',
        months: [],
        show: false,
        showTotal: false,
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
                    let j = 0;
                    let dates = months[i].dates;
                    let datesLen = dates.length;

                    for(; j < datesLen; j++){
                        let dateCell = dates[j];

                        if(dateCell.date === currentDate && dateCell.enabled){
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
        }, 15);
    }
    changeToToday(){
        let {todayDate, todayMonthIndex, showTotal} = this.state;
        
        this.setState({
            currentDate: todayDate,
            current: todayMonthIndex
        });

        if(typeof this.props.onChange === 'function'){
            this.props.onChange(todayDate);
        }
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
        let { currentDate, months, current, mode, show, showTotal, showTodayBtn, startDate, endDate } = this.state;
        let currentMonth = months[current] || {};
        let boxClass = 'calendar-picker';
        let title = currentMonth.title;

        if(mode) boxClass += ' ' + mode;
        if(show) boxClass += ' shown';
        if(showTotal){
            boxClass += ' show-total';
            title = startDate + ' 至 ' + endDate;
        }

        return (
            <div className={boxClass} ref="CalendarPickerBox">
                <div className="calendar-picker-box">

                    <CalendarPickerHeader
                        title={title}
                        edge={current == 0 ? 'first' : current == months.length - 1 ? 'last' : ''}
                        showTotal={showTotal}
                        showTodayBtn={showTodayBtn}
                        changeToToday={this.changeToToday.bind(this)}
                        changeToPrevMonth={this.changeToPrevMonth.bind(this)}
                        changeToNextMonth={this.changeToNextMonth.bind(this)}
                    />

                    <CalendarPickerWeek />

                    <CalendarPickerMonth
                        months={months}
                        current={current}
                        currentDate={currentDate}
                        showTotal={showTotal}
                        onChange={this.props.onChange}
                    />

                </div>
                <div className="calendar-picker-mask" onClick={this.onClickMask.bind(this)}></div>
            </div>
        )
    }
};

export default CalendarPicker;