import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {Entypo} from '@expo/vector-icons'


export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const buttons = ['AC', '+/-', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 3, 2, 1, '+', 0, '.', '=']  

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")
  
  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
      width: '100%',
      minHeight: 300,
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    resultText: {
      color: darkMode ? "#f5f5f5" : "#282F38",
      margin: 10,
      fontSize: 45
    },
    historico: {  
      color: darkMode ? "#b5b7bb" : "#7c7c7c",
      marginRight: 10,
      alignSelf: 'flex-end',
      fontSize: 20
    },
    themeButtons: {
      alignSelf: 'flex-start',
      bottom: 130,
      margin: 15,
      backgroundColor: darkMode ? "#7b8084" : "#e5e5e5e5",
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5e5',
      minWidth: 90,
      minHeight: 90,
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 20
    }
  });

  function handleInput(buttonPressed){
    console.log(buttonPressed)
    if(buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "*" | buttonPressed === "/" ){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch(buttonPressed){
      case 'AC':
        setLastNumber("")
        setCurrentNumber("")
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        return
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }

  function calculator(){
    const splitNumbers = currentNumber.split(' ')
    const fistNumber = parseFloat(splitNumbers[0])
    const lastNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]

    switch(operator){
      case '+':
        setCurrentNumber((fistNumber + lastNumber).toString())
        return
      case '-': 
        setCurrentNumber((fistNumber - lastNumber).toString())
        return
      case '*':
        setCurrentNumber((fistNumber * lastNumber).toString())
        return
      case '/': 
        setCurrentNumber((fistNumber / lastNumber).toString())
        return
    }
  }
  
  return (
    <View>
      <View style={styles.results} >
        <TouchableOpacity style={styles.themeButtons}>
          <Entypo name={darkMode ? "light-up" : "moon"} size="24" color={darkMode ? "white" : "black"} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)} />  
        </TouchableOpacity>
        <Text style={styles.historico}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) => 
          button === '=' ?
          <TouchableOpacity key={button} onPress={() => handleInput(button)} style={[styles.button, {backgroundColor: '#a542ee'} ]}>
            <Text style={[styles.textButton, {color: "white", fontSize: 30}]}>{button}</Text>
          </TouchableOpacity>
            :
          <TouchableOpacity key={button} onPress={() => handleInput(button)} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode === true ? '#303946' : '#fff': darkMode === true ? '#' : '#ededed'}]}>
                <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}