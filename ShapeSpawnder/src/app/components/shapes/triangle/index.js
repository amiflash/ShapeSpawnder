import styles from './styles'
import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Position } from '../../../features/bases'
import MaskedViewComponent from '@react-native-community/masked-view'
import { SpawnderAPI } from '../../../services/SpawnderAPI'
import { addColorPrefix, generateRandomColor } from '../../../helpers/index'
import DoubleClick from 'react-native-double-click'

export class SpawnTriangleInfo {
  bottomWidth: Number
  leftWidth: Number
  rightWidth: Number
  color: String
  position: Position
  imageURL: String
  imageRequire: Boolean

  constructor(width: Number, color: String, position: Position, imageURL: String =
    "") {
    this.bottomWidth = width
    this.leftWidth = width / 2
    this.rightWidth = width / 2
    this.color = color

    let posX = (parseFloat(position.posX) - width / 2)
    let posY = (parseFloat(position.posY) - width / 2)

    this.position = new Position()
    this.position.posX = posX
    this.position.posY = posY
    this.imageURL = imageURL
    this.imageRequire = (Math.random() >= 0.5)
  }

  hiddenImage() {
    return this.urlImage == ""
  }
}

export class TriangleShape extends Component {
  constructor(props) {
    super(props)
    this.state = {
      triangleInfo: props.triangleInfo
    }
  }

  componentWillReceiveProps(props) {
    this.state = {
      triangleInfo: props.triangleInfo
    }
  }
  render() {
    let triangleInfo: SpawnTriangleInfo = this.state.triangleInfo

    return (
      <View style={[styles.triangle, {
        borderLeftWidth: triangleInfo.leftWidth,
        borderRightWidth: triangleInfo.rightWidth,
        borderBottomWidth: triangleInfo.bottomWidth,
        borderBottomColor: triangleInfo.color
      }]} />
    )
  }
}

export class TriangleDown extends Component {
  render() {
    return (
      <Triangle style={styles.triangleDown} />
    )
  }
}

export class TriangleLeft extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Triangle style={styles.triangleLeft, border} />
    )
  }
}

export class TriangleRight extends Component {
  render() {
    return (
      <Triangle style={styles.triangleRight} />
    )
  }
}

export class SpawnTriangle extends Component {
  constructor(props) {
    super(props)

    this.state = {
      triangleInfo: props.triangleInfo
    }

    this.fetchData = this.fetchData.bind(this)
  }

  render() {
    let triangleInfo = this.state.triangleInfo
    let position = triangleInfo.position
    let width = triangleInfo.bottomWidth
    let imageHidden = triangleInfo.hiddenImage
    let imageURL = triangleInfo.imageURL
    let imageRequire = triangleInfo.imageRequire
    if (imageRequire && imageURL != "") {
      return (
        <View style={{ top: position.posY, left: position.posX, width: width, height: width, position: 'absolute' }}>
          <MaskedViewComponent
            maskElement={
              <TriangleShape triangleInfo={triangleInfo}></TriangleShape>
            }
          >

            <DoubleClick onClick={this.fetchData}>
            <Image source={{ uri: imageURL }}
              style={{ width: width, height: width }}
            ></Image>
          </DoubleClick>
           
          </MaskedViewComponent>
        </View>
      )
    }

    return (
      <View style={{ top: position.posY, left: position.posX, width: width, height: width, position: 'absolute' }}>
        <DoubleClick onClick={this.fetchData}>
        <TriangleShape triangleInfo={triangleInfo}></TriangleShape>
        </DoubleClick>
      </View>
    )
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    if (this.state.triangleInfo.imageRequire) {
      spawnderAPI.fetchImage().then((imageURL) => {
        this.imageHandler(imageURL)
      })

      return
    }

    spawnderAPI.fetchColor()
      .then((hex) => {
        this.colorHandler(hex)
      })
  }

  imageHandler(imageURL: String) {
    this.state.triangleInfo.imageURL = imageURL
    this.setState({
      triangleInfo: this.state.triangleInfo
    })
  }

  colorHandler(hex: String) {
    this.state.triangleInfo.color = addColorPrefix(hex)
    this.setState({
      triangleInfo: this.state.triangleInfo
    })
  }
}