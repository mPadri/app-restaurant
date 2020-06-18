import React, { Component } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Text, Card, CardItem, Left, Icon, Right, Button } from 'native-base';
import axios from 'axios';
import {KEY_API} from '../../keyAPI';

class Restaurant extends Component {

    constructor() {
        super();
        this.state = {
            detailRestaurant: [],
            dataReviews: []
        }
    }

    componentDidMount() {
        const title = this.props.route.params.nama_restaurant;
        this.props.navigation.setOptions({ title })
        this.getDetailRestaurant();
        this.getDataReviews();
    }

    getDetailRestaurant = () => {
        let id = this.props.route.params.res_id;
        axios.get(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}`,
            { headers: { 'user-key': KEY_API } })
            .then((res) => {
                this.setState({
                    detailRestaurant: res.data
                })
            })
    }

    getDataReviews = () => {
        let id = this.props.route.params.res_id;
        axios.get(`https://developers.zomato.com/api/v2.1/reviews?res_id=${id}&count=5`,
            { headers: { 'user-key': KEY_API } })
            .then((res) => {
                // console.log('isi review: ', res.data);
                this.setState({
                    dataReviews: res.data.user_reviews
                })
                // console.log('isi review: ', this.state.dataReviews);
            })
    }
    render() {
        // console.log('isi param: ', this.props.route.params.res_id)
        // karena data berada didalam objek lagi
        let alamat = { ...this.state.detailRestaurant.location };
        let rating = { ...this.state.detailRestaurant.user_rating };
        console.log('isi state: ', this.state.detailRestaurant.url);
        let url_web = {
            url: this.state.detailRestaurant.url
        }

        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Card>
                        <CardItem cardBody>
                            <Image
                                style={{ height: 240, flex: 1 }}
                                source={{ uri: this.state.detailRestaurant.featured_image }} />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text style={{ fontSize: 14 }}>{alamat.address}</Text>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Icon name="star" style={{ color: '#f7ce31' }} />
                                <Text>{rating.aggregate_rating}</Text>
                            </Left>
                            <Right>
                                <Button iconLeft rounded small info onPress={()=>this.props.navigation.navigate('WebviewResto', url_web)} >
                                    <Icon name="globe" />
                                    <Text style={{marginLeft:0}}>website</Text>
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Left>
                                <Text style={{ fontWeight: 'bold' }}>Jenis Masakan</Text>
                            </Left>
                            <Text style={{ color: "grey" }}>{this.state.detailRestaurant.cuisines}</Text>
                        </CardItem>
                    </Card>
                    <Text style={{ fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>Reviews</Text>
                    <ScrollView horizontal>
                        {
                            this.state.dataReviews.map((data,key) => {
                                // console.log('isi data: ', data.review.rating_text)
                                let komentar = ""
                                data.review.rating_text === "" ? komentar = "No Comment" : komentar = data.review.rating_text
                                let namaUser = { ...data.review.user }
                                let photo = { ...data.review.user }
                                return (
                                    <Card key={key} style={{ width: 200 }}>
                                        <CardItem style={{ alignSelf: 'center' }}>
                                            <Image style={{ width: 64, height: 64, borderRadius: 64 / 2 }} source={{ uri: photo.profile_image }} />
                                        </CardItem>
                                        <CardItem style={{ alignSelf: 'center' }}>
                                            <Text style={{ fontSize: 20, color: 'grey', fontStyle: 'italic' }}>" {komentar} "</Text>
                                        </CardItem>
                                        <CardItem style={{ alignSelf: 'center' }}>
                                            <View>
                                                <View style={{ flexDirection: "row", marginVertical: 5, alignSelf: 'center' }}>
                                                    <Icon name="star" style={{ color: '#f7ce31' }} />
                                                    <Text style={{ alignSelf: 'center', marginLeft: 10 }}>{data.review.rating}</Text>
                                                </View>
                                                <View>
                                                    <Text style={{ marginBottom: 10, textAlign: 'center', fontSize: 12 }}>{namaUser.name}</Text>
                                                </View>
                                            </View>
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
}

export default Restaurant;