import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { purple, white, gray } from '../utils/colors'

export const DefaultWhiteButton = ({ onPress, title, style = {} }) => (
  <TouchableOpacity
    style={[Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn, styles.blankBtn, style]}
    onPress={() => onPress()}>
    <Text style={[styles.btnText, styles.blankBtnText]}>{title}</Text>
  </TouchableOpacity>
)

export const DefaultButton = ({ onPress, title, style = {} }) => (
  <TouchableOpacity
    style={[Platform.OS === 'ios' ? styles.iosBtn : styles.AndroidBtn, style]}
    onPress={() => onPress()}>
    <Text style={styles.btnText}>{title}</Text>
  </TouchableOpacity>
)

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
