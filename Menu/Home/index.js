/**
 * API Zomato = 'ea82213a5d955042407feeae764e5154'
 */

import React, { Component } from 'react';
import { StatusBar, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Text, Content, Button, Card, CardItem, Left, Icon, Right } from 'native-base';
import axios from 'axios';
import Shimmer from 'react-native-shimmer';

import {KEY_API} from '../../keyAPI';


class Home extends Component {

    constructor() {
        super();
        this.state = {
            image: [
                "https://images.pexels.com/photos/1161468/pexels-photo-1161468.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                "https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            ],
            dataCategory: [],
            dataRestaurant: []
        }
    }

    getDataCategory = () => {
        axios.get(`https://developers.zomato.com/api/v2.1/categories`,
            { headers: { 'user-key': KEY_API } })
            .then((res) => {
                this.setState({
                    dataCategory: res.data.categories
                })
            })
    }

    getDataRestaurant = () => {
        axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&count=10&sort=rating`,
            { headers: { 'user-key': KEY_API } })
            .then((res) => {
                this.setState({
                    dataRestaurant: res.data.restaurants
                })
            })
    }

    componentDidMount() {
        this.getDataCategory();
        this.getDataRestaurant();
    }
    render() {
        // console.log('isi props',this.props)
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar backgroundColor='#bf3939' />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        {/* image slider */}
                        <SliderBox images={this.state.image}
                            sliderBoxHeight={150}
                            autoplay
                            circleLoop />
                    </View>
                    {/* component kategori */}
                    <Text style={{ marginTop: 20, marginLeft: 10 }}>Pilih Kategori</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ marginTop: 20 }}>
                        {
                            this.state.dataCategory.map((data, key) => {
                                const dataKategori = {
                                    nama_kategori: data.categories.name
                                }
                                return (
                                    <Button small
                                        rounded
                                        bordered
                                        key={key}
                                        style={{ marginHorizontal: 10 }}
                                        onPress={() => this.props.navigation.navigate('DetailCategory', dataKategori)}>
                                        <Text>{data.categories.name}</Text>
                                    </Button>
                                )
                            })
                        }
                    </ScrollView>
                    {/* resto terbaik */}
                    <Text style={{ marginTop: 20, marginLeft: 10 }}>Top Rated Restaurants</Text>
                    {
                        this.state.dataRestaurant.map((data, key) => {
                            let image = "";

                            if (data.restaurant.thumb === "") {
                                image = "https://topekacivictheatre.com/wp-content/uploads/2019/01/no-image.jpg";
                            } else {
                                image = data.restaurant.thumb;
                            }

                            return (
                                <TouchableOpacity key={key}
                                    onPress={() => this.props.navigation.navigate('Restaurant', { nama_restaurant: data.restaurant.name, res_id: data.restaurant.R.res_id })}>
                                    <Card>
                                        <CardItem>
                                            <Text>{data.restaurant.name}</Text>
                                        </CardItem>
                                        <CardItem cardBody>
                                            <Image style={{ height: 200, flex: 1 }}
                                                source={{ uri: image }} />
                                        </CardItem>
                                        <CardItem>
                                            <Left>
                                                <Icon name="star" style={{ color: '#f7ce31' }} />
                                                <Text>{data.restaurant.user_rating.aggregate_rating}</Text>
                                            </Left>
                                            <Right>
                                                <Text>{data.restaurant.user_rating.rating_text}</Text>
                                            </Right>
                                        </CardItem>
                                    </Card>
                                </TouchableOpacity>
                            )
                        })
                    }

                </ScrollView>
            </View>
        );
    }
}

export default Home;