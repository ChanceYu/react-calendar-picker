import React from 'react';

class CalendarPickerHeader extends React.Component{
    constructor(props) {
        super(props);
        
        let state = Object.assign({}, CalendarPickerHeader.defaultProps, props);
        
        this.state = state;
    }
    static defaultProps = {
        showTodayBtn: false,
        showTotal: false
    }
    componentWillReceiveProps(nextProps){
        this.setState(Object.assign({}, CalendarPickerHeader.defaultProps, nextProps));
    }
    render () {
        let {title, showTodayBtn, showTotal, edge} = this.state;
        
        return (
            <div className="calendar-picker-header">
                {
                    showTotal ? null
                    :
                    <span className={'arrow arrow-left ' + (edge == 'first' ? 'hidden-arrow' : '')} onClick={this.props.changeToPrevMonth}>&lt;</span>
                }
                <span className="title-date">
                    {title}
                    {
                        showTodayBtn ?
                        <small className="title-date-today" onClick={this.props.changeToToday}>今天</small>
                        : null
                    }
                </span>
                {
                    showTotal ? null
                    :
                    <span className={'arrow arrow-right ' + (edge == 'last' ? 'hidden-arrow' : '')} onClick={this.props.changeToNextMonth}>&gt;</span>
                }
            </div>
        )
    }
};

export default CalendarPickerHeader;