import React , {Component} from 'react';
import { ScrollView, Text } from 'react-native';
import TrendingComponent from './TrendingComponent';

class MainComponent extends Component{
    render(){
        return(
            <ScrollView>
                <TrendingComponent/>
            </ScrollView>
        );
    }
}

export default MainComponent;