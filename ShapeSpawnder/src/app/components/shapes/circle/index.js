import React, { Component } from 'react'

import { View, Image, Text, Alert, Animated } from 'react-native'
import styles from './styles'
import { SpawnderAPI } from '../../../services/SpawnderAPI'
import { Position } from '../../../features/bases'
import DoubleClick from 'react-native-double-click'
import { addColorPrefix, generateRandomColor } from '../../../helpers/index'
import Svg, { Circle } from 'react-native-svg'

export class SpawnCircleInfo {
    cx: Number
    cy: Number
    r: Number
    width: Number
    color: String
    position: Position


    constructor(width: Number, color: String, position: Position) {
        this.width = width
        this.cx = width / 2
        this.cy = width / 2
        this.r = width / 2

        let posX = (parseFloat(position.posX) - width / 2)
        let posY = (parseFloat(position.posY) - width / 2)

        this.position = new Position()
        this.position.posX = posX
        this.position.posY = posY
        this.color = color
    }
}

export class SpawnCircle extends Component {
    constructor(props) {
        super(props)

        this.state = {
            circleInfo: props.circleInfo
        }

        this.fetchColor = this.fetchColor.bind(this)
    }

    render() {
        let circleInfo = this.state.circleInfo
        let pos = circleInfo.position

        return (<View style={[styles.container, 
        { top: pos.posY, 
        left: pos.posX, 
        width: circleInfo.width,
        height: circleInfo.width }]}>
           <DoubleClick onClick = {this.fetchColor}>
            <Svg width="100%" height="100%">
            <Circle
                cx={circleInfo.cx}
                cy={circleInfo.cy}
                r={circleInfo.r}
                fill={circleInfo.color}
            />
        </Svg>
        </DoubleClick>
        </View>
        )
    }

    componentDidMount() {
        this.fetchColor()
    }

    fetchColor() {
        spawnderAPI.fetchColor()
        .then((hex) => {
            this.colorHandler(hex)
        })
    }


    colorHandler(hex: String) {
        this.state.circleInfo.color = addColorPrefix(hex)
        this.setState({
            circleInfo: this.state.circleInfo
        })
    }
}