import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

const SplashScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#0f3453' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={[styles.title, { color: '#fff' }]}> Jirama DPAL </Text>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View
                style={[styles.comp, {
                    // backgroundColor: colors.background
                }]}
                animation="fadeInUpBig"
            > 
            <ImageBackground
            source={require('../assets/carte.jpg')} resizeMode="stretch" style={styles.footer}>
           
                <Text style={[styles.title, {
                    color: colors.text,
                    alignItems:'center',
                    marginLeft:65,
                    marginTop:20

                }]}>Connectez-vous</Text>
                <Text style={styles.text}>Tracking QR Code</Text>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            borderColor: '#05375a',
                            borderWidth: 5,
                            marginTop: 70,
                            marginRight:30
                        }]}
                        onPress={() => navigation.navigate('Authentification')}>

                        <Text style={[styles.textSign,{marginLeft:10}]}>Commencer</Text>
                        <MaterialIcons
                            name="navigate-next"
                            color='orange'
                            size={40}
                        />

                    </TouchableOpacity>
                </View>
                </ImageBackground>
            </Animatable.View>
        </View>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f3453'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    comp: {
    flex: 1,
        // backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 0,
        paddingHorizontal: 0
  },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",   
        paddingVertical: 0,
        paddingHorizontal: 0
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold',
    },
    text: {
        color: 'grey',
        marginTop: 5,
        marginLeft:70,
        
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: '#05375a',
        fontWeight: 'bold'
    }
});

