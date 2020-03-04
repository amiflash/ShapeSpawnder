import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 85,
        borderRightWidth: 85,
        borderBottomWidth: 170,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'red'
      },
      triangleDown: {
        transform: [
          {rotate: '180deg'}
        ]
      },
      triangleLeft: {
        transform: [
          {rotate: '-90deg'}
        ]
      },
      triangleRight: {
        transform: [
          {rotate: '90deg'}
        ]
      },
      trinagleImageHidden: {
        width: 0,
        height: 0
      }
})
    
  