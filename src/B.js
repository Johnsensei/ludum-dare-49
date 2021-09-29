import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';

import Background from '../img/World.png';

const B = (props) => {

    return(
        <View style={styles.container}>
            <ImageBackground
                source={Background}
                style={styles.imageBackground}
            >
            <View style={styles.innerContainer}>
                <Text style={styles.storyText}>Choice B</Text>
                
                <View style={styles.buttonRow}>
                {/* <View> */}
                    <Button
                        title='Choice E'
                        onPress={() => props.navigation.replace('A')}
                        style={styles.choiceButton}
                    />
                    <Button
                        title='Choice F'
                        onPress={() => props.navigation.replace('B')}
                        style={styles.choiceButton}
                    />
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
        //TODO: Choose font.
        margin: 50
    },
    buttonRow: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    choiceButton: {
        flexDirection: 'row',
        flex: 1,
        marginHorizontal: 20,
        marginRight: 20,
        margin: 20,
        padding: 10,
        justifyContent: 'space-evenly'
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    }
  });

export default B;