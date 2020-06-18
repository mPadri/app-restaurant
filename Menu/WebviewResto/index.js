import React from 'react';
import WebView from 'react-native-webview';

const WebviewResto = ({ route }) => {
    // console.log('isi route: ', route.params.url);
    const url = route.params.url;
    return (
            <WebView
                source={{ uri: url }}
            />
    );
}

export default WebviewResto;