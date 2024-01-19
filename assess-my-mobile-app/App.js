import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';

const assessMyAppUrl = "http://localhost:3000/login";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{width:'100%',height:'100%'}}>
      <WebView 
        source={{url:assessMyAppUrl}} 
        onLoad={console.log("app loaded")}> 
      </WebView>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
