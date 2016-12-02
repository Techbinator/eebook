import React, {Component} from 'react'
import EEMap, {planeSVG, targetSVG} from '../../../common/EEMap'
import { connect } from 'react-redux'
import { map, uniqBy, filter } from 'lodash'

// LONDON
var london = {
    id: "london",
    color: "#000000",
    svgPath: targetSVG,
    title: "London",
    latitude: 51.5002,
    longitude: -0.1262,
    scale: 1.5,
    zoomLevel: 2.74,
    zoomLongitude: -20.1341,
    zoomLatitude: 49.1712,

    lines: [
        {
        latitudes: [51.5002, 50.4422],
        longitudes: [-0.1262, 30.5367]},
    {
        latitudes: [51.5002, 46.9480],
        longitudes: [-0.1262, 7.4481]},
    {
        latitudes: [51.5002, 59.3328],
        longitudes: [-0.1262, 18.0645]},
    {
        latitudes: [51.5002, 40.4167],
        longitudes: [-0.1262, -3.7033]},
    {
        latitudes: [51.5002, 46.0514],
        longitudes: [-0.1262, 14.5060]},
    {
        latitudes: [51.5002, 48.2116],
        longitudes: [-0.1262, 17.1547]},
    {
        latitudes: [51.5002, 44.8048],
        longitudes: [-0.1262, 20.4781]},
    {
        latitudes: [51.5002, 55.7558],
        longitudes: [-0.1262, 37.6176]},
    {
        latitudes: [51.5002, 38.7072],
        longitudes: [-0.1262, -9.1355]},
    {
        latitudes: [51.5002, 54.6896],
        longitudes: [-0.1262, 25.2799]},
    {
        latitudes: [51.5002, 64.1353],
        longitudes: [-0.1262, -21.8952]},
    {
        latitudes: [51.5002, 40.4300],
        longitudes: [-0.1262, -74.0000]}
    ],

    images: [{
        label: "Flights from London",
        svgPath: planeSVG,
        left: 100,
        top: 45,
        color: "#CC0000",
        labelColor: "#CC0000",
        labelRollOverColor: "#CC0000",
        labelFontSize: 20},
    {
        label: "show flights from Vilnius",
        left: 110,
        top: 70,
        labelColor: "#000000",
        labelRollOverColor: "#CC0000",
        labelFontSize: 11,
        linkToObject: "vilnius"}]
};


class SearchMap extends Component {

  processData(){
    if( this.props.originCode){

    }
  }

  getOrigins() {
    let options = this.props.options;

    if (this.props.destinCode !== "") {
      options = filter(options, {destinationCode: this.props.destinCode});
    }

    let origins = map(options, (itm) => {
      return {
        title: itm.originName,
        id: itm.originCode,
        svgPath: targetSVG,
        latitude: itm.originLat,
        longitude: itm.originLon
      };
    });

    this.cities = uniqBy(origins, 'id');
  }

  render(){
      this.cities = false;
    this.getOrigins();
    // this.getData();
    var test = (this.props.originCode == 'FRA') ? vilnius : london;

    if(this.cities){
        return( <EEMap cities={this.cities}  />)
    }

  }
}

function getProperties(state) {
    return {
        originCode: state.Search.originCode,
        destinCode: state.Search.destinCode,
        options:    state.Data.routes,
    }
}

export default connect(getProperties)(SearchMap);
