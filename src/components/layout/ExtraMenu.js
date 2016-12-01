import React, {Component} from 'react'
import RangeCalendar from '../pages/search/sub/RangeCalendar'


export default class ExtraMenu extends Component {

  setData(){
    switch (this.props.component) {
      case 'departureDate':
        return <RangeCalendar direction={-1}/>
        break;
      case 'returnDate':
        return <RangeCalendar direction={1}/>
        break;
      default:
        return null
    }
  }

  render(){
      return (
        this.setData()
      )
  }

}
