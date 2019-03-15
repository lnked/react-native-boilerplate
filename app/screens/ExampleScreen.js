import React, { useCallback, useReducer } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useMappedAction } from 'app/hooks/useMappedAction'
import { useMappedState } from 'app/hooks/useMappedState'
import { exampleActions, exampleSelectors } from 'app/stores/example'
import { Metrics } from 'app/theme/Metrics'
import { Colors } from 'app/theme/Colors'
import { Fonts } from 'app/theme/Fonts'

const initialState = { steps: 1, delay: 1000 }

function reducer(state, action) {
  switch (action.type) {
    case 'change-steps':
      return {
        ...state,
        steps: parseInt(action.steps, 10),
      }
    case 'change-delay':
      return {
        ...state,
        delay: parseInt(action.delay, 10),
      }
    default:
      throw new Error()
  }
}

export const ExampleScreen = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { steps, delay } = state

  const mapStateToCounter = useCallback((state) => exampleSelectors.getCounter(state), [])
  const counter = useMappedState(mapStateToCounter)

  const incrementAsync = useMappedAction(exampleActions.incrementAsync)
  const reset = useMappedAction(exampleActions.reset)

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>Counter: {counter}</Text>
      <View style={styles.row}>
        <Text style={styles.text}>Increment counter by</Text>
        <TextInput
          style={styles.input}
          keyboardType={`numeric`}
          value={steps ? `${steps}` : ''}
          onChangeText={(steps) => dispatch({ type: 'change-steps', steps })}
        />
        <Text style={styles.text}>every</Text>
        <TextInput
          style={styles.input}
          keyboardType={`numeric`}
          value={delay ? `${delay}` : ''}
          onChangeText={(delay) => dispatch({ type: 'change-delay', delay })}
        />
        <Text style={styles.text}>ms</Text>
      </View>
      <View style={styles.button}>
        <Button
          onPress={() => {
            incrementAsync(steps, delay)
          }}
          title={`Increment by ${steps} every ${delay} ms!`}
        />
      </View>
      <View style={styles.button}>
        <Button onPress={reset} title={`Reset counter!`} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  counter: {
    fontSize: Fonts.size.h1,
    textAlign: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Metrics.largeMargin,
  },
  text: {
    flex: 1,
    textAlign: 'center',
  },
  input: {
    flex: 2,
    height: 45,
    borderColor: Colors.grey,
    borderWidth: 2,
  },
  button: {
    margin: Metrics.baseMargin,
    padding: Metrics.baseMargin,
  },
})
