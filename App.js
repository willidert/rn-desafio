import React, {Component, useState} from 'react';
import {Button, Linking, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: '',
    };
  }

  handleLink = () => {
    Linking.openURL(this.state.link).catch(() => {
      console.log('Houve um erro');
    });
  };
  render() {
    return (
      <QRCodeScanner
        onRead={data => this.setState({link: data})}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={
          <View>
            <Text>{this.state.link}</Text>
          </View>
        }
        bottomContent={
          <View>
            <TouchableOpacity
              onPress={this.handleLink}
              style={{padding: 12, backgroundColor: '#0277ba', marginTop: 10}}>
              <Text style={{color: '#FFF'}}>Some text</Text>
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
}

export default App;
