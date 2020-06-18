import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text, Button, Card, CardItem, Left, Right, Icon } from 'native-base';
import axios from 'axios';

import {KEY_API} from '../../keyAPI';

const Masakan = () => {
    const [jenisMasakan, setJenisMasakan] = useState([]);
    const [dataRestaurant, setDataRestaurant] = useState([]);

    useEffect(() => {
        getJenisMasakan();
        getDataRestaurant();
    }, []);

    const getJenisMasakan = () => {
        axios.get(`https://developers.zomato.com/api/v2.1/cuisines?city_id=74`,
            { headers: { 'user-key': KEY_API } })
            .then((res) => {
                setJenisMasakan(res.data.cuisines)
            })
    }

    const getDataRestaurant = () => {
        axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&count=10`,
            { headers: { 'user-key': KEY_API } })
            .then((res) => {
                setDataRestaurant(res.data.restaurants)
            })
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Text style={{ marginTop: 20, marginLeft: 10 }}>Jenis Masakan</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                    {
                        jenisMasakan.map((data, key) => {
                            return (
                                <View key={key}>
                                    <Button style={{ margin: 10 }}>
                                        <Text style={{ color: "white" }}>{data.cuisine.cuisine_name}</Text>
                                    </Button>
                                </View>
                            )
                        })
                    }

                </ScrollView>
                <Text style={{ marginTop: 20, marginLeft: 10 }}>Restaurant</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20, marginLeft: 10 }}>
                    {
                        dataRestaurant.map((data, key) => {
                            let image = "";

                            if (data.restaurant.thumb === "") {
                                image = "https://topekacivictheatre.com/wp-content/uploads/2019/01/no-image.jpg";
                            } else {
                                image = data.restaurant.thumb;
                            }
                            return (
                                <Card key={key} style={{ width: 220 }}>
                                    <CardItem style={{marginBottom:10}}>
                                        <Left>
                                            <Text style={{fontSize:11,fontWeight:'bold',width:'100%',marginLeft:0, paddingLeft:0}}>{data.restaurant.name}</Text>
                                        </Left>    
                                    </CardItem>
                                    <CardItem cardBody style={{marginTop:5}}>
                                        <Image
                                            style={{ height: 200, flex: 1 }}
                                            source={{ uri: image }} />
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text style={{fontSize:14}}>Location: {data.restaurant.location.locality}</Text>
                                        </Left>
                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text style={{fontSize:11}}>{data.restaurant.timings}</Text>
                                        </Left>
                                    </CardItem>
                                </Card>
                            )
                        })
                    }

                </ScrollView>
            </ScrollView>
        </View>
    );
}

export default Masakan;