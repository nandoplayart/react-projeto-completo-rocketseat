import React,{Component} from 'react';
import Dimensions from 'react-dimensions';
import {Container} from './styles';
import MapGL from 'react-map-gl';
import PropTypes from 'prop-types';

const TOKEN = 'pk.eyJ1IjoibmFuZG9wbGF5YXJ0IiwiYSI6ImNqdTRpa2gyeTB5M2o0NG55Njhsd3RzODIifQ.5VPBYznByJF30pByOK1w5g';

class Map extends Component{
  static propTypes ={
    containerWith:PropTypes.number.isRequired,
    containerHeight:PropTypes.number.isRequired
  }

state ={
  viewport:{
    latitude:-27.2108001,
    longitude: -49.6446024,
    zoom:12.8,
    bearing:0,
    pitch:0
  }
}


render(){
  const {containerWidth:width,containerHeight:height} = this.props
  return (
    <MapGL width={width} height={height} {...this.state.viewport}
    mapStyle="mapbox://styles/mapbox/dark-v9"
    mapboxApiAccessToken={TOKEN}
    onviewportChange={viewport =>  this.setState({viewport}) }
     />
  )
}

}

const DimensionedMap = Dimensions()(Map);
const App =() =>(
  <Container>
    <DimensionedMap />
  </Container>
)

export default App;