import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'UdaciCards:decks'

export function formatDecksResults (results) {
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}
