import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Platform } from 'react-native'
import { white, gray } from '../utils/colors'
import { connect } from 'react-redux'
import { receiveDecks, addDeck } from '../actions'
import { fetchDecks } from '../utils/api'

function Deck ({ id, title, quantity, navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DeckDetail', { deckId: id })}>
      <View style={styles.item}>
        <Text style={styles.itemName}>{title}</Text>
        <Text style={styles.itemInfo}>{quantity} cards</Text>
      </View>
    </TouchableOpacity>
  )
}

class DeckList extends Component {
  componentDidMount () {
    const { dispatch } = this.props

    fetchDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then((decks) => { this.setState({ decks }) })
  }
  render() {
    const { navigation , decks} = this.props

    return (
      <ScrollView>
        {Object.keys(decks).map((key) => {
          const { title, questions } = decks[key]
          return <Deck key={key} id={key} title={title} quantity={questions.length} navigation={navigation} />
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  itemName: {
    fontSize: 30
  },
  itemInfo: {
    fontSize: 20,
    color: gray
  }
})

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(DeckList)
