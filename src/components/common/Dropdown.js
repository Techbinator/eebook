import React, { Component } from 'react'
import ReactDOM   from 'react-dom'
import classNames from 'classnames'
import {isString, debounce, forEach, uniqueId, noop, keys} from 'lodash'

// List of all mounted instances
var ddInstances = {};

const ESCAPE_KEYCODE           = 27 // KeyboardEvent.which value for Escape (Esc) key
const ARROW_UP_KEYCODE         = 38 // KeyboardEvent.which value for up arrow key
const ARROW_DOWN_KEYCODE       = 40 // KeyboardEvent.which value for down arrow key
// const TAB_KEYCODE              = 9;

export default class Dropdown extends Component {
  constructor (props) {
    super(props);
    this.id = this.id || uniqueId("dropdown-");
    this.items = []; // array of DOM items
    this.state = {
      isOpen: false
    };
  }

  static onDocumentClick (event) {
    forEach(ddInstances, dd => {
        if (
          dd.state.isOpen &&
          dd.refs.dropdown.contains(event.target) == false // ReactDOM.findDOMNode(dd)
        ) {
          dd.closeMenu();
        }
    });
  }

  static register(dd) {
    ddInstances[dd.id] = dd;
    if (keys(ddInstances).length === 1) {
      document.addEventListener('click',    Dropdown.onDocumentClick, false);
      // document.addEventListener('touchend', Dropdown.onDocumentClick, false);
    }
  };

  static unregister(dd) {
    ddInstances[dd.id] = null;
    if (keys(ddInstances).length < 1) {
      document.removeEventListener('click',    Dropdown.onDocumentClick, false);
      // document.removeEventListener('touchend', Dropdown.onDocumentClick, false);
    }
  }

  componentDidMount() {
    Dropdown.register(this);
  }

  componentWillUnmount() {
    Dropdown.unregister(this);
  }

  openMenu() {
    this.setState({ isOpen:true });
  }

  closeMenu() {
    this.setState({ isOpen:false });   
  }

  toggleMenu() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onOptionSelected(option, index, event) {
    event.preventDefault();
    event.stopPropagation();
    this.closeMenu();
    this.props.onOptionSelected(option, index);
  }

  onKeyDown(event) {
    // console.log("onKeyDown", event.which);

    if (!/(38|40|27|32)/.test(event.which)) {
      return;
    }

    event.preventDefault()
    event.stopPropagation()

    if (this.props.disabled || !this.state.isOpen) {
      return;
    }

    if (event.which === ESCAPE_KEYCODE) {
      this.closeMenu();
      this.refs.toggle.focus();
    }

    let index  = this.items.indexOf(event.target);

    if (event.which === ARROW_UP_KEYCODE && index > 0) { // up
      index--
    }

    if (event.which === ARROW_DOWN_KEYCODE && index < this.items.length - 1) { // down
      index++
    }

    if (index < 0) {
      index = 0;
    }

    this.items[index].focus();
  }

  getMenuItem(option) {
    return {
      isActive: option.selected,
      key:      option.id || option.value,
      href:     "#" + option.value,
      label:    option.label
    };
  }

  renderMenuItems(options) {
    this.items = [];
    return options.map((opt, idx) => {
      const itm = this.getMenuItem(opt);
      const cls = classNames({
        "active": itm.isActive 
      });
      return (
        <li className={cls} key={itm.key}>
          <a href={itm.href}
             ref={itm => { itm && this.items.push(itm); }}
             onClick={this.onOptionSelected.bind(this, opt, idx)}>
            {itm.label}
          </a>
        </li>
      );
    });
  }

  renderToggle() {
    let label = this.props.label;

    if (isString(label)) {
      label = (
        <span>
          {this.props.label + " "}
          <i className="caret"></i>
        </span>
      );
    }

    return (
      <button 
        ref="toggle"
        id={"toggle-" + this.id} 
        type="button"
        className={this.props.toggleClassName}
        aria-haspopup="true" 
        aria-expanded={this.state.isOpen ? "true" : "false"}
        onClick={this.toggleMenu.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)}>
        {label}
      </button>
    );
  }

  render() {
    const cls = classNames(
      this.props.className,
      {
        "open":     this.state.isOpen === true,
        "disabled": this.props.disabled
      }
    );

    return (
      <div className={cls} ref="dropdown">
        {this.renderToggle()}

        <ul className="dropdown-menu" aria-labelledby={this.id} onKeyDown={this.onKeyDown.bind(this)}>
          {this.renderMenuItems(this.props.options)}
        </ul>
      </div>
    );
  }
}

Dropdown.defaultProps = {
  className:        "btn-group",
  toggleClassName:  "btn btn-default",
  label:            "",
  options:          [],
  disabled:         false,
  onOptionSelected: noop
};
