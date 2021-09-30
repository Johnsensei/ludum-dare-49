import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, TextInput, View, Button, ImageBackground } from 'react-native';
import TypeWriter from 'react-native-typewriter';

import Background from '../img/Devil.png';

const Home = (props) => {

    const delayMap = [
        // increase delay by 400ms following every '.' character
        { at: '.', delay: 3000 }
      ];

    const [step, setStep] = useState(0);
    const [playerName, setPlayerName] = useState('');

    return(
        <View style={styles.container}>
            <ImageBackground
                source={Background}
                style={styles.imageBackground}
            >
            <View style={styles.innerContainer}>
                
                {step <= 1 ?
                    <TypeWriter
                        typing={
                            (step > 0) ? 0 : 1
                        }
                        onTypingEnd={() => {setStep(step+1)}}
                        style={styles.storyText}
                    >
                        Greetings.{'\n'}
                        What is your name?
                        
                    </TypeWriter>
                : null}

                {step === 1 ?
                    <View>
                        <TextInput
                            style={styles.input}
                            maxLength={15}
                            value={playerName}
                            onChangeText={setPlayerName}
                            onSubmitEditing={() => {setStep(step+1)}}
                        /> 
                    </View>
                : null}

                
                {step >= 2 ?
                    <TypeWriter
                        typing={
                            (step > 2) ? 0 : 1
                        }
                        onTypingEnd={() => {setStep(step+1)}}
                        style={styles.storyText}
                    >
                    Welcome to this world, {playerName}.{'\n'}
                    What choice will you make?
                    
                </TypeWriter>
                : null}

                {step === 3 ?
                    <View style={styles.buttonRow}>
                        <View style={{flex: 1, margin: 20}}>
                            <Button
                                title='Choice A'
                                onPress={() => props.navigation.replace('A')}
                                
                            />
                        </View>
                        <View style={{flex: 1, margin: 20}}>
                            <Button
                                title='Choice B'
                                onPress={() => props.navigation.replace('B')}
                                
                            />
                        </View>
                    </View>
                    : null}
                

            </View>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
      alignItems: 'center',
      justifyContent: 'center',
    },
    innerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    storyText: {
        color: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 10,
        textShadowColor: 'red',
        textAlign: 'center',
        //TODO: Choose font.
        margin: 50
    },
    buttonRow: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        // margin: 10
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    },
    input: {
        height: 100,
        width: 500,
        fontSize: 64,
        textAlign: 'center',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white'
      }
  });

export default Home;