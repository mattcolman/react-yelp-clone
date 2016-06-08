import React from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'
import {searchNearby} from 'utils/googleApiHelpers'
import Header from 'components/Header/Header'
import styles from './styles.module.css'
import Sidebar from 'components/Sidebar/Sidebar'

export class Container extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      places: [],
      pagination: null
    }
  }

  onReady(mapProps, map) {
    console.log('onReady')
    const {google} = this.props;
    const opts = {
      location: map.center,
      radius: '500',
      types: ['cafe']
    }
    searchNearby(google, map, opts)
      .then((results, pagination) => {
        this.setState({
          places: results,
          pagination
        })
      }).catch((status, result) => {
        // There was an error
      })
  }

  onMarkerClick(item) {
  }

  render() {
    let children = null;
    if (this.props.children) {
      // We have children in the Container component
      children = React.cloneElement(
        this.props.children,
        {
          google: this.props.google,
          places: this.state.places,
          loaded: this.props.loaded,
          onMarkerClick: this.onMarkerClick.bind(this)
        });
    }
    return (
      <div>
        <Map
          google={this.props.google}
          onReady={this.onReady.bind(this)}
          visible={false}
          className={styles.wrapper}>
          <Header />
          <Sidebar
            title={'Restaurants'}
            places={this.state.places}
          />
          <div className={styles.content}>
            {/* Setting children routes to be rendered*/}
            {children}
          </div>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container)