import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { purple, white, gray } from '../utils/colors'
import { DefaultWhiteButton, DefaultButton } from './Buttons'
import { connect } from 'react-redux'

const DeckDetail = ({ deckId, deck, navigation }) => {
  const navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deckId
  })
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.info}>{deck.questions && deck.questions.length} cards</Text>
      </View>

      <View style={{ justifyContent: 'flex-end' }}>
        <DefaultWhiteButton title="Add Card" onPress={() => navigation.navigate('NewCard', { deckId: deckId })} />
        <DefaultButton title="Start Quiz" onPress={() => navigation.navigate('Quiz', { deckId: deckId })} />
      </View>
    </View>
  )
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

const mapStateToProps = (state, { navigation }) => {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: state[deckId],
  }
}

export default connect(
  mapStateToProps,
)(DeckDetail)
