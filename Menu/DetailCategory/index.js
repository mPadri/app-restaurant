import React, { Component } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text, Card, CardItem, Body, Button } from 'native-base';
import axios from 'axios';

import {KEY_API} from '../../keyAPI';

class DetailCategory extends Component {

    constructor(){
        super()
        this.state={
            dataRestaurant: []
        }
    }
  
    componentDidMount() {
        const title = this.props.route.params.nama_kategori;
        this.props.navigation.setOptions({ title })
        this.getDetailDataCategory()
    }

    getDetailDataCategory = () => {
        const namaKategori = this.props.route.params;
        // console.log('isi props', namaKategori.nama_kategori)
        axios.get(`https://developers.zomato.com/api/v2.1/search?entity_id=74&entity_type=city&count=8&category=${namaKategori.nama_kategori}`,
            { headers: { 'user-key': KEY_API } })
            .then((res) => {
                this.setState({ dataRestaurant: res.data.restaurants })
            })
    }

    render() {
        // console.log('isi props', this.props.route.params)
        // console.log('isi state: ', this.state.dataRestaurant);

        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        this.state.dataRestaurant.map((data, key) => {
                            const alamat = {...data.restaurant.location}
                            let image = "";

                            if (data.restaurant.featured_image === "") {
                                image = "https://topekacivictheatre.com/wp-content/uploads/2019/01/no-image.jpg";
                            } else {
                                image = data.restaurant.featured_image;
                            }
                            return (
                                <Card key={key}>
                                    <CardItem cardBody>
                                        <Image style={{ height: 200, flex: 1 }} source={{ uri: image }} />
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Text>{data.restaurant.name}</Text>
                                            <Text note>{alamat.address}</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            )
                        })
                    }

                </ScrollView>
            </View>
        );
    }

}

export default DetailCategory;