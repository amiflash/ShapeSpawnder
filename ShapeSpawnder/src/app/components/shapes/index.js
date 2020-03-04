import React, { Component } from "react";
import { Position } from "../../features/bases";
import { SpawnCircle, SpawnCircleInfo } from "./circle";
import { SpawnSquare, SpawnSquareInfo } from "./square";
import { SpawnTriangle, SpawnTriangleInfo } from "./triangle";

export const shapeType = {
    SQUARE: 'Square',
    CIRCLE: 'Circle',
    TRIANGLE: 'Triangle'
}

export class SpawnMixtureInfo {
    width: Number
    color: String
    type: shapeType
    pos: Position

    constructor(type: shapeType, width: Number, pos: Position, color: String) {
        this.type = type
        this.pos = pos
        this.color = color
        this.width = width
    }
}

export class SpawnMixture extends Component {
    render() {
        let mixtureInfo: SpawnMixtureInfo = this.props.mixtureInfo
        switch (mixtureInfo.type) {
            case shapeType.SQUARE:
                let squareInfo = new SpawnSquareInfo(mixtureInfo.width, mixtureInfo.color, mixtureInfo.pos, "")
                return (
                    <SpawnSquare squareInfo={squareInfo} />
                )
            case shapeType.CIRCLE:
                let circleInfo = new SpawnCircleInfo(mixtureInfo.width, mixtureInfo.color, mixtureInfo.pos, "")
                return (
                    <SpawnCircle circleInfo={circleInfo} />
                )
            case shapeType.TRIANGLE:
                let triangleInfo = new SpawnTriangleInfo(mixtureInfo.width, mixtureInfo.color, mixtureInfo.pos, "")

                return (
                    <SpawnTriangle triangleInfo={triangleInfo} />
                )
        }
    }
}