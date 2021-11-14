import React, { Component } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Row, H3, Col, Icon, Button } from 'native-base';
import { Text, View, Linking } from 'react-native';
import { Card, ActivityIndicator, Badge } from 'react-native-paper';

import Axios from 'axios';

class DescriptionComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recomendations: [], //Get recommended movies for the movie clicked
            videos: [], //Get related movie clips for the movie clicked
            error: false, //Is Error in fetching data
            activityindicator: true, //Show loading animation while fetching
            videoLoading:false,
            media_type:'hello',
        };
        this.goToTop = this.goToTop.bind(this); //Extending the scope of the function
        this.updateRecommendations = this.updateRecommendations.bind(this); //Extending the scope of the function
        this.onWatchClipping = this.onWatchClipping.bind(this);
    }

    //As soon as the component renders get all the recommended movies
    componentDidMount() {
        const { id } = this.props.route.params;
        const { media_type } = this.props.route.params;
        Axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=157f003029ac5165035364d81295e48e&language=en-US&page=1`)
            .then(
                (res) => {this.setState({recomendations:res.data.results, activityindicator: false})}
            )
            .catch(err => {
                console.log(err);
                this.setState({ activityindicator: false });
            });
    }

    /*On each click on the new movie scroll to top of the screen 
    as we are moving in the same screen with different id*/
    goToTop() {
        this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }

    //Update recommendations of each movie clicked within the same description screen
    updateRecommendations(){
        const { id } = this.props.route.params;
        const { media_type } = this.props.route.params;
        this.setState({activityindicator:true});
        Axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/recommendations?api_key=157f003029ac5165035364d81295e48e`)
            .then(
                (res) => {
                    this.setState({recomendations:res.data.results, activityindicator: false});
                    console.log('Recommendations updated');
                }
            )
            .catch(err => this.setState({ activityindicator: false }));
    }
    
    onWatchClipping(){
        const { id } = this.props.route.params;
        const { media_type } = this.props.route.params;

        this.setState({videoLoading:true,videos:[]});

        Axios
        .get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=157f003029ac5165035364d81295e48e`)
        .then((res) => {
                this.setState({ videos: res.data.results,videoLoading:false});
                console.log("Videos are ",this.state.videos);
        })
        .catch((err) => this.setState({videoLoading:false}));
    }

    render() {
        const { source } = this.props.route.params; //Source for the image to display in the card
        const { overview } = this.props.route.params; //Description of the movie 
        const { title } = this.props.route.params; //Title of the movie

        const RenderVideos = ({ videos }) => {
            if(videos !== null)
                return (
                    videos.map((video, index) => {
                        return(
                            <Row style={{marginTop:10,marginBottom:10}} size={2} key={index}>
                                <Col>
                                    <Card style={{ margin: 3 }}>
                                        <Card.Cover source={{ uri: source }} />
                                    </Card>
                                </Col>
                                <Col>
                                    <H3 style={{color: "#fff", backgroundColor: "#000" }}>{video.name}</H3>
                                    <Text style={{color:"#fff"}}>{video.site} {video.size}</Text>
                                    <Row style={{padding:4}}>
                                        <Button 
                                            full={true} 
                                            iconLeft={true}
                                            danger
                                            onPress={() => {Linking.openURL(video.site==='Youtube'?`https://www.youtube.com/watch?v=${video.key}`:`https://vimeo.com/${video.key}`)}}
                                        >
                                            <Icon name="play-circle" type="FontAwesome" style={{paddingRight:2}}/>
                                            <Text style={{color:"#fff",fontSize:22,paddingRight:8}}>Play</Text>
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>
                        );
                    })
                );
            else{
                return(
                    <ScrollView>
                        <H3>No Videos found</H3>
                    </ScrollView>
                );
            }
        }
        //Render the first column movies
        const RenderTrending_0 = ({ recomendations }) => {
            if (recomendations !== null) {
                return (
                    recomendations.map((movies, index) => {
                        if (index % 3 == 0)
                            return (
                                <View>
                                <Card style={{ margin: 2 }}
                                    key={index}
                                    onPress={() => {
                                        this.props.navigation.navigate('Description', {
                                            id: movies.id,
                                            title: movies.original_name ? movies.original_name : movies.original_title,
                                            source: `https://image.tmdb.org/t/p/w185/${movies.poster_path}`,
                                            overview: movies.overview,
                                        });
                                        this.updateRecommendations();
                                        this.setState({ videos: [] });
                                        this.goToTop();
                                    }
                                    }>
                                    <View style={{ backgroundColor: "#273746" }}>
                                        <Badge>
                                            {movies.vote_average ? movies.vote_average : "N/A"}
                                            <Icon name="star" type="FontAwesome" style={{ fontSize: 10, color: "#fff" }} />
                                        </Badge>
                                    </View>
                                    <Card.Cover source={{ uri: `https://image.tmdb.org/t/p/w185/${movies.poster_path}` }}
                                    />
                                </Card>
                                </View>
                            );
                    })
                );
            }
        }

        //Render the second column of the movies
        const RenderTrending_1 = ({ recomendations }) => {
            if (recomendations !== null) {
                return (
                    recomendations.map((movies, index) => {
                        if (index % 3 == 1)
                            return (
                                <View>
                                <Card style={{ margin: 2 }}
                                    key={index}
                                    onPress={() => {
                                        this.props.navigation.navigate('Description', {
                                            id: movies.id,
                                            title: movies.original_name ? movies.original_name : movies.original_title,
                                            source: `https://image.tmdb.org/t/p/w185/${movies.poster_path}`,
                                            overview: movies.overview,
                                        });
                                        this.updateRecommendations();
                                        this.setState({ videos: [] });
                                        this.goToTop();
                                    }}>
                                    <View style={{ backgroundColor: "#273746" }}>
                                        <Badge>
                                            {movies.vote_average ? movies.vote_average : "N/A"}
                                            <Icon name="star" type="FontAwesome" style={{ fontSize: 10, color: "#fff" }} />
                                        </Badge>
                                    </View>
                                    <Card.Cover source={{ uri: `https://image.tmdb.org/t/p/w185/${movies.poster_path}` }}
                                    />
                                </Card>
                                </View>
                            );
                    })
                );
            }
        }

        //Render the third column of the movies in description
        const RenderTrending_2 = ({ recomendations }) => {
            if (recomendations !== null) {
                return (
                    recomendations.map((movies, index) => {
                        if (index % 3 == 2)
                            return (
                                <View>
                                    <Card
                                        style={{ margin: 2 }}
                                        key={index}
                                        onPress={() => {
                                            const { id } = this.props.route.params;
                                            this.props.navigation.navigate('Description', {
                                                id: movies.id,
                                                title: movies.original_name ? movies.original_name : movies.original_title,
                                                source: `https://image.tmdb.org/t/p/w185/${movies.poster_path}`,
                                                overview: movies.overview,
                                            });
                                            this.updateRecommendations();
                                            this.setState({ videos: [] });
                                            this.goToTop();
                                        }}>
                                        <View style={{ backgroundColor: "#273746" }}>
                                            <Badge>
                                                {movies.vote_average ? movies.vote_average : "N/A"}
                                                <Icon name="star" type="FontAwesome" style={{ fontSize: 10, color: "#fff" }} />
                                            </Badge>
                                        </View>
                                        <Card.Cover
                                            source={{ uri: `https://image.tmdb.org/t/p/w185/${movies.poster_path}` }}
                                        />
                                    </Card>
                                </View>
                            );
                    })
                );
            }
        }

        //When the content is not loading and there is no error
        if (!this.state.activityindicator && !this.state.error)
            return (
                <ScrollView style={{ backgroundColor: "#000" }} ref={(c) => { this.scroll = c }}>
                    <View>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Cover source={{ uri: source }} />
                                </Card>
                            </Col>
                            <Col size={2.0}>
                                <H3 style={{ color: "#fff", marginBottom: 10, marginLeft: 10 }}>{title}</H3>
                                <Text style={{ color: "#fff", marginLeft: 10 }}>{overview}</Text>
                                <Row style={{padding:4}}>
                                    <Button 
                                        full={true} 
                                        iconLeft={true}
                                        danger
                                        onPress={() => {
                                            this.onWatchClipping();
                                    }}
                                    >
                                        <Icon name="play-circle" type="FontAwesome" style={{paddingRight:2}}/>
                                        <Text style={{color:"#fff",fontSize:22,paddingRight:8}}>Watch Clippings</Text>
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </View>
                    <View>
                        <ActivityIndicator animating={this.state.videoLoading} color="#E74C3C" size="large"/>
                        <RenderVideos videos={this.state.videos} />
                    </View>
                    <View>
                        <Row>
                            <H3 style={{ color: "#fff", marginTop: 10 }}>Also watch</H3>
                        </Row>
                        <Row style={{marginTop:10}}>
                            <Col>
                                <RenderTrending_0 recomendations={this.state.recomendations} />
                            </Col>
                            <Col>
                                <RenderTrending_1 recomendations={this.state.recomendations} />
                            </Col>
                            <Col>
                                <RenderTrending_2 recomendations={this.state.recomendations} />
                            </Col>
                        </Row>
                    </View>
                </ScrollView>
            );

        //When the content is still loading and has no error
        if (this.state.activityindicator && !this.state.error) {
            return (
                <ScrollView style={{ backgroundColor: "#000" }} ref={(c) => { this.scroll = c }}>
                    <View>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Cover source={{ uri: source }} />
                                </Card>
                            </Col>
                            <Col size={2.0}>
                                <H3 style={{ color: "#fff", marginBottom: 10, marginLeft: 10 }}>{title}</H3>
                                <Text style={{ color: "#fff", marginLeft: 10 }}>{overview}</Text>
                                <Row style={{padding:4}}>
                                    <Button 
                                        full={true} 
                                        iconLeft={true}
                                        danger
                                        onPress={() => onWatchClipping()}
                                    >
                                        <Icon name="play-circle" type="FontAwesome" style={{paddingRight:2}}/>
                                        <Text style={{color:"#fff",fontSize:22,paddingRight:8}}>Watch Clippings</Text>
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </View>
                    <View>
                        <Row>
                            <H3 style={{ color: "#fff", marginTop: 10 }}>Also watch</H3>
                        </Row>
                    </View>
                    <View>
                        <Row>
                            <Col></Col>
                            <Col>
                                <ActivityIndicator animating={this.state.activityindicator} color="#E74C3C" size="large" />
                            </Col>
                            <Col></Col>
                        </Row>
                    </View>
                </ScrollView>
            );
        }

        //If it has any error in fetching data Indicate the user
        else {
            return (
                <ScrollView style={Styles.container}>
                    <Text>Error something went Wrong</Text>
                </ScrollView>
            );
        }
    }
}

export default DescriptionComponent;