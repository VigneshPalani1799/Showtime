import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TrendingComponent from '../TrendingComponent';
import { View } from 'react-native';
import { H1, Col, Row, Icon } from 'native-base';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DescriptionComponent from '../DescriptionComponent';
import UpcomingComponent from '../UpcomingComponent';
import SearchComponent from '../SearchComponent';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
    );
}

function StackNavigationTrending(){
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

function StackNavigationUpcoming(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Upcoming"
                component={UpcomingComponent}
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

function StackNavigationSearch(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                component={SearchComponent} 
                name="Search" 
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

function TabNavigation(){
    return(
        <Tab.Navigator tabBarOptions={{
            style:{
            backgroundColor:"#000"
            },
            labelStyle:{
                fontSize:14,
                color:"#E74C3C"
            }
        }}>
            <Tab.Screen
                name="Search"
                component={StackNavigationSearch}
                options={{
                    tabBarIcon:()=>(
                        <Icon name="search" type="FontAwesome" style={{color:"#E74C3C",fontSize:22}} />
                    )
                }}
            />
            <Tab.Screen 
                name="Trending" 
                component = {StackNavigationTrending}
                options={{
                    tabBarIcon:()=>(
                     <Icon name="fire" type="FontAwesome" style={{color:"#E74C3C",fontSize:22}}/>   
                    )
                }}              
            />
            <Tab.Screen
                name="Upcoming" 
                component = {StackNavigationUpcoming}
                options={{
                    tabBarIcon:()=>(
                     <Icon name="calendar" type="FontAwesome" style={{color:"#E74C3C",fontSize:22}}/>   
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default TabNavigation;