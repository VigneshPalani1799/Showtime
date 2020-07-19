import React from 'react';
import {createStackNavigator, Header} from '@react-navigation/stack';
import TrendingComponent from '../TrendingComponent';
import { View, Text } from 'react-native';
import { H1, Col, Row, Icon } from 'native-base';
import DescriptionComponent from '../DescriptionComponent';

const Stack = createStackNavigator();
function StackNavigation(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={TrendingComponent}
                options={{
                    header:props => <CustomHeader/>
                }}
            />
            <Stack.Screen
                name="Description"
                component={DescriptionComponent}
                options={{
                    header:props => <CustomHeader/>
                }}
            />
        </Stack.Navigator>
    );
}

const CustomHeader = props => {
    return(
        <View style={{paddingTop:30,paddingBottom:40,backgroundColor:"#000"}}>
            <Row>
                <Col size={1.3}>
                    <H1 style={{color:"#E74C3C"}}>Show Time</H1>
                </Col>
                <Col>
                    <Icon name="film" type="FontAwesome" style={{color:'#E74C3C'}}/>
                </Col>
                <Col></Col>
            </Row>
        </View>
    )
}

export default StackNavigation;