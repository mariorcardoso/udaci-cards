import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, Button } from 'react-native'
import { gray, white, purple, red, green } from '../utils/colors'
import { getDeck } from '../utils/helpers'

class Quiz extends Component {
  state = {
    viewQuestion: true,
    questionNumber: 1,
    deck: {},
    score: 0
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
  nextQuestion(guess) {
    let { score, questionNumber } = this.state
    guess && (score += 1)
    !(this.isComplete()) && (questionNumber += 1)
    this.setState({ score, questionNumber })
  }
  isComplete() {
    const { questionNumber, deck } = this.state
    return deck.questions && (deck.questions.length < questionNumber)
  }
  render() {
    const { deckId } = this.props.navigation.state.params
    const { viewQuestion, deck, questionNumber, score } = this.state
    const question = deck.questions && deck.questions[questionNumber - 1]

    return (
      <View style={{ flex: 1 }}>
        {this.isComplete()
        ? (
          <View style={{ flex: 1 }}>
            <View style={styles.center}>
              <Text style={{fontSize: 25}}>Finished!</Text>
              <Text style={{fontSize: 50, fontWeight: 'bold'}}>Score: {(score / deck.questions.length) * 100}%</Text>
            </View>

            <View style={{ justifyContent: 'flex-end' }}>
              <TouchableOpacity
                style={[Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn, styles.blankBtn]}
                onPress={() => this.props.navigation.navigate('DeckDetail', { deckId: deckId })}>
                  <Text style={[styles.btnText, styles.blankBtnText]}>Deck Initial Page</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn}
                onPress={() => this.props.navigation.navigate('Quiz', { deckId: deckId })}>
                  <Text style={styles.btnText}>Start Quiz</Text>
              </TouchableOpacity>
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
              <TouchableOpacity
                style={[Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn, { backgroundColor: green }]}
                onPress={() => this.nextQuestion(true)}>
                  <Text style={styles.btnText}>Correct</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn, { backgroundColor: red }]}
                onPress={() => this.nextQuestion(false)}>
                  <Text style={styles.btnText}>Incorrect</Text>
              </TouchableOpacity>
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
  },
  blankBtnText: {
    color: purple,
  },
  blankBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
  }
})

export default Quiz
