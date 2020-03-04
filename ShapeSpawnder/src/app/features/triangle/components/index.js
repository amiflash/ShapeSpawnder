import BaseSpawnder from "../../bases";
import { Position } from "../../bases"
import React, { Component } from "react";
import { Text, View, TouchableOpacity, PanResponder, Image, Alert } from "react-native";
import styles from "./styles";
import { SafeAreaView } from 'react-native-safe-area-context'
import { TriangleShape, TriangleInfo, SpawnTriangle, SpawnTriangleInfo } from '../../../components/shapes/triangle/index'

import SpawnderAPI from '../../../services/SpawnderAPI'
import { generateRandomColor, getRandomWidth } from "../../../helpers";
import RNShake from 'react-native-shake'

export default class TriangleSpawnder extends Component {
  constructor() {
    super()

    spawnderAPI = new SpawnderAPI()

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

    this.state = {
      infos: []
    }
  }

  render() {


    let Arr = this.state.infos.map((a, i) => {
      let triangleInfo = this.state.infos[i]
      return (
        <SpawnTriangle triangleInfo={triangleInfo} />
      );
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
  didTouchHandler(event, gestureState) {
    let pos = new Position()
    pos.posX = event.nativeEvent.locationX.toFixed(2)
    pos.posY = event.nativeEvent.locationY.toFixed(2)
    let randomColor = generateRandomColor()

    let triangleInfo: SpawnTriangleInfo = new SpawnTriangleInfo(getRandomWidth(), randomColor, pos, "")

    this.state.infos.push(triangleInfo)
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
