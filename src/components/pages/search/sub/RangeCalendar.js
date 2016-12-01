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

  formatDate( date){
    let da = date.split('.')
    return new Date(`${da[2]}-${da[1]}-${da[0]}`)
  }

  render(){

    const data = this.props.dateRange;
    const direction = (this.props.direction == -1) ? 'departure' : 'return';
    // in case we don`t have a min date we select today
    const periodStart = (data[direction].periodStart) ? this.formatDate(data[direction].periodStart) : new Date();
    //in case we don`t have a max date we set the max date one year from now
    const periodEnd = (data[direction].periodEnd) ? this.formatDate(data[direction].periodEnd) : new Date(new Date().setFullYear(new Date().getFullYear() + 1));

    return(
      <EEReactInfiniteCalendar
        direction={this.props.direction}
        selectedDate={this.props.departureDate}
        rangeSelectionEndDate={this.props.returnDate}
        width={390}
        height={400}
        minDate={periodStart}
        maxDate={periodEnd}
        height={400}
        rangeSelection={!this.props.oneWay}
        rangeSelectionBehavior="hover"
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
    oneWay: state.Search.numJourneys == 1 ? true : false,
    dateRange: state.Data.dates
  }
}

export default connect(getProperties)(RangeCalendar);
