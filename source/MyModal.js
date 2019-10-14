import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";

const { height, width } = Dimensions.get("window");

export default class MyModal extends Component {
  constructor(props) {
    super(props);
    this.yTranslate = new Animated.Value(0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible) {
      this.yTranslate.setValue(0);
      Animated.spring(this.yTranslate, {
        toValue: 1,
        friction: 6
      }).start();
    } else {
      Animated.timing(this.yTranslate, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }).start();
    }
  }

  render() {
    const { title, children, onClose } = this.props;

    let negativeHeight = -height + 20;
    let modalMoveY = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, negativeHeight]
    });

    let translateStyle = { transform: [{ translateY: modalMoveY }] };

    return (
      <Animated.View style={[styles.container, translateStyle]}>
        <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContent}>{children}</View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const styles = {
  container: {
    position: "absolute",
    height: height,
    width: width,
    bottom: -height,
    backgroundColor: "#fff"
  },
  modalContent: {
    flex: 1,
    alignItems: "stretch",
    paddingTop: 30
  },
  closeText: {
    fontSize: 17,
    color: "#fff"
  }
};