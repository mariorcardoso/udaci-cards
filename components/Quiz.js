import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, Button } from 'react-native'
import { gray, white, purple, red, green } from '../utils/colors'
import { connect } from 'react-redux'
import { DefaultButton, DefaultWhiteButton } from './Buttons'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  state = {
    viewQuestion: true,
    questionNumber: 1,
    score: 0
  }
  static navigationOptions = () => ({
    title: 'Quiz'
  })
  nextQuestion(guess) {
    let { score, questionNumber } = this.state
    guess && (score += 1)
    if(this.isComplete()) {
      this.manageNotifications()
    } else {
      questionNumber += 1
    }
    this.setState({ score, questionNumber })
  }
  manageNotifications () {
    clearLocalNotification()
      .then(setLocalNotification)
  }
  isComplete() {
    const { questionNumber } = this.state
    const { deck } = this.props
    return deck.questions && (deck.questions.length < questionNumber)
  }
  render() {
    const { deckId, deck } = this.props
    const { viewQuestion, questionNumber, score } = this.state
    const question = deck.questions && deck.questions[questionNumber - 1]

    return (
      <View style={{ flex: 1 }}>
        {this.isComplete()
        ? (
          <View style={{ flex: 1 }}>
            <View style={styles.center}>
              <Text style={{fontSize: 25}}>Finished!</Text>
              <Text style={{fontSize: 50, fontWeight: 'bold'}}>Score: {Math.round((score / deck.questions.length) * 100)}%</Text>
            </View>

            <View style={{ justifyContent: 'flex-end' }}>
              <DefaultWhiteButton title="Deck Initial Page"
                onPress={() => this.props.navigation.navigate('DeckDetail', { deckId: deckId })} />
              <DefaultButton title="Start Quiz"
                onPress={() => this.props.navigation.navigate('Quiz', { deckId: deckId })} />
            </View>
          </View>
        )
        : (
          <View style={{ flex: 1 }}>
            <Text style={styles.counter}>{questionNumber} / {deck.questions && deck.questions.length}</Text>
            <View style={styles.center}>
              { viewQuestion
                ? <Text style={styles.title}>{question && question.question}</Text>
                : <Text style={styles.title}>{question && question.answer}</Text> }
              <Button
                onPress={() => this.setState({ viewQuestion: !viewQuestion })}
                title={viewQuestion ? 'Answer' : 'Question'}
                color={red} />
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
              <DefaultButton title="Correct" onPress={() => this.nextQuestion(true)} style={{backgroundColor: green}} />
              <DefaultButton title="Incorrect" onPress={() => this.nextQuestion(false)} style={{backgroundColor: red}} />
            </View>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  counter: {
    fontSize: 20,
    marginTop: 5,
    marginLeft: 5,
  }
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: state[deckId],
  }
}

export default connect(
  mapStateToProps,
)(Quiz)
