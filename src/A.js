import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import TypeWriter from 'react-native-typewriter';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Audio } from 'expo-av';
import * as Linking from 'expo-linking';

import Background from '../img/hallway.png';

const A = (props) => {
    
    //Code for sound settings.
    const status = {
        shouldPlay: false
    }

    const typeSFX1 = new Audio.Sound();
    typeSFX1.loadAsync(require('../audio/digital-typing-1.mp3'), status, false);
    const typeSFX2 = new Audio.Sound();
    typeSFX2.loadAsync(require('../audio/digital-typing-2.mp3'), status, false);

    function playSFX(sfx){
        sfx.replayAsync();
    }

    //Game progression state setup.
    const [step, setStep] = useState(0);

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
                        onTyped = {(token, num) => {
                            (num % 2 !== 0) ? playSFX(typeSFX1) : playSFX(typeSFX2)
                        }}
                        onTypingEnd={() => { setStep(1);
                                        }}
                        style={styles.storyText}
                    >
                    You chose to save people. Good for you.
                        
                    </TypeWriter>
                : null}
                
                {step === 1 ?
                    <View>
                        <View style={{margin: 10}}>
                            <Button
                                title='Play the full game'
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                raised={true}
                                onPress={() => {
                                    Linking.openURL('https://johnsensei.itch.io/fourth-energy');
                                }}
                            />
                        </View>
                        <View style={{margin: 10}}>
                            <Button
                                title='Start demo over'
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                raised={true}
                                onPress={() => {
                                    setTimeout(() => {
                                        props.navigation.replace('Home')},
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
    }
  });

export default A;