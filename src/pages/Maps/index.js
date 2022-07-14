import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Geolocation from '@react-native-community/geolocation';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import MapView, {Marker} from 'react-native-maps';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = -3.09164;
const LONGITUDE = -60.01716;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
};
const ANCHOR = {x: 0.5, y: 0.5};

const colorOfmyLocationMapMarker = 'blue';

const propTypes = {
  ...Marker.propTypes,
  // override this prop to make it optional
  coordinate: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  children: PropTypes.node,
  geolocationOptions: PropTypes.shape({
    enableHighAccuracy: PropTypes.bool,
    timeout: PropTypes.number,
    maximumAge: PropTypes.number,
  }),
  heading: PropTypes.number,
  enableHack: PropTypes.bool,
};

const defaultProps = {
  enableHack: false,
  geolocationOptions: GEOLOCATION_OPTIONS,
};

export default class MapScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lat: -3.0917797,
      long: -60.0175282,
      myPosition: null,
    };
  }

  componentDidMount() {
    this.mounted = true;
    if (this.props.coordinate) {
      return;
    }
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de Acesso à Localização',
          message: 'Este aplicativo precisa acessar sua localização.',
          buttonNeutral: 'Pergunte-me depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      ).then(granted => {
        if (granted && this.mounted) {
          this.watchLocation();
        }
      });
    } else {
      this.watchLocation();
    }
  }

  watchLocation() {
    Geolocation.getCurrentPosition(
      position => {
        this.state.myPosition = position.coords;
      },
      error => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    this.watchID = Geolocation.watchPosition(position => {
      const myLastPosition = this.state.myPosition;
      const myPosition = position.coords;
      if (!(myPosition === myLastPosition)) {
        //aqui
        this.setState({myPosition});
      }
    });
  }

  clearLocation = () => {
    Geolocation.clearWatch(this.watchID);
  };

  componentWillUnmount() {
    this.mounted = false;
    if (this.watchID) {
      clearLocation();
    }
  }

  render() {
    let {heading, coordinate} = this.props;
    if (!coordinate) {
      const {myPosition} = this.state;
      if (!myPosition) {
        return null;
      }
      coordinate = myPosition;
      heading = myPosition.heading;
    }

    const rotate =
      typeof heading === 'number' && heading >= 0 ? `${heading}deg` : null;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker
            title="EST"
            description="UEA"
            coordinate={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
            }}
          />
        </MapView>
        <View style={styles.subcontainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.showCurrentLocation}>
            <Text>Mostrar local atual</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Mostrar EST</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
  subcontainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    height: 200,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
});

MapScreen.propTypes = propTypes;
MapScreen.defaultProps = defaultProps;
