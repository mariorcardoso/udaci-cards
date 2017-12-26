import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { gray, white, purple, red, green } from '../utils/colors'
import { getDeck } from '../utils/helpers'

class Quiz extends Component {
  state = {
    viewQuestion: true,
    questionNumber: 1,
    deck: {}
  }
  static navigationOptions = () => ({
    title: 'Quiz'
  })
  componentDidMount () {
    const { deckId } = this.props.navigation.state.params
    getDeck(deckId).then((deck) => {
      this.setState({ deck })
    })
  }
  render() {
    const { viewQuestion, deck, questionNumber } = this.state
    const question = deck.questions && deck.questions[questionNumber - 1]

    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.counter}>{questionNumber} / {deck.questions && deck.questions.length}</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          { viewQuestion
            ? <Text style={styles.title}>{question && question.question}</Text>
            : <Text style={styles.title}>{question && question.answer}</Text> }
          <Text style={styles.info} onPress={() => this.setState({ viewQuestion: !viewQuestion })}>Answer</Text>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn, { backgroundColor: green }]}
            onPress={() => console.log('btn pressed')}>
              <Text style={styles.btnText}>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn, { backgroundColor: red }]}
            onPress={() => console.log('btn pressed')}>
              <Text style={styles.btnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  counter: {
    fontSize: 20,
    marginTop: 5,
    marginLeft: 5,
  },
  info: {
    fontSize: 22,
    marginTop: 10,
    color: red,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  iosBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 17,
  },
  AndroidBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 17,
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
})

export default Quiz
