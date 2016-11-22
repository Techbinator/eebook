import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {/*over,*/ debounce, forEach, noop, filter } from 'lodash'
import classNames from 'classnames'
import Dropdown   from '../common/Dropdown'
import { escapeRegExp } from '../utils'

export default class AirportSearchInput extends Dropdown {
  constructor (props) {
    super(props)
    this.state = {
      airportName: "",
      airportCode: "",
      // airports: [],
      isOpen: false
    };
    this.debouncedInput = debounce(this.debouncedInput, 300);
  }

  onInput(event) {
    this.setState({ airportName: event.target.value });
    this.debouncedInput(event.target.value);
  }

  debouncedInput(value) {
    if (value == "") {
      this.setState({ isOpen: false });
      return;
    }
    this.setState({
      isOpen: true,
    //   airports: [{
    //     "label": "  Chisinau",
    //     "value": "KIV"
    //   }, {
    //     "label": " Antalya",
    //     "value": "AYT"
    //   }, {
    //     "label": " Athens",
    //     "value": "ATH"
    //   }, {
    //     "label": " Balti",
    //     "value": "BZY"
    //   }]
    });
    this.props.onInput(value);
  }

  onOptionSelected(option, index, event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      isOpen: false,
      airportName: option.label,
      airportCode: option.value
    });
    this.refs.toggle.focus();
    this.props.onOptionSelected(option, index);
  }

  onFocus() {
    if (this.state.airportCode) {
      this.setState({ isOpen:true });
    }
  }

  onBlur() {
    if (this.state.airportName && !this.state.airportCode) {
      this.setState({ airportName:"" });
    }
  }

  filterOptions() {
    let options = this.props.options;
    let query   = this.state.airportName || "";
    query = query.trim().toUpperCase();
    if( query == "") {
      return [];
    }
    query = escapeRegExp(query);

    let contains = new RegExp(query, 'ig');
    let airports = filter(options, itm => {
      return (itm.value && itm.label && (
                itm.value.toUpperCase()   === query ||
                itm.label.match(contains) !== null)); 
    });

    return airports;
  }

  renderToggle() {
    const cls = classNames(
      "input-group", {
      "disabled":   this.props.disabled,
      "has-error":  this.props.error
    });
    return (
      <div className={cls}>
        <div className="input-group-addon">
          <label>
            <i className="glyphicon glyphicon-bookmark"></i>
            &nbsp;
            {this.props.label}
          </label>
        </div>
        <input 
          ref="toggle"
          type="text" 
          className="form-control"
          placeholder={this.props.placeholder} 
          role="combobox"
          aria-autocomplete="list"
          autoComplete="off"
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          onInput={this.onInput.bind(this)}
          value={this.state.airportName}
        />
      </div>
    );
  }

  getMenuItem(option) {
    return {
      isActive: option.selected,
      key:      option.value,
      href:     "#" + option.value,
      label:    `${option.label} (${option.value})`
    };
  }

  render() {
    const cls = classNames(
      this.props.className, 
      "form-group", "dropdown", "airport-search-input",
      {"open": this.state.isOpen === true}
    );

    //      onFocus={this.openMenu.bind(this)}
    //      onBlur={this.closeMenu.bind(this)}

    return (
      <div className={cls} ref="dropdown">
        {this.renderToggle()}

        <ul className="dropdown-menu" aria-labelledby={this.id} onKeyDown={this.onKeyDown.bind(this)}>
          {this.renderMenuItems(this.filterOptions())}
        </ul>
      </div>
    );
  }
}

AirportSearchInput.defaultProps = {
  className:        "",
  options:          [],
  label:            "",
  placeholder:      "",
  disabled:         false,
  error:            false,
  onInput:          noop,
  onOptionSelected: noop  
};