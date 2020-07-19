import React , {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import StackNavigation from './Navigation/StackNavigation';

class MainComponent extends Component{
    render(){
        return(
            <NavigationContainer>
                <StackNavigation/>
            </NavigationContainer>
        );
    }
}

export default MainComponent;