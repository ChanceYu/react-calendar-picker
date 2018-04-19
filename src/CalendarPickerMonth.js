import React from 'react';

class CalendarPickerMonth extends React.Component{
    constructor(props) {
        super(props);
        
        let state = Object.assign({}, CalendarPickerMonth.defaultProps, props);
        
        this.state = state;
    }
    static defaultProps = {
        months: [],
        current: 0,
        showTotal: false
    }
    componentWillReceiveProps(nextProps){
        this.setState(Object.assign({}, CalendarPickerMonth.defaultProps, nextProps));
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
    render () {
        let { currentDate, months, current, showTotal } = this.state;
        let currentMonth = months[current] || {};

        let _months = [];

        if(showTotal){
            _months = months;
        }else{
            _months = [currentMonth];
        }

        return (
            <div className="calendar-picker-month-box">
                {
                    _months.map((monthItem, idx) => {
                        return <div className="calendar-picker-month-item" key={Date.now() + idx}>
                                {
                                    showTotal ?
                                    <div className="calendar-picker-month-title">{monthItem.title}</div>
                                    :
                                    null
                                }
                                <div className="calendar-picker-month">
                                {
                                    (monthItem.dates || []).map((item, idx) => {
                                        let clsName = 'date-cell';
            
                                        if(item.disabled) clsName += ' disabled';
                                        if(item.isPrevMonth) clsName += ' prev-month-day';
                                        if(item.isNextMonth) clsName += ' next-month-day';
                                        if(item.date == currentDate) clsName += ' active';
                                        
                                        return <span onClick={this.onClickDateCell.bind(this, item)} className={clsName} key={Date.now() + idx}>{item.day}</span>
                                    })
                                }
                            </div>
                        </div>
                    })
                }
            </div>
        )
    }
};

export default CalendarPickerMonth;