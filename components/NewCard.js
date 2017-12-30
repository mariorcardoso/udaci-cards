import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { white, gray, purple } from '../utils/colors'
import { addCardToDeck } from '../utils/helpers'
import { DefaultButton } from './Buttons'
import { connect } from 'react-redux'
import { submitCard } from '../utils/api'
import { addCard } from '../actions'
import { NavigationActions } from 'react-navigation'

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  handleSubmit() {
    const { question, answer } = this.state
    const { deckId } = this.props.navigation.state.params
    const card = { question, answer }

    this.props.dispatch(addCard(deckId, card))
    this.setState({question: '', answer: ''})
    this.toHome()
    submitCard({ deckId, card })
  }
  toHome = () => {
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
            value={this.state.question}
          />
          <TextInput
            style={{height: 40, fontSize: 40}}
            placeholder="Answer"
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
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

export default connect()(NewCard)
