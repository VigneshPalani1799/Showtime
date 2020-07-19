import React, {Component} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Row, H3, Col } from 'native-base';
import { Text, Image } from 'react-native';
import { Card } from 'react-native-paper';


class DescriptionComponent extends Component{

    render(){
        const {source} = this.props.route.params;
        const {overview} = this.props.route.params;
        const {title} = this.props.route.params;
        return(
            <ScrollView style={{backgroundColor:"#000"}}>
                <Row>
                    <Col>
                        <Card>
                            <Card.Cover source={{uri:source}} />
                        </Card>
                    </Col>
                    <Col size={2.0}>
                        <H3 style={{color:"#fff",marginBottom:10}}>{title}</H3>
                        <Text style={{color:"#fff"}}>{overview}</Text>
                    </Col>
                </Row>
            </ScrollView>
        );
    }
}

export default DescriptionComponent;