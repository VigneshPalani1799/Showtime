import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Axios from 'axios';
import { Card, ActivityIndicator, Badge } from 'react-native-paper';
import { Row, Col, H1, H3, Icon } from 'native-base';

class TrendingComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            trendingDataBase:[], //Get trending tv shows and movies
            trendingTVShows:[], //Get trending tv shows
            trendingMovies:[], //Get trending Movies
            activityIndicator:true, //To show loading animation
            error:false, //Is Error in fetching data
        };
    }

    //get top movies shows and both initially
    componentDidMount(){
        Axios.get('https://api.themoviedb.org/3/trending/all/day?api_key=157f003029ac5165035364d81295e48e&page=1')
        .then((res)=>{
            this.setState({trendingDataBase:res.data.results});
        })
        .catch((err)=>console.log(err));

        Axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=157f003029ac5165035364d81295e48e&page=1')
        .then((res)=>{
            this.setState({trendingMovies:res.data.results});
        })
        .catch((err)=>console.log(err));

        Axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=157f003029ac5165035364d81295e48e&page=1')
        .then((res)=>{
            this.setState({trendingTVShows:res.data.results,activityIndicator:false});
        })
        .catch((err)=>{
            console.log(err);
            this.setState({activityIndicator:false,error:true});
        });
    }

    render(){

        //This renders the first column elements
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

        //If the data is fetched from the api then render all the trending...
        if(this.state.trendingDataBase.length!==0 && this.state.trendingMovies.length!==0 && this.state.trendingTVShows.length!==0)
        return(
            <ScrollView style={{backgroundColor:"#000000"}}>
                <Row style={{marginTop:20}}>
                    <H1 style={{color:"#fff"}}>Weekly Update</H1>
                </Row>
                <Row style={{marginBottom:10}}>
                    <H3 style={{color:"#fff"}}>Top Movies, and TV Shows</H3>
                </Row>
                <Row>
                    <Col>
                        <RenderTrending_0 trendingDataBase = {this.state.trendingDataBase} />
                    </Col>
                    <Col>
                        <RenderTrending_1 trendingDataBase = {this.state.trendingDataBase} />
                    </Col>
                    <Col>
                        <RenderTrending_2 trendingDataBase = {this.state.trendingDataBase} />
                    </Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <H3 style={{color:"#fff"}}>Top Movies this Week</H3>
                </Row>
                <Row>
                    <Col>
                        <RenderTrending_0 trendingDataBase = {this.state.trendingMovies} />
                    </Col>
                    <Col>
                        <RenderTrending_1 trendingDataBase = {this.state.trendingMovies} />
                    </Col>
                    <Col>
                        <RenderTrending_2 trendingDataBase = {this.state.trendingMovies} />
                    </Col>
                </Row>
                <Row style={{marginTop:30}}>
                    <H3 style={{color:"#fff"}}>Top TV Shows this Week</H3>
                </Row>
                <Row>
                    <Col>
                        <RenderTrending_0 trendingDataBase = {this.state.trendingTVShows} />
                    </Col>
                    <Col>
                        <RenderTrending_1 trendingDataBase = {this.state.trendingTVShows} />
                    </Col>
                    <Col>
                        <RenderTrending_2 trendingDataBase = {this.state.trendingTVShows} />
                    </Col>
                </Row>
            </ScrollView>
        );

        //If still not fetched and no error faced then show loading animation..
        if(this.state.activityIndicator)
            return(
                <ScrollView style={Styles.container}>
                    <ActivityIndicator animating={true} size="large" color="#E74C3C"/>
                </ScrollView>
            );
        
        //If error in fetching data then display error.
        else{
            return(
                <ScrollView style={Styles.container}>
                    <Text>Error something went Wrong</Text>
                </ScrollView>
            );
        }
    }
}

const Styles = StyleSheet.create({
    container:{
        backgroundColor:"#000000",
    }
})

export default TrendingComponent;