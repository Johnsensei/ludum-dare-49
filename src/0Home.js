import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import TypeWriter from 'react-native-typewriter';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Audio } from 'expo-av';

import Background from '../img/hallway_2.png';

const Home = (props) => {

    //Code for sound settings.
    const status = {
        shouldPlay: false
    }

    const typeSFX1 = new Audio.Sound();
    typeSFX1.loadAsync(require('../audio/digital-typing-1.mp3'), status, false);
    const typeSFX2 = new Audio.Sound();
    typeSFX2.loadAsync(require('../audio/digital-typing-2.mp3'), status, false);

    function playSFX(sfx){
        try {
            sfx.replayAsync();
        } catch (error) {
            console.log(err);
        }
    }

    function typeSFX(token, num){
            (num % 2 !== 0) ? playSFX(typeSFX1) : playSFX(typeSFX2);
        }

    const [musicStatus, setMusicStatus] = useState(true)
    const [music] = useState(new Audio.Sound());
    
    useEffect(()=>{
      (async () => {
              console.log('status', musicStatus)
              if (musicStatus) {
                  await music.loadAsync(require('../audio/lab_intro_loop_v00r00.mp3'))
                  try {
                    //Change this whether you want looping or not.
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

    //Game progression state setup.
    const [step, setStep] = useState(0);

    const [playerName, setPlayerName] = useState('');

    const typeMin = 5;
    const typeMax = 25;

    return(
        <View style={styles.container}>
            <ImageBackground
                source={Background}
                style={styles.imageBackground}
            >
            <View style={styles.innerContainer}>

                {/* Opening Text */}
                {step >= 0 && step < 2 ?
                    <TypeWriter
                        typing={
                            (step > 0) ? 0 : 1
                        }
                        initialDelay={1000}
                        minDelay={typeMin}
                        maxDelay={typeMax}
                        delayMap={[{at: /\.-!\?/, delay: 400}]}
                        onTyped = {typeSFX}
                        onTypingEnd={() => { setStep(1);}}
                        style={styles.storyText}
                    >
                        Today is your first day working at the Fourth Energy Research Lab.{'\n'}
                        You’ve worked and studied for much of your career to end up here: researching a renewable supply of clean energy by splitting atoms on a small scale.
                        
                    </TypeWriter>
                : null}

                {step === 1 ?
                    <View style={styles.buttonRight}>
                        <Button
                            title='Continue'
                            onPress={()=> setStep(2)}
                        />
                    </View>
                : null}

                {step >= 2 && step < 4 ?
                    <TypeWriter
                        typing={
                            (step > 2) ? 0 : 1
                        }
                        minDelay={typeMin}
                        maxDelay={typeMax}
                        delayMap={[{at: /\.-!\?/, delay: 400}]}
                        onTyped = {typeSFX}
                        onTypingEnd={() => { setStep(3)}}
                        style={styles.storyText}
                    >
                        After passing through security and being directed down the hall, you see Dr. Right in the distance.
                        Yes, the famous Dr. Right whose research into Fourth Energy could be the answer to solve climate change.

                </TypeWriter>
                : null}

                {step === 3 ?
                    <View style={styles.buttonRight}>
                        <Button
                            title='Continue'
                            onPress={()=> setStep(4)}
                        />
                    </View>
                : null}

                {step >= 4 && step < 6 ?
                    <TypeWriter
                        typing={
                            (step > 4) ? 0 : 1
                        }
                        minDelay={typeMin}
                        maxDelay={typeMax}
                        delayMap={[{at: /\.-!\?/, delay: 400}]}
                        onTyped = {typeSFX}
                        onTypingEnd={() => { setStep(5)}}
                        style={styles.storyText}
                        >
                        Dr. Right approaches you.{'\n'}
                        “Hello. You must be our new researcher.{'\n'}
                        What is your name?”

                    </TypeWriter>
                : null}

                {/* Initial name input. */}
                {step === 5 ?
                    <View>
                        <TextInput
                            style={styles.input}
                            maxLength={15}
                            value={playerName}
                            onChangeText={setPlayerName}
                            onSubmitEditing={() => {setStep(6)}}
                        />
                    </View>
                : null}

                {/* Text asking to confirm player name. */}
                {step >= 6 && step < 8 ?
                    <TypeWriter
                        typing={
                            (step > 6) ? 0 : 1
                        }
                        minDelay={typeMin}
                        maxDelay={typeMax}
                        delayMap={[{at: /\.-!\?/, delay: 400}]}
                        onTyped = {typeSFX}
                        onTypingEnd={() => {setStep(7)}}
                        style={styles.storyText}
                    >

                        Your name is:{'\n'}
                        {playerName}.{'\n'}
                        Do I have that right?
                    
                    </TypeWriter>
                : null}

                {/* Buttons for player to choose Yes or No that name is correct. */}
                {step === 7 ?
                    <View>
                        <View style={{margin: 10}}>
                            <Button
                                title='Yes, that is correct.'
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                raised={true}
                                onPress={() => setStep(10)}
                                
                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button
                                title='No, I need to make a correction.'
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                raised={true}
                                onPress={() => setStep(8)}
                                
                            />
                        </View>
                    </View>
                : null}

                {/* Text for player to correct their name. */}
                {step >= 8 && step < 10 ?
                    <TypeWriter
                        typing={
                            (step > 8) ? 0 : 1
                        }
                        minDelay={typeMin}
                        maxDelay={typeMax}
                        onTyped = {typeSFX}
                        delayMap={[{at: /\.-!\?/, delay: 400}]}
                        onTypingEnd={() => {setStep(9)}}
                        style={styles.storyText}
                    >
                        What is your name?   
                    </TypeWriter>
                : null}

                {/* Text input for player to put corrected name. */}
                {step === 9 ?
                    <View>
                        <TextInput
                            style={styles.input}
                            maxLength={15}
                            value={playerName}
                            onChangeText={setPlayerName}
                            onSubmitEditing={() => {setStep(6)}}
                        /> 
                    </View>
                : null}

                {/* Text to proceed with story if player name is correct. */}
                {step >= 10 && step < 12 ?
                    <TypeWriter
                        typing={
                            (step > 10) ? 0 : 1
                        }
                        minDelay={typeMin}
                        maxDelay={typeMax}
                        delayMap={[{at: /\.-!\?/, delay: 400}]}
//Stopped crashing here after I upgraded expo on device.
                        onTyped = {typeSFX}
                        onTypingEnd={() => setStep(11)}
                        style={styles.storyText}
                    >
                        “Welcome to the Fourth Energy Research Facility, {playerName}.{'\n'}
                        Hope you like coffee! There’s a lot of late nights around here, but it’s exciting work.
                        Let me introduce you to some of your colleagues.
                    
                    </TypeWriter>
                : null}

                {step === 11 ?
                    <View style={styles.buttonRight}>
                        <Button
                            title='Continue'
                            onPress={()=> {
                                setStep(12);
                            }}
                        />
                    </View>
                    
                : null}

                {step >= 12 && step < 14 ?
                    <TypeWriter
                        typing={
                            (step > 12) ? 0 : 1
                        }
                        minDelay={typeMin}
                        maxDelay={typeMax}
                        delayMap={[{at: /\.-!\?/, delay: 400}]}
                        onTyped = {typeSFX}
                        onTypingEnd={() => {setStep(13);
                        }}
                        style={styles.storyText}
                    >
                        This is Diane and Ethan, two of the senior researchers you’ll be working with.
                        And over here is our Chief Medical Officer Dr. Bones. Don’t ask us why we call her that!”
                    
                    </TypeWriter>
                : null}

                {step === 13 ?
                    <View style={styles.buttonRight}>
                        <Button
                            title='Continue'
                            onPress={()=> {
                                setStep(14);
                                setMusicStatus(!musicStatus);
                            }}
                        />
                    </View>
                    
                : null}

                {step >= 14 && step < 16 ?
                    <TypeWriter
                    typing={
                        (step > 14) ? 0 : 1
                    }
                    minDelay={typeMin}
                    maxDelay={typeMax}
                    onTyped = {typeSFX}
                    delayMap={[{at: /\.-!\?/, delay: 400}]}
                    onTypingEnd={() => {setStep(15)}}
                    style={styles.storyText}
                >
                    “Warning! Warning! A critical breach has occurred at the reactor level. All personnel evacuate immediately!”   
                </TypeWriter>
                : null}

                {step === 15 ?
                    <View style={styles.buttonRight}>
                    <Button
                        title='Continue'
                        onPress={()=> setStep(16)}
                    />
                    </View>
                : null}

                {step >= 16 && step < 18 ?
                    <TypeWriter
                        typing={
                            (step > 16) ? 0 : 1
                        }
                        minDelay={typeMin}
                        maxDelay={typeMax}
//Stopped crashing here after implementing try catch in typeSFX.
                        onTyped = {typeSFX}
                        delayMap={[{at: /\.-!\?/, delay: 400}]}
                        onTypingEnd={() => {setStep(17)}}
                        style={styles.storyText}
                    >
                        A loud rumbling sound envelopes the entire facility. The walls begin to bend. The floor begins to shake. Everyone has panicked and scattered throughout the facility. Whatever happened at the reactor level, it’s made the entire building unstable.   
                    </TypeWriter>
                : null}

                {step === 17 ?
                    <View style={styles.buttonRight}>
                    <Button
                        title='Continue'
                        onPress={()=> setStep(18)}
                    />
                    </View>
                : null}

                {step >= 18 && step < 20 ?
                    <TypeWriter
                        typing={
                            (step > 18) ? 0 : 1
                        }
                        minDelay={typeMin}
                        maxDelay={typeMax}
//Now crashing here with different error messages.
                        onTyped = {typeSFX}
                        delayMap={[{at: /\.-!\?/, delay: 400}]}
                        onTypingEnd={() => {setStep(19)}}
                        style={styles.storyText}
                    >
                        What do you do?  
                    </TypeWriter>
                : null}

                {/* Buttons to make choice for next screen. */}
                {step === 19 ?

                    <View>
                        <View style={{margin: 10}}>
                            <Button
                                title='Save people'
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                raised={true}
                                onPress={() => {
                                    setTimeout(() => {
                                        props.navigation.replace('A',{playerName: playerName})},
                                        1
                                    );
                                }}
                            />
                        </View >

                        <View style={{margin: 10}}>
                            <Button
                                title='Escape'
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                raised={true}
                                onPress={() => {
                                    setTimeout(() => {
                                        props.navigation.replace('B',{playerName: playerName})},
                                        1
                                    );
                                }}
                            />
                        </View>

                        <View style={{margin: 10}}>
                            <Button
                                title='Investigate the cause of the accident'
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                raised={true}
                                onPress={() => {
                                    setTimeout(() => {
                                        props.navigation.replace('C',{playerName: playerName})},
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
        fontSize: RFPercentage(4),
        fontWeight: 'bold',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 10,
        textShadowColor: '#0002B7',
        textAlign: 'center',
        margin: 50
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