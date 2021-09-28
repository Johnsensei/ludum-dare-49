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
                <Button
                    title='Choice A'
                    onPress={() => props.navigation.replace('A')}
                />
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
        margin: 50
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    }
  });

export default Home;