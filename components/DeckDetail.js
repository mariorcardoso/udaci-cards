import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { purple, white, gray } from '../utils/colors'
import { getDeck } from '../utils/helpers'
import { DefaultWhiteButton, DefaultButton } from './Buttons'

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
          <DefaultWhiteButton title="Add Card" onPress={() => this.props.navigation.navigate('NewCard', { deckId: deckId })} />
          <DefaultButton title="Start Quiz" onPress={() => this.props.navigation.navigate('Quiz', { deckId: deckId })} />
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
})

export default DeckDetail
