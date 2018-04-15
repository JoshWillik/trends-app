import React from 'react'
import {View, Text, TextInput, Button} from 'react-native'
import {replace} from '../storage.js'

export default class NewTrend extends React.Component {
  static navigationOptions = {
    title: 'New Trend',
  }
  constructor(...args) {
    super(...args)
    this.state = {name: ''}
  }
  render() {
    return (
      <View style={{margin: 10}}>
        <View style={{marginBottom: 10}}>
          <TextInput style={{fontSize: 40, height: 40}}
            placeholder="Name" value={this.state.name} 
            onChangeText={text => this.setState({name: text})} />
        </View>
        <Button title="Create" onPress={this.on_create.bind(this)}/>
      </View>
    )
  }
  async on_create() {
    let id = (new Date()).valueOf()+'-'+Math.random()
    await replace('trends', trends => {
      return (trends||[]).concat({id, name: this.state.name})
    })
    this.props.navigation.navigate('Home')
  }
}
