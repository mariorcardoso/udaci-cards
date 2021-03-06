import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { white, gray, purple } from '../utils/colors'
import { addDeck } from '../actions'
import { submitDeck } from '../utils/api'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { DefaultButton } from './Buttons'

class NewDeck extends Component {
  state = {
    title: ''
  }
  submit = () => {
    const { title } = this.state
    const key = title.replace(/\s/g, '')
    const deck = { 'title': title, 'questions': [] }

    this.props.dispatch(addDeck({ [key]: deck }))
    submitDeck({ key, deck })
    this.setState({title: ''})
    this.props.navigation.navigate('DeckDetail', { deckId: key })
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.center}>
          <TextInput
            style={{height: 40, fontSize: 40}}
            placeholder="Title"
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
          />
        </View>
        <DefaultButton title="Submit" onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center'
  }
})

export default connect()(NewDeck)
