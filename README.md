# react-calendar-picker
基于React封装的Calendar日历组件
## 安装

```bash
npm install
```

## 使用

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CalendarPicker from '../../src/CalendarPicker';


class Page extends Component {
  onChangeDate(date){
    console.log(date)
  }
  render() {
    return (
      <div className="center">

        <CalendarPicker startDate="2017-07-17" endDate="2018-08-18" onChange={this.onChangeDate} />
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('app')
);

```


## 参数

- `startDate` - 开始日期
- `endDate` - 结束日期
- `currentDate` - 默认选择的日期
- `current` - 默认显示第几个月，从开始日期的月份为第一个月，默认: `0`
- `onChange` - 选中日期的回调函数


## License

[![](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/mit-license.php) 
