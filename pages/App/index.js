import React,{Component,Fragment} from 'react';
import Dimensions from 'react-dimensions';
import {Container,ButtonContainer } from './styles';
import {withRouter} from 'react-router-dom';
import Button from '../Properties/Button';
import MapGL from 'react-map-gl';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import api from '../../services/api';
import {logout} from '../../services/auth'
import Properties from '../Properties';

const TOKEN = 'pk.eyJ1IjoibmFuZG9wbGF5YXJ0IiwiYSI6ImNqdTRpa2gyeTB5M2o0NG55Njhsd3RzODIifQ.5VPBYznByJF30pByOK1w5g';

class Map extends Component{


  static propTypes ={
    containerWidth:PropTypes.number.isRequired,
    containerHeight:PropTypes.number.isRequired
  }

state ={
  viewport:{
    latitude:-27.2108001,
    longitude: -49.6446024,
    zoom:12.8,
    bearing:0,
    pitch:0
  },
   properties:[]
}

handleLogout = e=>{
  logout();
  this.props.history.push('/');
}

renderActions(){
  return (
    <ButtonContainer>
      <Button color="#222" onClick={this.handleLogout}>
        <i className="fa fa-times"/>
      </Button>
    </ButtonContainer>
  )
}

componentDidMount(){
  this.loadProperties();
}
updatePropertiesLocalization(){
  this.loadProperties();
}

loadProperties = async() =>{
  const {latitude, longitude} = this.state.viewport;
  try{
    const response = await api.get('/properties',{params:{latitude,longitude}})
    this.setState({properties:response.data});
  }catch(err){
    console.log(err);
  }
}


render(){
  const {containerWidth:width,containerHeight:height} = this.props
  const {properties} = this.state;
  return (
    <Fragment>
        <MapGL width={width} height={height} {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={viewport =>  this.setState({viewport})}
        onViewStateChange={this.updatePropertiesLocalization.bind(this)}>
        <Properties properties={properties} />
        </MapGL>
        {this.renderActions()}
    </Fragment>
  )
}

}

const DimensionedMap = withRouter(Dimensions()(Map));
const App =() =>(
  <Container>
    <DimensionedMap />
  </Container>
)

export default App;