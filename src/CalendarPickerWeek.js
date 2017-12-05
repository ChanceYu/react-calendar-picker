import React from 'react';

class CalendarPickerWeek extends React.Component{
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <div className="calendar-picker-week">
                <span className="week-cell">日</span>
                <span className="week-cell">一</span>
                <span className="week-cell">二</span>
                <span className="week-cell">三</span>
                <span className="week-cell">四</span>
                <span className="week-cell">五</span>
                <span className="week-cell">六</span>
            </div>
        )
    }
};

export default CalendarPickerWeek;