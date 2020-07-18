import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Header, Body, Title, Icon, Input, Item, Right, Left } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

class HeaderComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            loading: true,
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
        this.setState({ loading: false });
    }

    render(){
        if(this.state.loading)
            return(
                <View></View>
            );  
        else
            return(
                <ScrollView>
                    <Header 
                        androidStatusBarColor="#121212" 
                        style={{backgroundColor:"#1F1B24"}}
                    >
                        <Body>
                            <Title style={{color:"#FA054F",fontSize:30}}>Show Time</Title>
                        </Body>
                    </Header>
                </ScrollView>
            );
    }
}

export default HeaderComponent;