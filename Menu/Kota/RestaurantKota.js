import React, {Component, useState, useEffect } from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Card, CardItem, Text, Body } from 'native-base';
import Axios from 'axios';

import {KEY_API} from '../../keyAPI';

const RestaurantKota = ({ navigation, nama, id_kota }) => {
    const [dataRestaurant, setDataRestaurant] = useState([]);

    // console.log('isi navigation: ',navigation);
    useEffect(() => {
        getDataRestaurant();
    }, [])

    const getDataRestaurant = () => {
        Axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${id_kota}&entity_type=city&count=8`,
            { headers: { 'user-key': KEY_API } })
            .then((res) => {
                setDataRestaurant(res.data.restaurants)
            })
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                dataRestaurant.map((data, key) => {
                    let image = "";

                    if (data.restaurant.thumb === "") {
                        image = "https://topekacivictheatre.com/wp-content/uploads/2019/01/no-image.jpg";
                    } else {
                        image = data.restaurant.thumb;
                    }
                    const dataResto = {
                        nama_restaurant: data.restaurant.name,
                        res_id: data.restaurant.R.res_id
                    }
                    return (
                        <TouchableOpacity key={key} onPress={()=>navigation.navigate('Restaurant',dataResto)}>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Text>{data.restaurant.name}</Text>
                                        <Text note >{nama}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{ height: 250, flex: 1 }} source={{ uri: image }} />
                                </CardItem>
                            </Card>
                        </TouchableOpacity>

                    )
                })
            }

        </ScrollView>
    );
}

export default RestaurantKota;