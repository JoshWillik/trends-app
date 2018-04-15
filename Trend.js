import React from 'react'
import {View, Text, TouchableHighlight} from 'react-native'
import style from './style.js'
let colors = [
]
export function ListItem({index, name, onPress}){
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={style.tracker_list_item}>
        <Text>{name}</Text>
      </View>
    </TouchableHighlight>
  )
}
