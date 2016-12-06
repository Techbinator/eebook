import React, {Component} from 'react'
import 'ammap3'
import 'ammap3/ammap/maps/js/worldLow'

export default class EEMap extends Component {

  componentDidMount(){
    AmCharts.ready( () => {
      this.map = new AmCharts.AmMap();
      this.map.areasSettings = this.props.areasSettings;
      this.map.imagesSettings = this.props.imagesSettings;
      this.map.linesSettings = this.props.linesSettings;
      this.setDataProvider();
      this.map.areasSettings = this.props.areasSettings;
      this.map.addListener("clickMapObject", (event) => {
        this.props.onCityClick(event)
      });
      this.map.write("mapdiv");
    })
  }

  setDataProvider(){
    var dataProvider = {
      mapVar: AmCharts.maps.worldLow,
      linkToObject: this.props.linkToObject,
      images: this.props.cities,
      zoomLevel : this.props.zoomLevel,
      lines : this.props.lines
    };
    this.map.dataProvider  = dataProvider;
  }

  render(){

    if( this.map) {
      this.setDataProvider();
      this.map.validateData();
    }

    return(<div id="mapdiv">Loading map .......</div>)
  }
}


EEMap.defaultProps = {
  imagesSettings : {
    color: "#337ab7",
    rollOverColor: "#337ab7",
    selectedColor: "#000000",
    pauseDuration: 0.2,
    animationDuration:2.5,
    adjustAnimationSpeed:true,
    bringForwardOnHover: true,
    alpha:1,
    outlineThickness: 3,
    tabIndex: 4
  },

  linesSettings : {
    color: "#CC0000",
    alpha: 0.4,
    bringForwardOnHover: false,
    thickness: 0.7,
    selectable:false,
    dashLength: 4
  },
  areasSettings:{
    unlistedAreasColor: '#CCCCCC'
  },
  cities: [],
  lines:[],
  linkToObject: null,
  zoomLevel: 7,
  zoomDuration:1
}

EEMap.propTypes = {
  cities: React.PropTypes.array.isRequired,
  onCityClick: React.PropTypes.func.isRequired,
  imagesSettings: React.PropTypes.object,
  linesSettings: React.PropTypes.object,
  areasSettings: React.PropTypes.object,
  lines: React.PropTypes.array,
  linkToObject: React.PropTypes.object,
  zoomLevel: React.PropTypes.number,
  zoomDuration: React.PropTypes.number,
}

export const targetSVG      = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
export const planeSVGFR     = "M19.671,8.11l-2.777,2.777l-3.837-0.861c0.362-0.505,0.916-1.683,0.464-2.135c-0.518-0.517-1.979,0.278-2.305,0.604l-0.913,0.913L7.614,8.804l-2.021,2.021l2.232,1.061l-0.082,0.082l1.701,1.701l0.688-0.687l3.164,1.504L9.571,18.21H6.413l-1.137,1.138l3.6,0.948l1.83,1.83l0.947,3.598l1.137-1.137V21.43l3.725-3.725l1.504,3.164l-0.687,0.687l1.702,1.701l0.081-0.081l1.062,2.231l2.02-2.02l-0.604-2.689l0.912-0.912c0.326-0.326,1.121-1.789,0.604-2.306c-0.452-0.452-1.63,0.101-2.135,0.464l-0.861-3.838l2.777-2.777c0.947-0.947,3.599-4.862,2.62-5.839C24.533,4.512,20.618,7.163,19.671,8.11z";
export const planeSVGLines  = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
export const selectedExtra  = {
                                scale: 1.5,
                                color: "#000000"
                              };
