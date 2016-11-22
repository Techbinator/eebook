import './Search.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button               from '../common/Button'
import AirportSearchInput   from './AirportSearchInput'
import DatePicker           from './DatePicker'
import PaxNumSpinner        from './PaxNumSpinner'

import { map, uniqBy, filter } from 'lodash'
import { 
  retrieveRoutes, 
  selectOrigin, 
  selectDestin, 
  toggleReturn 
} from '../reducers/Search'

import Dropdown from '../common/Dropdown'

var isDatepickerOpen = false;

class Form extends Component {

  componentDidMount() {
    if (!this.props.options || this.props.options.length < 1) {
      this.props.dispatch(retrieveRoutes());
    }
  }

  onChangeDate() {
    isDatepickerOpen = !isDatepickerOpen;
    this.props.dispatch({ type: 'OPEN_SIDE_MENU', payload: isDatepickerOpen ? 'DatePicker': null });
  }

  onOriginSelected(itm) {
    this.props.dispatch(selectOrigin(itm.value));
  }

  onDestinSelected(itm) {
    this.props.dispatch(selectDestin(itm.value));
  }

  onToggleReturn() {
    this.props.dispatch(toggleReturn());
  }

  getOrigins() {
    let options = this.props.options;

    if (this.props.destinCode !== "") {
      options = filter(options, {destinationCode: this.props.destinCode});
    }

    let origins = map(options, (itm) => {
      return {
        label: itm.originName,
        value: itm.originCode        
      };
    });

    origins = uniqBy(origins, 'value');
    return origins;
  }

  getDestinations() {
    let options = this.props.options;
    
    if (this.props.originCode !== "") {
      options = filter(options, {originCode: this.props.originCode});
    }

    let destins = map(options, itm => {
      return {
        label: itm.destinationName,
        value: itm.destinationCode
      }
    });

    destins = uniqBy(destins, 'value');    
    return destins;
  }

  clearOrigin() {
    this.props.dispatch(selectOrigin(""));
  }

  clearDestin() {
    this.props.dispatch(selectDestin(""));
  }

  render() {
    // console.log("Form::render", this.props.options);
    // const options = [
    //   {label:"One",   value:"1"},
    //   {label:"Two",   value:"2"},
    //   {label:"Three", value:"3"},
    // ];

        // <fieldset>
        //   <Dropdown
        //     label="First"
        //     options={this.props.options}/>
        // </fieldset>

    return (
      <form className={"search " + this.props.className}>
        <h3>Flight Booking</h3>

        <fieldset>
          <legend className="sr-only">Airports</legend>
          <AirportSearchInput 
            label="From"
            error={this.props.error}
            onInput={this.clearOrigin.bind(this)}
            onOptionSelected={this.onOriginSelected.bind(this)}
            options={this.getOrigins()}
          />
          <AirportSearchInput 
            label="To"
            error={this.props.error}
            onInput={this.clearDestin.bind(this)}
            onOptionSelected={this.onDestinSelected.bind(this)}
            options={this.getDestinations()}
          />
        </fieldset>

        <fieldset className="row dates compact">
          <legend className="sr-only">Dates</legend>
          <div  className="col-xs-6">
            <DatePicker label="Depart" onChangeDate={this.onChangeDate.bind(this)}/>
          </div>  
          <div  className="col-xs-6">  
            <DatePicker 
              label="Return on"
              disabled={this.props.isOneWay}
              toggleDisabled={this.onToggleReturn.bind(this)}
              onChangeDate={this.onChangeDate.bind(this)}
            />
          </div>
        </fieldset>
        
        <fieldset className="row paxes compact">
          <legend className="sr-only">Passengers</legend>
          <div  className="col-xs-4">
            <PaxNumSpinner label="Adults" from={12} unit="years"/>
          </div>
          <div  className="col-xs-4">
            <PaxNumSpinner label="Children" from={2} to={12} unit="years"/>
          </div>
          <div  className="col-xs-4">
            <PaxNumSpinner label="Infants" from={0} to={23} unit="months"/>
          </div>
        </fieldset>

        <fieldset className="row actions compact">
          <legend className="sr-only">Actions</legend>
          <div  className="col-xs-6">
            <Button className="default block">
              <i className="glyphicon glyphicon-repeat"></i>
              <span className="btn--text">Reset</span>
            </Button>
          </div>  
          <div  className="col-xs-6">
            <Button className="primary block">
              <i className="glyphicon glyphicon-search"></i>
              <span className="btn--text">Search</span>
            </Button>
          </div>  
        </fieldset>
      </form>
    );
  }
}

Form.defaultProps = {
  className: ""
};

function getProperties(state) {
  const st = state.Search;
  return {
    originCode: st.originCode,
    destinCode: st.destinCode,
    options:    st.routes,
    error:      st.error,
    isOneWay:   st.numJourneys < 2
  };
}

export default connect(getProperties)(Form);