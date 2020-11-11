import React,{Component} from 'react';
import {View,Text,FlatList,Dimensions,Image,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Left, Right, Button, Icon, Title,Picker } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class Cart extends Component{
    constructor(props){
        super(props);
        this.state={
            selected: "key1",
            filter:false,
            productList:''
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('@add_product').then((add)=>{
            if(add){
                this.setState({productList:JSON.parse(add)});
                console.log(JSON.stringify(this.state.productList))
            }
          
        });
    }
    onValueChange(value: string) {
        this.setState({
          selected: value
        });
      }
     
    render(){
        return(
            <View style={{flex:1}}>
                <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Cart</Title>
          </Body>
          <Right>
            {/* <Button transparent >
              <Icon  name='search' />
            </Button> */}
            <Button transparent onPress={()=>{this.setState({filter:!this.state.filter})}}>
              <Icon name='filter' />
            </Button>
            {/* <Button transparent>
              <Icon name='cart' />
            </Button> */}
          </Right>
        </Header>
           <FlatList
              data={this.state.productList}
            //   keyExtractor={index => index}
              renderItem={({item,index}) => (
               <View key={index} >
                  
                  <Card style={{height:width*0.5}}>
                    <CardItem>
                      <Body>
                      <View style={{flexDirection:'row'}}>
                          <View>
                       <Image source={item.image} style={{width:120,height:120}} />
                       </View>
                       <View>
                       <View style={{marginLeft:width*0.08}}> 
                      <Text style={{fontSize:20}}>Name: {item.name}</Text>
                  </View>
              <Text style={{marginLeft:width*0.09,fontSize:16,marginTop:12}}>Price: {item.price}</Text>
              <Text style={{marginLeft:width*0.09,fontSize:16,marginTop:12}}>Size: {item.size}</Text>
              {/* <TouchableOpacity style={{marginLeft:width*0.08,marginTop:25,backgroundColor:'#3F51B5',borderRadius:25,width:100,height:35,justifyContent:'center'}}>
                           <Text style={{color:'#fff',textAlign:'center'}}>Add to Cart</Text>
                       </TouchableOpacity> */}
                       </View>
                      
                       </View>
                     
                      </Body>
                    </CardItem>
                  </Card>
                  </View>
                  
                )}
              />
            </View>
        )
    }
}