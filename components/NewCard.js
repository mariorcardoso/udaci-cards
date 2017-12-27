import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { white, gray, purple } from '../utils/colors'
import { addCardToDeck } from '../utils/helpers'

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  handleSubmit() {
    const { question, answer } = this.state
    const { deckId } = this.props.navigation.state.params
    addCardToDeck(deckId, { question, answer })
    this.props.navigation.navigate('Home')
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.center}>
          <TextInput
            style={{height: 40, fontSize: 40}}
            placeholder="Question"
            onChangeText={(question) => this.setState({question})}
          />
          <TextInput
            style={{height: 40, fontSize: 40}}
            placeholder="Answer"
            onChangeText={(answer) => this.setState({answer})}
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

export default NewCard
