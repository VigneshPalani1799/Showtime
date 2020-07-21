import React, {Component} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Row, H3, Col, Icon } from 'native-base';
import { Text } from 'react-native';
import { Card, ActivityIndicator } from 'react-native-paper';
import Axios from 'axios';

class DescriptionComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            recomendations:[],
            error:false,
            activityindicator:true,
        };
        this.myOwnStack = [];
    }

    componentDidMount(){
        const { id } = this.props.route.params;
        this.myOwnStack.push(id);
        console.log(this.myOwnStack);
        Axios.get(`https://api.themoviedb.org/3/movie/${this.myOwnStack[this.myOwnStack.length-1]}/recommendations?api_key=157f003029ac5165035364d81295e48e&language=en-US&page=1`)
        .then((res) => this.setState({recomendations:res.data.results,activityindicator:false}))
        .catch(err => this.setState({error:true}));
    }

    goToTop = () => {
        this.scroll.scrollTo({x:0,y:0,animated:true});
    }

    render(){
        const {source} = this.props.route.params;
        const {overview} = this.props.route.params;
        const {title} = this.props.route.params;

        const RenderTrending_0 = ({recomendations}) => {
            if(recomendations!==null){
                return(
                    recomendations.map((movies,index) => {
                        if(index%3==0)
                        return(
                            <Card style={{margin:2}} 
                                key={index} 
                                onPress={()=>{
                                    this.props.navigation.navigate('Description',{
                                        id:movies.id,
                                        title:movies.original_name?movies.original_name:movies.original_title,
                                        source:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`,
                                        overview:movies.overview
                                    });
                                    this.goToTop();
                                    this.myOwnStack.push(id);
                                    console.log(this.myOwnStack);
                                }
                            }>
                                <Card.Cover source={{uri:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`}}
                                />
                            </Card>
                      );  
                    })
                );
            }
        }

        const RenderTrending_1 = ({recomendations}) => {
            if(recomendations!==null){
                return(
                    recomendations.map((movies,index) => {
                        if(index%3==1)
                        return(
                            <Card style={{margin:2}} 
                                key={index} 
                                onPress={()=>{
                                    this.props.navigation.navigate('Description',{
                                    id:movies.id,
                                    title:movies.original_name?movies.original_name:movies.original_title,
                                    source:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`,
                                    overview:movies.overview
                                    });
                                    this.goToTop();
                                    this.myOwnStack.push(id);
                                    console.log(this.myOwnStack);
                            }}>
                            <Card.Cover source={{uri:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`}}
                            />
                        </Card>
                      );  
                    })
                );
            }
        }

        const RenderTrending_2 = ({recomendations}) => {
            if(recomendations!==null){
                return(
                    recomendations.map((movies,index) => {
                        if(index%3==2)
                        return(
                            <Card 
                            style={{margin:2}} 
                            key={index} 
                            onPress={()=>{
                                const {id} = this.props.route.params;
                                this.props.navigation.navigate('Description',{
                                    id:movies.id,
                                    title:movies.original_name?movies.original_name:movies.original_title,
                                    source:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`,
                                    overview:movies.overview,
                                    });
                                this.goToTop();
                                this.myOwnStack.push(id);
                                console.log(this.myOwnStack);
                            }}>
                            <Card.Cover 
                                source={{uri:`https://image.tmdb.org/t/p/w185/${movies.poster_path}`}}
                            />
                        </Card>
                      );  
                    })
                );
            }
        }

        if(this.state.activityindicator===false)
        return(
            <ScrollView style={{backgroundColor:"#000"}} ref={(c) => {this.scroll = c}}>
                <Row style={{marginBottom:10,marginLeft:10}}>
                    <Col size={0.2}>
                        <Icon 
                            name="arrow-left" 
                            type="FontAwesome" 
                            style={{color:"#fff"}} 
                            onPress={()=>{
                                
                                Axios.get(`https://api.themoviedb.org/3/movie/${this.myOwnStack.pop()}/recommendations?api_key=157f003029ac5165035364d81295e48e&language=en-US&page=1`)
                                .then((res) => this.setState({recomendations:res.data.results,activityindicator:false}))
                                .catch(err => this.setState({error:true}));
                                console.log(this.myOwnStack);
                        }}/>
                    </Col>
                    <Col size={1}>
                        <H3 style={{color:"#fff"}}>Previous</H3>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Cover source={{uri:source}} />
                        </Card>
                    </Col>
                    <Col size={2.0}>
                        <H3 style={{color:"#fff",marginBottom:10,marginLeft:10}}>{title}</H3>
                        <Text style={{color:"#fff",marginLeft:10}}>{overview}</Text>
                    </Col>
                </Row>
                <Row>
                    <H3 style={{color:"#fff",marginTop:10}}>Also watch</H3>
                </Row>
                <Row>
                    <Col>
                        <RenderTrending_0 recomendations = {this.state.recomendations} />
                    </Col>
                    <Col>
                        <RenderTrending_1 recomendations = {this.state.recomendations} />
                    </Col>
                    <Col>
                        <RenderTrending_2 recomendations = {this.state.recomendations} />
                    </Col>
                </Row>
            </ScrollView>
        );
        if(this.state.activityindicator){
            return(
                <ScrollView style={{backgroundColor:"#000"}} ref={(c) => {this.scroll = c}}>
                    <Row style={{marginBottom:10,marginLeft:10}}>
                        <Col size={0.2}>
                            <Icon 
                                name="arrow-left" 
                                type="FontAwesome" 
                                style={{color:"#fff"}}
                                onPress={()=>{
                                    this.myOwnStack.pop();
                                    console.log(this.myOwnStack);
                                    Axios.get(`https://api.themoviedb.org/3/movie/${this.myOwnStack.pop()}/recommendations?api_key=157f003029ac5165035364d81295e48e&language=en-US&page=1`)
                                    .then((res) => this.setState({recomendations:res.data.results,activityindicator:false}))
                                    .catch(err => this.setState({error:true}));
                            }}
                            />
                        </Col>
                        <Col size={1}>
                            <H3 style={{color:"#fff"}}>Previous</H3>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Cover source={{uri:source}} />
                            </Card>
                        </Col>
                        <Col size={2.0}>
                            <H3 style={{color:"#fff",marginBottom:10,marginLeft:10}}>{title}</H3>
                            <Text style={{color:"#fff",marginLeft:10}}>{overview}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <H3 style={{color:"#fff",marginTop:10}}>Also watch</H3>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <ActivityIndicator animating={this.state.activityindicator} color="#E74C3C" size="large" />
                        </Col>
                        <Col></Col>
                    </Row>
                </ScrollView>
            );
        }
        else{
            return(
                <ScrollView style={Styles.container}>
                    <Text>Error something went Wrong</Text>
                </ScrollView>
            );
        }
    }
}

export default DescriptionComponent;