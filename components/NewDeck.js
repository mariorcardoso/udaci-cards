import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { white, gray, purple } from '../utils/colors'
import { saveDeckTitle } from '../utils/helpers'

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
        <TouchableOpacity
          style={styles.iosBtn}
          onPress={() => this.handleSubmit()}>
            <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
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
  },
  iosBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 75,
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})

export default NewDeck
