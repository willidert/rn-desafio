import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Geolocation from '@react-native-community/geolocation';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import MapView, {Marker} from 'react-native-maps';

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

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000,
};

const defaultProps = {
  enableHack: false,
  geolocationOptions: GEOLOCATION_OPTIONS,
};

export default class MapScreen extends PureComponent {
  map: any;
  constructor(props) {
    super(props);
    this.state = {
      uea: {latitude: -3.09164, longitude: -60.01716},
      curPos: {latitude: -3.09164, longitude: -60.01716},
      curAng: 45,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
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

  watchLocation = () => {
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
  };

  clearLocation = () => {
    Geolocation.clearWatch(this.watchID);
  };

  showCurLoc = () => {
    this.setState({
      curPos: {...this.state.myPosition},
    });
    this.map.animateCamera({
      center: {...this.state.myPosition},
      pitch: this.state.curAng,
    });
  };

  showUEA = () => {
    this.setState({
      curPos: {
        latitude: this.state.uea.latitude,
        longitude: this.state.uea.longitude,
      },
    });
    this.map.animateCamera({
      center: {...this.state.uea},
      pitch: this.state.curAng,
    });
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
    return (
      <View style={styles.container}>
        <MapView
          ref={el => (this.map = el)}
          style={styles.map}
          initialRegion={{
            ...this.state.curPos,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}>
          <Marker
            title="EST"
            description="UEA"
            coordinate={{
              ...this.state.uea,
            }}
          />
          <Marker
            title="Iam"
            description="uau"
            coordinate={{
              ...this.state.myPosition,
            }}
          />
        </MapView>
        <View style={styles.subcontainer}>
          <TouchableOpacity style={styles.button} onPress={this.showCurLoc}>
            <Text>Mostrar local atual</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.showUEA}>
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
