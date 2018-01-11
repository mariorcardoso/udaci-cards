import { AsyncStorage } from 'react-native'
import { formatDecksResults, DECKS_STORAGE_KEY } from './_deck'

export const fetchDecks = () => (
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDecksResults)
)

export const submitDeck = ({ key, deck })  => (
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
)

export const submitCard = ({ deckId, card }) => (
  AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckId].questions.push(card)
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
      return card
    })
)
