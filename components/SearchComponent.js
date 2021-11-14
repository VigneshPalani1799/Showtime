import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Axios from 'axios';
import { Card, ActivityIndicator, Badge, Searchbar } from 'react-native-paper';
import { Row, Col, H1, H3, Icon } from 'native-base';

class SearchComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            query:'',
            activityIndicator:false,
            searchResult:[],
            error:true,
            totalPage:0,
        }
    }

    updateSearch(){
        this.setState({activityIndicator:true,error:false});
        Axios.get(`https://api.themoviedb.org/3/search/multi?api_key=157f003029ac5165035364d81295e48e&language=en-US&query=${this.state.query}`)
        .then((res)=>this.setState({searchResult:res.data.results,activityIndicator:false,totalPage:res.data.total_pages}))
        .catch(err => this.setState({activityIndicator:false,error:true}));
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
        if(this.state.searchResult.length!==0 && !this.state.activityIndicator)
        return(
            <ScrollView style={{backgroundColor:"#000"}}>
                <Searchbar 
                    placeholder="Search"
                    placeholderTextColor="#E74C3C"
                    inputStyle={{
                        color:"#000",
                    }}
                    value = {this.state.query}
                    onChangeText = {query=>{
                        this.setState({query:query})
                        this.updateSearch();
                    }}
                    iconColor="#E74C3C"
                />
                <Row>
                    <Col>
                        <RenderTrending_0 trendingDataBase = {this.state.searchResult} />
                    </Col>
                    <Col>
                        <RenderTrending_1 trendingDataBase = {this.state.searchResult} />
                    </Col>
                    <Col>
                        <RenderTrending_2 trendingDataBase = {this.state.searchResult} />
                    </Col>
                </Row>
                <Row></Row>
                <Row>
                    <Col>
                        <Icon name="chevron-left" type="FontAwesome" style={{color:"#fff"}}/>
                    </Col>
                    <Col></Col>
                    <Col>
                    </Col>
                </Row>
            </ScrollView>
        );
        else if(this.state.activityIndicator && !this.state.error){
            return(
                <ScrollView style={{backgroundColor:"#000"}}>
                    <Searchbar 
                    placeholder="Search"
                    placeholderTextColor="#E74C3C"
                    inputStyle={{
                        color:"#000",
                    }}
                    value = {this.state.query}
                    onChangeText = {query=>{
                        this.setState({query:query})
                        this.updateSearch();
                    }}
                    iconColor="#E74C3C"
                />
                    <ActivityIndicator animating={this.state.activityIndicator} color="#E74C3C" size="large"/>
                </ScrollView>
            );
        }
        else if(this.state.error){
            return(
                <ScrollView style={{backgroundColor:"#000"}}>
                    <Searchbar 
                    placeholder="Search"
                    placeholderTextColor="#E74C3C"
                    inputStyle={{
                        color:"#000",
                    }}
                    value = {this.state.query}
                    onChangeText = {query=>{
                        this.setState({query:query})
                        this.updateSearch();
                    }}
                    iconColor="#E74C3C"
                />
                <Row>
                    <Col>
                        <H3>No movies found</H3>
                    </Col>
                </Row>
                </ScrollView>
            );
        }
        else{
            return(
                <ScrollView style={{backgroundColor:"#000"}}>
                    <Searchbar 
                        placeholder="Search"
                        placeholderTextColor="#E74C3C"
                        inputStyle={{
                            color:"#000",
                        }}
                        value = {this.state.query}
                        onChangeText = {query=>{
                            this.setState({query:query})
                            this.updateSearch();
                        }}
                        iconColor="#E74C3C"
                    />
                </ScrollView>  
            );
        }
    }
}

export default SearchComponent;