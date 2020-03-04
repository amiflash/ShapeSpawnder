import BaseSpawnder from "../../bases";
import { Position } from "../../bases"
import React, { Component } from "react";
import { Text, View, TouchableOpacity, PanResponder, Image, GestureResponderEvent, Alert } from "react-native";
import styles from "./styles";
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, {
  Circle
} from 'react-native-svg';
import SpawnderAPI from '../../../services/SpawnderAPI'
import { SpawnCircleInfo, SpawnCircle } from "../../../components/shapes/circle";
import { generateRandomColor, getRandomWidth } from "../../../helpers";
import { SpawnMixture, SpawnMixtureInfo, shapeType } from "../../../components/shapes";
import RNShake from 'react-native-shake'

const shapeTypes = [shapeType.SQUARE, shapeType.CIRCLE, shapeType.TRIANGLE]

export default class AllSpawnder extends Component {
  constructor() {
    super()

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
      let mixtureInfo = this.state.infos[i]

      return <SpawnMixture mixtureInfo={mixtureInfo} />
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
     cleanData()
    });
  }

  componentWillUnmount() {
    RNShake.removeEventListener('ShakeEvent')
  }

  didTouchHandler(event, gestureState) {

    let pos = new Position()
    pos.posX = event.nativeEvent.locationX.toFixed(2)
    pos.posY = event.nativeEvent.locationY.toFixed(2)

    let randomIndex = Math.floor(Math.random() * shapeTypes.length)
    let shapeType = shapeTypes[randomIndex]

    let mixtureInfo = new SpawnMixtureInfo(shapeType, getRandomWidth(), pos, generateRandomColor())
    this.state.infos.push(mixtureInfo)


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
