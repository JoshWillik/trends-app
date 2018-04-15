import React from 'react';
import {View, Button, FlatList} from 'react-native';
import {ListItem} from '../Trend.js'
import {get} from '../storage.js'

export default class App extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {trends: []}
  }
  static navigationOptions = ({navigation}) => ({
    title: 'Trends',
    headerRight: (
      <View style={{marginRight: 20}}>
        <Button title="+"
          onPress={() => navigation.navigate('NewTrend')} />
      </View>
    ),
  })
  async componentDidMount() {
    let items = await get('trends')
    this.setState({items})
  }
  render() {
    let {navigation} = this.props
    let {items} = this.state
    return (
      <FlatList data={items} renderItem={({index, item}) =>
        <ListItem index={index} {...item} onPress={() =>
          navigation.navigate('Trend',
            {trend: item.name, trend_id: item.id})}/>}/>
    )
  }
}
