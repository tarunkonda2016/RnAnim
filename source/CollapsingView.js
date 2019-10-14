import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Animated,
  Platform,
  TouchableWithoutFeedback,
  Easing,
  Image,
  NativeModules,
} from 'react-native';

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class CollapsingView extends Component {
  constructor(props) {
    super(props);
    this.width = new Animated.Value(0);
    this.animation = new Animated.Value(0);
    this.springValue = new Animated.Value(0);
    this.state = {
      img:
        'https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/tick_red.png',
    };
  }
  componentDidMount() {
    this.animateBar();
  }

  componentDidUpdate() {
    this.animateBar();
  }

  animateBar = () => {
    this.width.setValue(0);
    Animated.timing(this.width, {
      toValue: 250,
      delay: 5 * 150,
    }).start();
  };

  bar = () => {
    let barWidth = {
      width: this.width,
    };
    return <Animated.View style={[styles.bar, barWidth]} />;
  };
  render() {
    let bg = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['grey', '#047BD5'],
    });



    return (
      <View style={{flex: 1}}>
        <TouchableWithoutFeedback
          onPress={() => {
            Animated.timing(this.animation, {
              toValue: this.animation.__getValue() === 0 ? 1 : 0,
              duration: 250,
              easing: Easing.linear,
            }).start(() => {
              this.state.img =
                'https://pngimage.net/wp-content/uploads/2018/06/selected-png-.png';
            });
          }}>
          <Animated.View
            style={{
              backgroundColor: bg,
              borderRadius: 25,
              height: 50,
              justifyContent: 'center',
              marginHorizontal: 50,
              marginVertical: 20,
            }}>
            <Animated.Text
              style={{
                fontSize: 20,
                color: this.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['black', 'white'],
                  easing: Easing.linear,
                }),
                textAlign: 'center',
              }}>
              Hello
            </Animated.Text>
            <Animated.Image
              style={[
                {
                  transform: [
                    {
                      translateX: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 210 - 50],
                      }),
                    },
                  ],
                },
                ,
                {
                  marginHorizontal: 10,
                  padding: 10,
                  width: 35,
                  height: 35,
                  position: 'absolute',
                },
              ]}
              source={{
                uri: this.state.img,
              }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        {this.bar()}

        <TouchableWithoutFeedback
        onPressIn={() => {
            this.springValue.setValue(0.95)
            Animated.spring(this.springValue, {
              toValue: 0.95,
              friction : 1,
              useNativeDriver : true
            }).start();
        }}
          onPressOut={() => {
            Animated.spring(this.springValue, {
              toValue: 1,
              friction : 1,
              useNativeDriver : true
            }).start();
          }}>
          <Animated.Image
            style={[
              {transform: [{scale: this.springValue}]},
              {margin: 5, width: 300, height: 200},
            ]}
            source={{
              uri:
                'https://cdn3.movieweb.com/i/article/u2ZHld9yvHVC7kY7a2PckHasXJuRKo/798:50/Tom-And-Jerry-Movie-Production-Start-Story-Details.jpg',
            }}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
const styles = {
  bar: {
    height: 15,
    borderWidth: 1,
    borderColor: '#c72f06',
    backgroundColor: '#e75832',
  },
};
