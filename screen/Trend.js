import React from 'react'
import {ActivityIndicator, View, Button} from 'react-native'
import {get, replace} from '../storage.js'

export default class Trend extends React.Component {
  static navigationOptions = ({navigation}) => {
    let {params: {trend, id}} = navigation.state
    return {
      title: trend,
      headerRight: (
        <View style={{marginRight: 20}}>
          <Button title="History" onPress={() =>
            navigation.navigate('History', {trend, id})} />
        </View>
      ),
    }
  }
  constructor(...args){
    super(...args)
    this.state = {trend: null}
  }
  storage_key() {
    return 'trend-'+this.props.navigation.state.params.id
  }
  componentDidMount() { this.load() }
  async load() {
    let trend = await get(this.storage_key())
    this.setState({trend: trend||{}})
  }
  render() {
    if (!this.state.trend) {
      return (
        <View style={{
          margin: 10, 
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={{margin: 10}}>
        <Button title="Good" color="green"
          onPress={this.add_value.bind(this, 1)}/>
        <Button title="Bad" color="red"
          onPress={this.add_value.bind(this, 0)}/>
      </View>
    )
  }
  async add_value(value) {
    await replace(this.storage_key(), trend => {
      let history = trend && trend.history || []
      return Object.assign(trend || {}, {
        history: history.concat({date: new Date(), value}),
      })
    })
    this.load()
  }
}
