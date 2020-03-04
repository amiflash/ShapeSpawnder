import BaseSpawnder from "../../bases";
import { Position } from "../../bases"
import React, { Component } from "react";
import { Text, View, TouchableOpacity, PanResponder, Image, Alert } from "react-native";
import styles from "./styles";
import { SafeAreaView } from 'react-native-safe-area-context'

import SpawnderAPI from '../../../services/SpawnderAPI'
import { SpawnSquare, SpawnSquareInfo } from "../../../components/shapes/square";
import { generateRandomColor, getRandomWidth } from "../../../helpers";
import RNShake from 'react-native-shake'

export default class SquareSpawnder extends BaseSpawnder {

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
      myArr: [],
      index: 0,
      locationArr: [],
      imageURLs: [],
      infos: []
    }
  }


  render() {
    let imageURL: String = this.state.imageURLs[0]

    let Arr = this.state.infos.map((a, i) => {
      let squareInfo = this.state.infos[i]
      return <SpawnSquare squareInfo={squareInfo} />
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

    let squareInfo = new SpawnSquareInfo(getRandomWidth(), generateRandomColor(), pos, "")
    this.state.infos.push(squareInfo)

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
