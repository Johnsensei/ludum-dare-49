import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import TypeWriter from 'react-native-typewriter';

import Background from '../img/Devil.png';

const Home = (props) => {

    const delayMap = [
        // increase delay by 400ms following every '.' character
        { at: '.', delay: 3000 }
      ];

    const [step, setStep] = useState(0);

    return(
        <View style={styles.container}>
            <ImageBackground
                source={Background}
                style={styles.imageBackground}
            >
            <View style={styles.innerContainer}>
                <TypeWriter
                    typing={
                        (step > 0) ? 0 : 1
                    }
                    onTypingEnd={() => {setStep(step+1)}}
                    style={styles.storyText}
                >
                    Greetings.{'\n'}
                    What choice will you make?
                    
                </TypeWriter>

                
                <View style={styles.buttonRow}>
                {step===1 ?
                    <>
                    <View style={{flex: 1, margin: 20}}>
                        <Button
                            title='Choice A'
                            onPress={() => props.navigation.replace('A')}
                            // style={styles.choiceButton}
                        />
                    </View>
                    <View style={{flex: 1, margin: 20}}>
                        <Button
                            title='Choice B'
                            onPress={() => props.navigation.replace('B')}
                            // style={styles.choiceButton}
                        />
                    </View>
                    </>
                    : null}
                </View>

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
    choiceButton: {
        backgroundColor: 'grey'
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    }
  });

export default Home;