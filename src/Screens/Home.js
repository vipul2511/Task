import React,{Component} from 'react';
import {View,Text,FlatList,Dimensions,Image,TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Left, Right, Button, Icon, Title,Picker } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            selected: "key1",
            filter:false,
            prices:'',
            storeItem:[],
            productList:[
                {
                    id:'1',
                    name:'Shirt',
                    price:500,
                    sizeID:2,
                    size:'L',
                    image:require('../images/profile_image.png')
                },
                {
                    id:'2',
                    name:'jeans',
                    price:1200,
                    sizeID:1,
                    size:'M',
                    image:require('../images/itemImage4.png')
               },
                {
                    id:'3',
                    name:'pant',
                    price:200,
                    sizeID:2,
                    size:'L',
                    image:require('../images/itemImages2.png')
                },
                {
                    id:'4',
                    name:'Printed Shirt',
                    price:350,
                    sizeID:5,
                    size:'XL',
                    image:require('../images/ItemImage3.png')
                }
            ]
        }
    }
    componentDidMount(){
        let prices=[];
   let item= this.state.productList;
    item.map((item,index)=>{
        prices.push(item.price);
    });
    this.setState({price:prices});
    let previousProduct=this.state.storeItem;
    AsyncStorage.getItem('@add_product').then((add)=>{
        if(add){
            previousProduct.push(JSON.parse(add));
        }
        this.setState({storeItem:previousProduct});
    });
    }
    onValueChange(value: string) {
        this.setState({
          selected: value
        });
      }
      addToCart=(data)=>{
          
          let item=this.state.storeItem;
          item.push(data);
          AsyncStorage.setItem('@add_product',JSON.stringify(item)).then(succ=>{
              this.props.navigation.navigate('Cart');
          })
        
      }
      sortbylowerSize = () => {
        const { productList } = this.state;
        productList.sort((a, b) => a.sizeID - b.sizeID ) 
        console.log(productList);   
        this.setState({productList:productList })
      }
      sortbyBiggerSize = () => {
        const { productList } = this.state;
        productList.sort((a, b) => a.sizeID - b.sizeID ).reverse() 
        console.log(productList);   
        this.setState({productList:productList })
      }
      sortAscending = () => {
        const { productList } = this.state;
        productList.sort((a, b) => a.price - b.price ) 
        console.log(productList);   
        this.setState({productList:productList })
      }
      sortDescending = () => {
        const { productList } = this.state;
        productList.sort((a, b) => a.price - b.price).reverse()
        this.setState({productList:productList })
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
            <Title>Home</Title>
          </Body>
          <Right>
            <Button transparent onPress={()=>{this.props.navigation.navigate('Search')}} >
              <Icon  name='search' />
            </Button>
            <Button transparent onPress={()=>{this.setState({filter:!this.state.filter})}}>
              <Icon name='filter' />
            </Button>
            <Button transparent onPress={()=>{this.props.navigation.navigate('Cart')}}>
              <Icon name='cart' />
            </Button>
          </Right>
        </Header>
        <View>
            <ScrollView horizontal>
            <View style={{flexDirection:'row'}}>
       <TouchableOpacity style={{margin:10}} onPress={this.sortbylowerSize}>
           <Text style={{fontSize:15}}>Sort by lower Size</Text>
       </TouchableOpacity>
       <TouchableOpacity style={{margin:10}} onPress={this.sortbyBiggerSize}>
           <Text style={{fontSize:15}}>Sort by Bigger Size</Text>
       </TouchableOpacity>
       <TouchableOpacity  style={{margin:10}} onPress={this.sortAscending} > 
           <Text style={{fontSize:15}}>Lower to Higher</Text>
       </TouchableOpacity>
       <TouchableOpacity  style={{margin:10}} onPress={this.sortDescending}>
           <Text style={{fontSize:15}}>Higher to Lower</Text>
       </TouchableOpacity>
       </View>
       </ScrollView>
        </View>
           <FlatList
              data={this.state.productList}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
               <View >
                  
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
              <TouchableOpacity style={{marginLeft:width*0.08,marginTop:25,backgroundColor:'#3F51B5',borderRadius:25,width:100,height:35,justifyContent:'center'}} onPress={()=>{this.addToCart(item)}}>
                           <Text style={{color:'#fff',textAlign:'center'}}>Add to Cart</Text>
                       </TouchableOpacity>
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