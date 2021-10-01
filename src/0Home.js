import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import TypeWriter from 'react-native-typewriter';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Audio } from 'expo-av';

import Background from '../img/Devil.png';

const Home = (props) => {

    //Code for sound settings.

//This block of code works for playing music but not stopping it.
    // let music1 = new Audio.Sound();
    // music1.loadAsync(require('../audio/music1.mp3'));

    // function playAudio(audio){
    //     audio.playAsync();
    // }

    // function stopAudio(audio){
    //     audio.stopAsync();
    //     audio.unloadAsync();
    // }

    let typeSFX1 = new Audio.Sound();
    typeSFX1.loadAsync(require('../audio/type1-5.mp3'));
    let typeSFX2 = new Audio.Sound();
    typeSFX2.loadAsync(require('../audio/type2.mp3'));

    function playSFX(sfx){
        sfx.replayAsync();
        //Do we need to unload the sfx?
    }


    const [musicStatus, setMusicStatus] = useState(false)
    const [music, setMusic] = useState(new Audio.Sound());
    
    useEffect(()=>{
      (async () => {
              console.log('status', musicStatus)
              if (musicStatus) {
                  await music.loadAsync(require('../audio/music1.mp3'))
                  try {
                    await music.setIsLoopingAsync(true); 
                    await music.playAsync()
                  } catch (err) {
                      console.log(err)
                  }
              }else {
                  await music.stopAsync()
                  await music.unloadAsync()
              }
            })()
    },[musicStatus]) 


    const typewriterSounds = (token, num) => {
        //Alternate which sound plays based on even/odd of num.
    }

    //Game progression state setup.
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
                {step <= 1 ?
                    <TypeWriter
                        typing={
                            (step > 0) ? 0 : 1
                        }
                        initialDelay={1000}
                        maxDelay={100}
                        delayMap={[{at: /\./, delay: 400}]}
                        // onTyped={() => playSFX(typeSFX1)}
                        onTyped = {(token, num) => {
                            (num % 2 === 0) ? playSFX(typeSFX2) : playSFX(typeSFX1)
                        }}
                        onTypingEnd={() => { setStep(1);
                                            setMusicStatus(!musicStatus);
                                            // playSFX(typeSFX1);
                                        }}
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
                        {/* <Button title='Type' onPress={() => playSFX(typeSFX1)}/> */}
                    </View>
                : null}

                {/* Text asking to confirm player name. */}
                {step >= 2 && step < 4 ?
                    <TypeWriter
                    typing={
                        (step > 2) ? 0 : 1
                    }
                    delayMap={[{at: /\./, delay: 400}]}
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
                        delayMap={[{at: /\./, delay: 400}]}
                        onTypingEnd={() => {setStep(7);
                        }}
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
                                onPress={() => {
                                    setMusicStatus(!musicStatus);
                                    setTimeout(() => {
                                        props.navigation.replace('A',{playerName: playerName})},
                                    1
                                    );
                                }}
                            />
                        </View>
                        <View style={{flex: 1, margin: 20}}>
                            <Button
                                title='Choice B'
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                raised={true}
                                onPress={() => {
                                    setMusicStatus(!musicStatus);
                                    setTimeout(() => {
                                        props.navigation.replace('B',{playerName: playerName})},
                                    1
                                    );
                                }}
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
        fontSize: RFPercentage(5),
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
        fontSize: RFPercentage(3)
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