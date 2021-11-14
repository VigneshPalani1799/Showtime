import React , {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigation from './Navigation/BottomNavigation';

class MainComponent extends Component{
    render(){
        return(
            <NavigationContainer>
                <TabNavigation/>
            </NavigationContainer>
        );
    }
}

export default MainComponent;