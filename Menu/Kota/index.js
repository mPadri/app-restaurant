import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Container, Header, Tabs, Tab, ScrollableTab } from 'native-base';
import RestaurantKota from './RestaurantKota';

const Kota = ({navigation}) => {
// console.log('isi navi: ', navigation)
    return (
        <Container>
            <Tabs tabBarBackgroundColor="#bf3939" renderTabBar={() => <ScrollableTab />}>
                <Tab activeTabStyle={styles.tabStyle} tabStyle={styles.tabStyle} heading="Jakarta">
                    <RestaurantKota nama="Jakarta" id_kota={74} navigation={navigation} />
                </Tab>
                <Tab activeTabStyle={styles.tabStyle} tabStyle={styles.tabStyle} heading="Bandung">
                    <RestaurantKota nama="Bandung" id_kota={11052} navigation={navigation} />
                </Tab>
                <Tab activeTabStyle={styles.tabStyle} tabStyle={styles.tabStyle} heading="Bali">
                    <RestaurantKota nama="Bali" id_kota={170} navigation={navigation} />
                </Tab>
            </Tabs>
        </Container>
    );
}

export default Kota;

const styles = StyleSheet.create({
    tabStyle: {
        backgroundColor:"#bf3939"
    }
})