import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'UdaciCards:decks'

function decksDummyData () {
  const info = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    },
    NewDeck1: {
      title: 'New Deck 1',
      questions: [
        {
          question: 'Does React Native work with Android?',
          answer: 'Yes!'
        },
        {
          question: 'What is a component?',
          answer: 'Components let you split the UI into independent, reusable pieces...'
        }
      ]
    }
  }

  return info
}

function setDummyData () {
  const dummyData = decksDummyData()
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}

// PUBLIC INTERFACE
export function getDecks() {
  setDummyData()
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      return JSON.parse(results)
    })
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      return data[id]
    })
}

export function saveDeckTitle(title) {
  // return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
  //   [key]: entry
  // }))
}

export function addCardToDeck(title, card) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}
