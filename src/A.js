import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import TypeWriter from 'react-native-typewriter';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Audio } from 'expo-av';

import Background from '../img/DemonCastle.png';

const A = ({route, props}) => {

    //Params passed down.
    const {playerName, navigation} = route.params;

    //Code for sound settings.
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
                    //Change this whether you want looping or not.
                    //As there is no way to fade music out, short non-looping music files may be best.
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
                            (num % 2 === 0) ? playSFX(typeSFX2) : playSFX(typeSFX1)
                        }}
                        onTypingEnd={() => { setStep(1);
                                            // setMusicStatus(!musicStatus);
                                        }}
                        style={styles.storyText}
                    >
                    The player {playerName} went with Choice A.
                        
                    </TypeWriter>
                : null}
                
                {step === 1 ?
                    <View style={styles.buttonRow}>
                    <View style={{flex: 1, margin: 20}}>
                            <Button
                                title='Choice C - Go Home for Now'
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                raised={true}
                                onPress={() => {
                                    // setMusicStatus(!musicStatus);
                                    setTimeout(() => {
                                        props.navigation.replace('Home',{playerName: playerName})},
                                    1
                                    );
                                }}
                            />
                        </View>
                        <View style={{flex: 1, margin: 20}}>
                            <Button
                                title='Choice D - Go Home for Now'
                                buttonStyle={styles.buttonStyle}
                                titleStyle={styles.titleStyle}
                                raised={true}
                                onPress={() => {
                                    // setMusicStatus(!musicStatus);
                                    setTimeout(() => {
                                        props.navigation.replace('Home',{playerName: playerName})},
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

export default A;