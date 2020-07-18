import React, { Component } from 'react';
import { ScrollView, FlatList, Text, View } from 'react-native';
import Axios from 'axios';
import HeaderComponent from './HeaderComponent';
import { Card } from 'react-native-elements';

class TrendingComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            trendingDataBase:[],
        }
    }

    componentDidMount(){
        Axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=157f003029ac5165035364d81295e48e')
        .then((res)=>{
            console.log('Before',this.state.trendingDataBase);
            this.setState({trendingDataBase:res.data.results});
            console.log('After',this.state.trendingDataBase);
        })
        .catch((err)=>console.log(err));
    }

    render(){
        const RenderTrending = ({trendingDataBase}) => {
            if(trendingDataBase!==null){
                return(
                    trendingDataBase.map((movies,index) => {
                      return(
                        <View style={{marginBottom:5}}>  
                            <Card 
                            title={movies.original_name?movies.original_name:movies.title} 
                            titleStyle={{
                                fontSize:18
                            }}
                            >
                                <Text>{movies.overview}</Text>
                            </Card>
                        </View>
                      );  
                    })
                );
            }
        }
        return(
            <ScrollView>
                <HeaderComponent />
                <RenderTrending trendingDataBase = {this.state.trendingDataBase} />
            </ScrollView>
        );
    }
}

export default TrendingComponent;