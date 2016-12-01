import React, {Component} from 'react'
import Map from '../pages/search/sub/Map'


export default class LeftSection extends Component {

  setData(){
    switch (this.props.component) {
      case 'map':
        return <Map />
        break;
      default:
        return null
    }
  }

  render(){
      return (
        <section className="leftSection" >{this.setData()}</section>
      )
  }

}
