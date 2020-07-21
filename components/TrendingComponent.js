import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Axios from 'axios';
import { Card, ActivityIndicator } from 'react-native-paper';
import { Row, Col, H1, H3 } from 'native-base';

class TrendingComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            trendingDataBase:[],
            trendingTVShows:[],
            trendingMovies:[],
            activityIndicator:true,
            error:false,
        };
    }

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
                                overview:movies.overview
                            })}>
                                <Card.Cover source={{uri:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`}}
                                />
                            </Card>
                      );  
                    })
                );
            }
        }

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
                                overview:movies.overview
                            })}>
                            <Card.Cover source={{uri:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`}}
                            />
                        </Card>
                      );  
                    })
                );
            }
        }

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
                            })}>
                            <Card.Cover source={{uri:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`}}
                            />
                        </Card>
                      );  
                    })
                );
            }
        }

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

        if(this.state.activityIndicator)
            return(
                <ScrollView style={Styles.container}>
                    <ActivityIndicator animating={true} size="large" color="#E74C3C"/>
                </ScrollView>
            );
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