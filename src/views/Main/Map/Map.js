import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import Map, {GoogleApiWrapper, Marker} from 'google-maps-react'

import styles from './styles.module.css'

export class MapComponent extends React.Component {

  renderMarkers() {
    if (!this.props.places) {
      return;
    }
    return this.props.places.map(p => {
      return <Marker
                key={p.id}
                name={p.id}
                place={p}
                label={p.name}
                onClick={this.props.onMarkerClick.bind(this)}
                map={this.props.map}
                position={p.geometry.location} />
    });
  }

  render() {
    return (
      <Map google={this.props.google}
            className={styles.map}>
        {this.renderMarkers()}
      </Map>
    )
  }
}

export default MapComponent