import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Axios from 'axios';
import { Card, ActivityIndicator, Badge } from 'react-native-paper';
import { Row, Col, H1, H3, Icon } from 'native-base';


class UpcomingComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            upComing:[],
            activityIndicator:true,
        };
    }

    componentDidMount(){
        Axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=157f003029ac5165035364d81295e48e&page=1`)
        .then((res) => this.setState({upComing:res.data.results,activityIndicator:false}))
        .catch(err => console.log(err));
    }
    render(){
        
        const RenderTrending_0 = ({trendingDataBase}) => {
            if(trendingDataBase!==null){
                return(
                    trendingDataBase.map((movies,index) => {
                        if(index%3==0)
                        return(
                            <Card style={{margin:2}} key={index} onPress={()=>this.props.navigation.navigate('Description',{
                                id:movies.id,
                                title:movies.original_name?movies.original_name:movies.original_title,
                                source:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`,
                                overview:movies.overview,
                                media_type:movies.media_type,
                            })}>
                                <View style={{backgroundColor:"#000"}}>
                                    <Badge>
                                        {movies.vote_average?movies.vote_average:"N/A"}
                                        <Icon name="star" type="FontAwesome" style={{fontSize:10,color:"#fff"}} />
                                    </Badge>
                                    
                                </View>
                                <Card.Cover source={{uri:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`}}
                                />
                            </Card>
                      );  
                    })
                );
            }
        }

        //This renders the second column elements
        const RenderTrending_1 = ({trendingDataBase}) => {
            if(trendingDataBase!==null){
                return(
                    trendingDataBase.map((movies,index) => {
                        if(index%3==1)
                        return(
                            <Card style={{margin:2}} key={index} onPress={()=>this.props.navigation.navigate('Description',{
                                id:movies.id,
                                title:movies.original_name?movies.original_name:movies.original_title,
                                source:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`,
                                overview:movies.overview,
                                media_type:movies.media_type,
                            })}>
                                <View style={{backgroundColor:"#000"}}>
                                    <Badge>
                                        {movies.vote_average?movies.vote_average:"N/A"}
                                        <Icon name="star" type="FontAwesome" style={{fontSize:10,color:"#fff"}} />
                                    </Badge>
                                </View>
                            <Card.Cover source={{uri:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`}}
                            />
                        </Card>
                      );  
                    })
                );
            }
        }

        //This renders the third column elements
        const RenderTrending_2 = ({trendingDataBase}) => {
            if(trendingDataBase!==null){
                return(
                    trendingDataBase.map((movies,index) => {
                        if(index%3==2)
                        return(
                            <Card style={{margin:2}} key={index} onPress={()=>this.props.navigation.navigate('Description',{
                                id:movies.id,
                                title:movies.original_name?movies.original_name:movies.original_title,
                                source:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`,
                                overview:movies.overview,
                                media_type:movies.media_type,
                            })}>
                                <View style={{backgroundColor:"#000"}}>
                                    <Badge>
                                        {movies.vote_average?movies.vote_average:"N/A"}
                                        <Icon name="star" type="FontAwesome" style={{fontSize:10,color:"#fff"}} />
                                    </Badge>
                                </View>
                            <Card.Cover source={{uri:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`}}
                            />
                        </Card>
                      );  
                    })
                );
            }
        }

        if(this.state.upComing.length!==0){
            return(
                <ScrollView style={{backgroundColor:"#000"}}>
                    <Row>
                        <H3 style={{color:"#fff",marginBottom:10}}>Upcoming Movies</H3>
                    </Row>
                    <Row>
                        <Col>
                            <RenderTrending_0 trendingDataBase = {this.state.upComing} />
                        </Col>
                        <Col>
                            <RenderTrending_1 trendingDataBase = {this.state.upComing} />
                        </Col>
                        <Col>
                            <RenderTrending_2 trendingDataBase = {this.state.upComing} />
                        </Col>
                    </Row>
                </ScrollView>
            );
        }

        else {
            return(
                <ScrollView style={{backgroundColor:"#000"}}>
                    <ActivityIndicator animating={this.state.activityIndicator} color="#E74C3C" size="large"/>
                </ScrollView>
            )
        }
    }
}

export default UpcomingComponent;