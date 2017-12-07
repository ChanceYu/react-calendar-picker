# react-calendar-picker
[![Build Status](https://travis-ci.org/ChanceYu/react-calendar-picker.svg?branch=master)](https://travis-ci.org/ChanceYu/react-calendar-picker)
[![](https://img.shields.io/badge/language-JavaScript-brightgreen.svg)](https://github.com/ChanceYu/react-calendar-picker)
[![](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/mit-license.php) 

基于React封装的Calendar日历选择组件


## 预览
<div>
  <img width="320" src="preview/preview.gif" alt="react-calendar-picker" />
</div>


## 特点

- 支持左右切换月份
- 支持切换到今天（当今天在开始日期和结束日期范围之内可用）
- 支持多种显示模式展示（如图）


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
      <div>
        <CalendarPicker
          startDate="2017-07-17"
          endDate="2018-08-18"
          onChange={this.onChangeDate}
        />
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
- `current` - 默认显示第几个月，从开始日期的月份为第一个月，默认: `0`，如果有`currentDate`参数，那么按照`currentDate`的月份计算
- `onChange` - 选中日期的回调函数
- `show` - 是否显示，默认`false`
- `mode` - 显示模式，支持`top`、`bottom`、`static`三种模式，分别是固定在顶部、固定在底部、静态展示


## License

[![](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/mit-license.php) 
