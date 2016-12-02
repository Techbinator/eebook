import React, {Component} from 'react'
import SearchMap from '../pages/search/sub/SearchMap'


export default class LeftSection extends Component {

  setData(){
    switch (this.props.component) {
      case 'map':
        return <SearchMap />
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
