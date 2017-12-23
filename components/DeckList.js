import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Platform } from 'react-native'
import getDecks from '../decks'
import { white, gray } from '../utils/colors'

function Deck ({ name, quantity }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.itemInfo}>{quantity} cards</Text>
    </View>
  )
}

class DeckList extends Component {
  render() {
    const decks = getDecks()

    return (
      <ScrollView>
        {decks.map(({name, quantity}) => <Deck key={name} name={name} quantity={quantity} />)}
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

export default DeckList
