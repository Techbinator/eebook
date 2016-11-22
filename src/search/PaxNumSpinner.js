import React, { Component } from 'react';
import Button               from '../common/Button';
import './PaxNumSpinner.scss'

export default class PaxNumSpinner extends Component {
  render() {
    let fromTo;
    if (this.props.to !== false) {
      fromTo = this.props.from + '-' + this.props.to;
    } else {
      fromTo = this.props.from + '+';
    }
    return (
      <div className={"paxnum-spinner " + this.props.className}>
        <div className="content" tabIndex="0">
          <label className="label">{this.props.label}</label>
          
          <div className="row compact">
            <div className="col-xs-6">
              <strong className="number">{this.props.num}</strong>
            </div>
            <div className="col-xs-6">
              <span className="range">{fromTo}<br/>{this.props.unit}</span> 
            </div>
          </div>
          
          <div className="row compact actions">
            <div className="col-xs-6">
              <Button className="default block" tabIndex={-1}>+</Button>
            </div>
            <div className="col-xs-6">
              <Button  className="default block" tabIndex={-1}>-</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PaxNumSpinner.defaultProps = {
  className: "",
  label:     "Number",
  from:      false,
  to:        false,
  unit:      "",
  num:       1
};