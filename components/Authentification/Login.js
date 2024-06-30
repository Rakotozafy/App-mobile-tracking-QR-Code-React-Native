/*eslint-disable*/
import React, { useEffect, useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../context';
// import { errorMessage } from './Root';


const Login = ({ submit_fields ,errorMessage}) => {
    //New
    const error_Message = useContext(errorMessage);



    const [data, setData] =  useState({
        mail_magasinier: '',
        mdp_magasinier: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const [mailError, setMailError] =  useState(0)
    const [mdpError, setMdpError] =  useState(0)
    const [mailMdp, setMailMdp] =  useState(0)

    const { colors } = useTheme();

    const { signIn } =  useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.indexOf('@') !== -1) {
            setData({
                ...data,
                mail_magasinier: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                mail_magasinier: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {

            setData({
                ...data,
                mdp_magasinier: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                mdp_magasinier: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, mdp_magasinier) => {


        if (data.mail_magasinier.length == 0) {
            setMailError(1)
            setMailMdp(0)
        }
        if (data.mdp_magasinier.length == 0) {
            setMdpError(1)
            setMailMdp(0)
        }


        submit_fields(data);
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Bienvenue!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Votre email"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        errorMessage={error_Message ? error_Message : null}
                        onChangeText={(val) => { textInputChange(val), setMailError(0), setMailMdp(0) }}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                        on

                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {mailError === 0 ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Veuiller remplire le champ adresse email</Text>
                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Mot de passe</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Votre mot de passe"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        errorMessage={error_Message ? error_Message : null}
                        onChangeText={(val) => { handlePasswordChange(val), setMdpError(0), setMailMdp(0) }}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {mdpError === 0 ? null :
                    <Animatable.View animation="fadeInLeft" duration={500} >
                        <Text style={styles.errorMsg}>Veuillez inserer votre mot de passe</Text>
                    </Animatable.View>
                }


                <TouchableOpacity>
                    {mailMdp === 0 ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Votre adresse email ou votre mot de passe est incorrect</Text>
                        </Animatable.View>
                    }
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={[styles.signIn, {
                            borderColor: '#0f3453',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                        onPress={() => { loginHandle(data.mail_magasinier, data.mdp_magasinier) }}
                    >
                        <Text style={[styles.textSign, {
                            color: '#ef8201'
                        }]}>Connexion</Text>
                    </TouchableOpacity>


                </View>
            </Animatable.View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f3453'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
