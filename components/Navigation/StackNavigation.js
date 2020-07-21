import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrendingComponent from '../TrendingComponent';
import { View } from 'react-native';
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
                <Col size={0.4} style={{marginLeft:40}}>
                <Icon name="scribd" type="FontAwesome" style={{color:'#E74C3C'}}/>
                </Col>
                <Col size={4.2}>
                    <H1 style={{color:"#E74C3C",marginLeft:10}}>Show Time</H1>
                </Col>
                <Col>
                </Col>
            </Row>
        </View>
    )
}

export default StackNavigation;