/**
 * Jika icon dari native-base tidak keluar copy paste ini -->
 * apply from: "../../node_modules/react-native-vector-icons/fonts.gradle
 * ke android/app/build.gradle
 * 
 */
import React from 'react';
import { Icon } from 'native-base';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


const Footers = ({ title, onPressed, onLongPressed, active }) => {

    const Icons = () => {
        if (title === 'Home') {
            return <Icon name="apps" style={styles.iconActived(active)} />
        }

        if (title === 'Masakan') {
            return <Icon name="pizza" />
        }

        if (title === 'Kota') {
            return <Icon active name="home" style={styles.iconActived(active)} />
        }
        if (title === 'Collections') {
            return <Icon name="grid" style={styles.iconActived(active)} />
        }

        return null;
    }

    return (
        <>
            <TouchableOpacity style={styles.container} vertical onPress={onPressed} onLongPress={onLongPressed}>
                <Icons />
                <Text style={styles.text(active)}>{title}</Text>
            </TouchableOpacity>
        </>
    );
}

export default Footers;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    text: (active)=>({
        fontSize: 10,
        marginTop: 4,
        color: active ? 'white' : 'black'
    }),
    iconActived: (active)=>({
        color: active ? 'white' : 'black'
    })
});