import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, TextInput, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
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
                
                {/* Opening Text */}
                {/* TODO: add delay at game open. See typewriter docs. */}
                {step <= 1 ?
                    <TypeWriter
                        typing={
                            (step > 0) ? 0 : 1
                        }
                        initialDelay={1000}
                        onTypingEnd={() => {setStep(1)}}
                        style={styles.storyText}
                    >
                    Greetings.{'\n'}
                    What is your name?
                        
                    </TypeWriter>
                : null}

                {/* Initial name input. */}
                {step === 1 ?
                    <View>
                        <TextInput
                            style={styles.input}
                            maxLength={15}
                            value={playerName}
                            onChangeText={setPlayerName}
                            onSubmitEditing={() => {setStep(2)}}
                        /> 
                    </View>
                : null}

                {/* Text asking to confirm player name. */}
                {step >= 2 && step < 4 ?
                    <TypeWriter
                    typing={
                        (step > 2) ? 0 : 1
                    }
                    onTypingEnd={() => {setStep(3)}}
                    style={styles.storyText}
                >

                Your name is:{'\n'}
                {playerName}.{'\n'}
                Is this correct?
                
                </TypeWriter>
                : null}

                {/* Buttons for player to choose Yes or No that name is correct. */}
                {step === 3 ?
                    <View style={styles.buttonRow}>
                    <View style={{flex: 1, margin: 20}}>
                        <Button
                            title='Yes, that is correct.'
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.titleStyle}
                            raised={true}
                            onPress={() => setStep(6)}
                            
                        />
                    </View>
                    <View style={{flex: 1, margin: 20}}>
                        <Button
                            title='No, I need to change it.'
                            buttonStyle={styles.buttonStyle}
                            titleStyle={styles.titleStyle}
                            raised={true}
                            onPress={() => setStep(4)}
                            
                        />
                    </View>
                </View>
                : null}

                {/* Text for player to correct their name. */}
                {step >= 4 ?
                    <TypeWriter
                        typing={
                            (step > 4) ? 0 : 1
                        }
                        onTypingEnd={() => {setStep(5)}}
                        style={styles.storyText}
                    >
                        What is your name?   
                    </TypeWriter>
                : null}

                {/* Text input for player to put corrected name. */}
                {step === 5 ?
                    <View>
                        <TextInput
                            style={styles.input}
                            maxLength={15}
                            value={playerName}
                            onChangeText={setPlayerName}
                            onSubmitEditing={() => {setStep(2)}}
                        /> 
                    </View>
                : null}

                {/* Text to proceed with story if player name is correct. */}
                {step >= 6 ?
                    <TypeWriter
                        typing={
                            (step > 6) ? 0 : 1
                        }
                        onTypingEnd={() => {setStep(7)}}
                        style={styles.storyText}
                    >
                    
                    Welcome to this world, {playerName}.{'\n'}
                    What choice will you make?
                    
                    </TypeWriter>
                : null}

                {/* Buttons to make choice for next screen. */}
                {step === 7 ?
                    <View style={styles.buttonRow}>
                        <View style={{flex: 1, margin: 20}}>
                            <Button
                                title='Choice A'
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                raised={true}
                                //Pull the player name on A and B with const A = ({route, navigation}) => { const {playerName} = route.params;
                                onPress={() => props.navigation.replace('A',{playerName: playerName})}
                                
                            />
                        </View>
                        <View style={{flex: 1, margin: 20}}>
                            <Button
                                title='Choice B'
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                raised={true}
                                onPress={() => props.navigation.replace('B',{playerName: playerName})}
                                
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    buttonStyle: {
        backgroundColor: 'grey'
    },
    titleStyle: {
        color: 'white',
        fontSize: 32
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