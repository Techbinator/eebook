import React, { Component } from 'react'
import classNames from 'classnames'
import {map} from 'lodash'

export default class Button extends Component {
  render() {
    const {children, className, ...rest} = this.props;
    const cls = classNames(
      "btn", 
      map(className.split(" "), cls => ("btn-" + cls))
    );
    return (
      <button className={cls} {...rest}>
        {children}
      </button>  
    );
  }  
}

Button.defaultProps = {
  className: "btn btn-default",
  type:      "button"
};
