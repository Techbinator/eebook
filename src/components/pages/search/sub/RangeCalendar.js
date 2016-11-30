import EEReactInfiniteCalendar from '../../../common/EEReactInfiniteCalendar'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
  selectDepartureDate,
  selectReturnDate
} from '../../../../reducers/Search'


class RangeCalendar extends Component {

  onSelect(departureDate, returnDate){

    if(departureDate){
      this.props.dispatch(selectDepartureDate(departureDate));
      if( this.props.oneWay){
        this.props.dispatch({ type: 'OPEN_SIDE_MENU', payload: null });
      }
    }

    if( !this.props.oneWay && returnDate){
      this.props.dispatch(selectReturnDate(returnDate));
      this.props.dispatch({ type: 'OPEN_SIDE_MENU', payload: null });
    }

  }

  render(){
    const minDate = new Date();
    return(
      <EEReactInfiniteCalendar
        direction={this.props.direction}
        selectedDate={this.props.departureDate}
        rangeSelectionEndDate={this.props.returnDate}
        width={390}
        height={400}
        rangeSelection={!this.props.oneWay}
        rangeSelectionBehavior="hover"
        minDate={minDate}
        onSelect={this.onSelect.bind(this)}
        overscanMonthCount={1}
        todayHelperRowOffset={1}
        />
    )
  }
}

function getProperties(state) {
  return {
    departureDate: state.Search.departureDate || false,
    returnDate: (state.Search.returnDate && state.Search.numJourneys == 2 ) ? state.Search.returnDate :   false,
    oneWay: state.Search.numJourneys == 1 ? true : false
  }
}

export default connect(getProperties)(RangeCalendar);
