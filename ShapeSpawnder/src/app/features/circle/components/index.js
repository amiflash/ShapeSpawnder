import BaseSpawnder from "../../bases";
import { Position } from "../../bases"
import React, { Component } from "react";
import { Text, View, TouchableOpacity, PanResponder, Image, GestureResponderEvent } from "react-native";
import styles from "./styles";
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, {
  Circle
} from 'react-native-svg';
import SpawnderAPI from '../../../services/SpawnderAPI'
import { SpawnCircleInfo, SpawnCircle } from "../../../components/shapes/circle";
import { generateRandomColor, getRandomWidth } from "../../../helpers";
import RNShake from 'react-native-shake'

export default class CircleSpawnder extends Component {
  constructor() {
    super()
    spawnderAPI = new SpawnderAPI()

   this.addGestures()

    this.state = {
      infos: []
    }
  }

  render() {
    let Arr = this.state.infos.map((a, i) => {
      let circleInfo = this.state.infos[i]

      return <SpawnCircle circleInfo={circleInfo} />

    })
    return (
      <View style={{ flex: 1, backgroundColor: '#ff33dd' }}  {...this.panResponder.panHandlers}>
        <SafeAreaView>
          {Arr}
        </SafeAreaView>
      </View>
    );

  }

  componentDidMount() {
    RNShake.addEventListener('ShakeEvent', () => {
      this.cleanData()
    });
  }

  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent')
  }

addGestures() {
  this.panResponder = PanResponder.create(
    {
      onStartShouldSetPanResponder: (event, gestureState) => true,

      onStartShouldSetPanResponderCapture: (event, gestureState) => false,

      onMoveShouldSetPanResponder: (event, gestureState) => false,

      onMoveShouldSetPanResponderCapture: (event, gestureState) => false,

      onPanResponderGrant: (event, gestureState) => false,

      onPanResponderMove: (event, gestureState) => false,

      onPanResponderRelease: (event, gestureState) => {
        this.didTouchHandler(event, gestureState)
      }
    });
}

  didTouchHandler(event, gestureState) {

    let pos = new Position()
    pos.posX = event.nativeEvent.locationX.toFixed(2)
    pos.posY = event.nativeEvent.locationY.toFixed(2)

    let circleInfo = new SpawnCircleInfo(getRandomWidth(), generateRandomColor(), pos)
    this.state.infos.push(circleInfo)


    this.setState({
      infos: this.state.infos
    })
  }
  cleanData() {
    this.setState({
      infos: []
    })
  }
}
