import React from 'react';

class CalendarPickerHeader extends React.Component{
    constructor(props) {
        super(props);
        
        let state = Object.assign({}, CalendarPickerHeader.defaultProps, props);
        
        this.state = state;
    }
    static defaultProps = {
        showTodayBtn: false
    }
    componentWillReceiveProps(nextProps){
        this.setState(Object.assign({}, CalendarPickerHeader.defaultProps, nextProps));
    }
    render () {
        return (
            <div className="calendar-picker-header">
                <span className="arrow arrow-left" onClick={this.props.changeToPrevMonth}>&lt;</span>
                <span className="title-date">
                    {this.state.title}
                    {
                        this.state.showTodayBtn ?
                        <small className="title-date-today" onClick={this.props.changeToToday}>今天</small>
                        : null
                    }
                </span>
                <span className="arrow arrow-right" onClick={this.props.changeToNextMonth}>&gt;</span>
            </div>
        )
    }
};

export default CalendarPickerHeader;