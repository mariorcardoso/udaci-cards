import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { purple, white, gray } from '../utils/colors'
import { getDeck } from '../utils/helpers'

class DeckDetail extends Component {
  state = {
    deck: {}
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deckId
  })
  componentDidMount () {
    const { deckId } = this.props.navigation.state.params
    getDeck(deckId).then((deck) => {
      this.setState({ deck })
    })
  }
  render() {
    const { deck } = this.state
    const { deckId } = this.props.navigation.state.params

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.info}>{deck.questions && deck.questions.length} cards</Text>
        </View>

        <View style={{ justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={[Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn, styles.blankBtn]}
            onPress={() => this.props.navigation.navigate('NewCard', { deckId: deckId })}>
              <Text style={[styles.btnText, styles.blankBtnText]}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn}
            onPress={() => this.props.navigation.navigate('Quiz', { deckId: deckId })}>
              <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
  },
  info: {
    fontSize: 30,
    marginTop: 15,
    color: gray,
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

export default DeckDetail
