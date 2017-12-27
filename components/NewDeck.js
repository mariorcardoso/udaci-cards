import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { white, gray, purple } from '../utils/colors'
import { saveDeckTitle } from '../utils/helpers'
import { DefaultButton } from './Buttons'

class NewDeck extends Component {
  state = {
    title: ''
  }
  handleSubmit() {
    const { title } = this.state
    saveDeckTitle(title)
    this.props.navigation.navigate('Home')
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.center}>
          <TextInput
            style={{height: 40, fontSize: 40}}
            placeholder="Title"
            onChangeText={(title) => this.setState({title})}
          />
        </View>
        <DefaultButton title="Submit" onPress={() => this.handleSubmit()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center'
  }
})

export default NewDeck
