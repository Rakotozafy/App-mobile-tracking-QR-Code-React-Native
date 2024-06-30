import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../components/context';
import axios from 'axios';
import { api } from '../api/api.js'



export function DrawerContent(props) {
    const [magasin, setMagasin] = useState({})
    const [magasinier, setMagasinier] = useState({})
    useEffect(() => {
        axios.get(api + 'magasin').then((res) => {
            setMagasin(res.data);
        })
        axios.get(api + 'magasinier').then((allMagasinier) => {
            setMagasinier(allMagasinier.data);
        })
    }, [])

    const nombre1 = magasin.length
    const nombre2 = magasinier.length


    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);

    return (
        <View style={{ flex: 1 }} >
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={require('../assets/logo.png')} resizeMode="stretch"
                            // size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>Tracking QR Code</Title>
                                <Paragraph style={styles.caption}>Direction</Paragraph>
                                <Paragraph style={styles.caption}>Principal</Paragraph>
                                <Paragraph style={styles.caption}>Approvisionnement</Paragraph>
                                <Paragraph style={styles.caption}>Logistique</Paragraph>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Caption style={styles.caption}>Magasin</Caption>

                                <Paragraph style={[styles.paragraph, styles.caption]}> : {nombre1} </Paragraph>

                            </View>
                            <View style={styles.section}>
                                <Caption style={styles.caption}>Magasinier</Caption>

                                <Paragraph style={[styles.paragraph, styles.caption]}> : {nombre2} </Paragraph>

                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Accueil"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="bookmark-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Livraison"
                            onPress={() => { props.navigation.navigate('Profile') }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => { props.navigation.navigate('SettingsScreen') }}
                        />

                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => { toggleTheme() }}>
                            <View style={styles.preference}>
                                <Text>Mode sombre</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Deconnexion"
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
