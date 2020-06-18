import React, { Component } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text, Card, CardItem, Body, Button } from 'native-base';
import axios from 'axios';

import {KEY_API} from '../../keyAPI';

class Categori extends Component {

    constructor() {
        super();
        this.state = {
            dataCategory: [],
            dataCollection: [],
        }
    }

    componentDidMount() {
        // this.getDataCategory();
        this.getDataCollection();
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

    getDataCollection = () => {
        axios.get(`https://developers.zomato.com/api/v2.1/collections?city_id=74`,
            { headers: { 'user-key': KEY_API } })
            .then((res) => {
                this.setState({
                    dataCollection: res.data.collections
                })
            })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ flex: 2 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            this.state.dataCollection.map((data, key) => {
                                return (
                                    <Card key={key}>
                                        <CardItem cardBody>
                                            <Image style={{ height: 200, flex: 1 }} source={{ uri: data.collection.image_url }} />
                                        </CardItem>
                                        <CardItem>
                                            <Body>
                                                <Text>{data.collection.title}</Text>
                                                <Text note>{data.collection.description}</Text>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                )
                            })
                        }

                    </ScrollView>
                </View>
                {/* <View>
                    <Text style={{ margin: 10 }}>Category</Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            this.state.dataCategory.map((data, key) => {
                                return (
                                    <Button key={key} danger style={{ margin: 10 }}>
                                        <Text style={{ color: 'white' }}>{data.categories.name}</Text>
                                    </Button>
                                );
                            })
                        }

                    </ScrollView>
                </View> */}
            </View>
        );
    }

}

export default Categori;