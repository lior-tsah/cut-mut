import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions,Image, TouchableOpacity } from 'react-native';
import {data} from './Data.js';


 class CardItem extends React.Component {
    constructor(props) {
        super(props)

        // @TODO: move all playground settings to single object-> fieldsInUse, chartType, formSubmission
        this.state = {

      
    }
  }
    handlePressCard=()=>{
        this.props.handlePressCard(this.props.item);
        // this.forceUpdate();
    }
  render(){
   
    return (
      <View style={stylesCards.container}>

        <TouchableOpacity 
            style= {this.props.item.press ? stylesCards.press : stylesCards.unPress}   
            activeOpacity = { .5 } 
            onPress={this.handlePressCard}>
            <Image  
                source= {{uri: this.props.item.card.imageUrl}}
                style={stylesCards.card} /> 
        </TouchableOpacity>
      </View>
    )
  }
  
}
export {CardItem};

const stylesCards = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    marginRight: 1,
    marginTop:8,
    marginBottom:8,
    alignItems:'center',  
  },
  unPress: {
    width: '90%', 
    height: '90%' ,
    borderColor: "yellow",
    borderWidth: 0    
  },
  press: {
    width: '90%', 
    height: '90%' ,
    borderColor: "yellow",
    borderWidth: 8    
  },
  card: {
    width: '100%', 
    height: '100%' , 
    resizeMode: 'contain', 
    borderColor: "black",
    borderWidth: 8
    },
 
});
