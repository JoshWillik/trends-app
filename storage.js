import {AsyncStorage} from 'react-native'

export async function get(field, def) {
  let value = await AsyncStorage.getItem(field)
  if (value) {
    value = JSON.parse(value)
  }
  return value === undefined ? def : value
}

export async function replace(field, fn) {
  let value = fn(await get(field))
  await AsyncStorage.setItem(field, JSON.stringify(value))
}
