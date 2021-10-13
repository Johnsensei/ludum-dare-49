import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Audio } from 'expo-av';

import Background from '../img/hallway_2.png';

const Start = (props) => {

    const [musicStatus, setMusicStatus] = useState(false)
    const [music, setMusic] = useState(new Audio.Sound());
    
    useEffect(()=>{
      (async () => {
              console.log('status', musicStatus)
              if (musicStatus) {
                  await music.loadAsync(require('../audio/lab_intro_loop_v00r00.mp3'))
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

    return(
        <View style={styles.container}>
            <ImageBackground
                source={Background}
                style={styles.imageBackground}
            >
            <View style={styles.innerContainer}>
            <Button
                title='Start Your Story'
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.titleStyle}
                raised={true}
                onPress={() => {
                    setTimeout(() => {
                        props.navigation.replace('Home',{playerName: playerName})},
                    1
                    );
                }}
            />
            </View>
            </ImageBackground>
        </View >
    );  
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

export default Start;