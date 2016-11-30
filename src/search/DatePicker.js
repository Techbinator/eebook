import React, { Component } from 'react'
import Button from '../common/Button'
import CloseButton from '../common/CloseButton'
import { isFunction, noop } from 'lodash'
import classNames from 'classnames'
import moment from 'moment';

import './DatePicker.scss'

//https://github.com/clauderic/react-infinite-calendar

export default class DatePicker extends Component {

  prepareDate(){
    if( this.props.date){
      const date = moment(this.props.date);
      return {
        year: date.year(),
        month: date.format('MMM'),
        day: date.format('DD')
      }
    }
    return {
      year: '',
      month: '',
      day: ''
    }
  }

  onChangeDate() {
    // console.log("DatePicker::onChangeDate");
    this.props.onChangeDate();
  }

  render() {
    let closeButton = null;
    const cls = classNames(
      "date-picker",
      this.props.className,
      { "disabled": this.props.disabled }
    );

    if (isFunction(this.props.toggleDisabled)) {
      closeButton = <CloseButton onClick={this.props.toggleDisabled}/>;
    }

    let formatedDate = this.prepareDate();

    return (
      <div className={cls}>
        {closeButton}
        <label className="label">{this.props.label}</label>
        <div className="row compact">
          <div className="col-xs-6 text-right">
            <strong className="day">{formatedDate.day}</strong>
          </div>
          <div className="col-xs-6">
            <span className="month-year">{formatedDate.month}<br/>{formatedDate.year}</span>
          </div>
        </div>
        <Button
            className="default block"
            onClick={this.onChangeDate.bind(this)}
            disabled={this.props.disabled}>
          Change Date
        </Button>
      </div>
    );
  }
}

DatePicker.defaultProps = {
  className:      "",
  label:          "Date",
  disabled:       false,
  toggleDisabled: null,
  date: false
};
