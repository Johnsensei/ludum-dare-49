import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';

import Background from '../img/Devil.png';

const Home = (props) => {

    return(
        <View style={styles.container}>
            <ImageBackground
                source={Background}
                style={styles.imageBackground}
            >
            <View style={styles.innerContainer}>
                <Text style={styles.storyText}>Home</Text>
                
                <View style={styles.buttonRow}>
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