import React, { Component } from 'react'

import { View, Image, Alert } from 'react-native'
import styles from './styles'
import { SpawnderAPI } from '../../../services/SpawnderAPI'
import { Position } from '../../../features/bases'
import DoubleClick from 'react-native-double-click'
import { addColorPrefix, generateRandomColor } from '../../../helpers/index'

export class SpawnSquareInfo {
    width: Number
    color: String
    position: Position
    imageURL: String


    constructor(width: Number, color: String, position: Position, imageURL: String =
        "") {
        this.width = width
        this.color = color

        let posX = (parseFloat(position.posX) - width / 2)
        let posY = (parseFloat(position.posY) - width / 2)

        this.position = new Position()
        this.position.posX = posX
        this.position.posY = posY
        this.imageURL = imageURL
    }
}

export class SpawnSquare extends Component {
    constructor(props) {
        super(props)

        this.state = {
            squareInfo: props.squareInfo
        }

        this.fetchImage = this.fetchImage.bind(this)
    }

    render() {
        let squareInfo = this.state.squareInfo
        let pos = squareInfo.position
        let imageURL = squareInfo.imageURL

        return (<View style={[styles.container, { top: pos.posY, left: pos.posX, width: squareInfo.width, height: squareInfo.width, backgroundColor: squareInfo.color }]}>
            <DoubleClick onClick={this.fetchImage}>
            <Image
                style={{ width: squareInfo.width, height: squareInfo.width }}
                source={{ uri: imageURL }}
                resizeMode='cover'
            />
            </DoubleClick>
        </View>
        )
    }

    componentDidMount() {
        this.fetchImage()
    }

    fetchImage() {
        spawnderAPI.fetchImage().then((imageURL) => {
            this.imageHandler(imageURL)
        })
    }

    imageHandler(imageURL: String) {
        this.state.squareInfo.imageURL = imageURL

        this.setState({
            squareInfo: this.state.squareInfo
        })
    }
}