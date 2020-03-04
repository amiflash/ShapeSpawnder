import { Dimensions, Alert } from 'react-native'
import { screensEnabled } from 'react-native-screens'

export class SpawnConstants {
    static kSpawnMin: Number = 0.1
    static kSpawnMax: Number = 0.45
}

export function addColorPrefix(hex: String) {
    return "#" + hex
}

export function  generateRandomColor() {
    let randomValue =  Math.floor(Math.random()*16777215).toString(16)
    return addColorPrefix(randomValue)
}

export function getRandomWidth() {
    let screenWidth = Dimensions.get("window").width
    let screenHeight = Dimensions.get("window").height

    

    let min: Number = SpawnConstants.kSpawnMin
    let max: Number = SpawnConstants.kSpawnMax

    let width = (screenWidth*min) + (max - min)*screenWidth*Math.random()
    let height = screenHeight*min + (max - min)*screenHeight*Math.random()
    
     return Math.min(width, height)
}

