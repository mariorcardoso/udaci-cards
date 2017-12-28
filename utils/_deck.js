import { AsyncStorage } from 'react-native'
import { decksDummyData } from './helpers'

export const DECKS_STORAGE_KEY = 'UdaciCards:decks'

export function formatDecksResults (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}

function setDummyData () {
  const dummyData = decksDummyData()
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))
  return dummyData
}
