import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';

import MyModal from '../source/MyModal'

let scaleValue = new Animated.Value(0);

let rotateValue = new Animated.Value(0);

const cardScale = scaleValue.interpolate({
  inputRange: [0, 0.5, 1],
  outputRange: [1, 0.96, 0.9],
});

const rotation = rotateValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'], // degree of rotation
});

let transformStyle = {margin: 20, transform: [{scale: cardScale}]};

let transformStyleRotate = {margin: 20, transform: [{rotate: rotation}]};

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            modal : false
        }
    }

  render() {
    return (
      <View style={{flex: 1}}>
        <Animated.View style={transformStyle}>
          <TouchableWithoutFeedback
            onPressIn={() => {
              scaleValue.setValue(0);
              Animated.timing(scaleValue, {
                toValue: 1,
                duration: 250,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start();
             
            }}
            onPressOut={() => {
              Animated.timing(scaleValue, {
                toValue: 0,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start();
            }}
            onPress={() => {
                this.setState({modal : !this.state.modal})
            }}>
            <Text
              style={{
                color: 'white',
                width: 200,
                height: 30,
                backgroundColor: 'grey',
                textAlignVertical: 'center',
                textAlign: 'center',
              }}>
              Click Me
            </Text>
          </TouchableWithoutFeedback>
        </Animated.View>
        <TouchableWithoutFeedback
          onPressIn={() => {
            Animated.timing(rotateValue, {
              toValue: 1,
              duration: 700,
              easing: Easing.linear,
            }).start();
            
          }}
          onPressOut={() => {
            Animated.timing(rotateValue, {
              toValue: 0,
              duration: 300,
              easing: Easing.linear,
            }).start();
          }}
          >
          <Animated.View style={transformStyleRotate}>
            <Text
              style={{
                color: 'white',
                width: 200,
                height: 30,
                backgroundColor: 'grey',
                textAlignVertical: 'center',
                textAlign: 'center',
              }}>
              Rotate
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <MyModal
          title={"View Pokemon"}
          visible={this.state.modal}
          onClose={() => {
            this.setState({
                modal: false
            });
          }}
        >
            <Text>tarunkonda</Text>
        </MyModal>


      </View>
    );
  }
}

// animateBar = () => {
//   const { value, index } = this.props;
//   this.width.setValue(0); // initialize the animated value
//   Animated.timing(this.width, {
//     toValue: value,
//     delay: index * 150 // how long to wait before actually starting the animation
//   }).start();
// };