import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import Background from '../img/hallway_2.png';

const Start = (props) => {

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
                        props.navigation.replace('Home')},
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

export default Start;