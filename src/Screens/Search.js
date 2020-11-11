import React, { Component } from 'react';
import {View,Text,FlatList,Dimensions,Image,TouchableOpacity} from 'react-native';
import { Container, Header,Card, CardItem, Body, Left, Right, Item, Input,Title, Icon, Button } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

let width=Dimensions.get('window').width;
let height=Dimensions.get('window').height;
export default class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state={
            keytext:'',
            search:'',
            filteredData:'',
            storeItem:'',
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
    addToCart=(data)=>{
          
        let item=this.state.storeItem;
        item.push(data);
        AsyncStorage.setItem('@add_product',JSON.stringify(item)).then(succ=>{
            this.props.navigation.navigate('Cart');
        })
      
    }
    componentDidMount(){
        let prices=[];
   let item= this.state.productList;
    item.map((item,index)=>{
        prices.push(item.price);
    });
    this.setState({price:prices});
    let previousProduct=[];
    AsyncStorage.getItem('@add_product').then((add)=>{
        console.log('parse',add);
        let item=JSON.parse(add);
        if(typeof item =='object'|| Array.isArray(item) ){
            console.log('executed');
            this.setState({storeItem:JSON.parse(add)});
        }else{
            console.log('executed else');
            previousProduct.push(JSON.parse(add));
            this.setState({storeItem:previousProduct});
        }
       
        
    });
    }
     searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource
          // Update FilteredDataSource
          const newData = this.state.productList.filter(
            function (item) {
              const itemData = item.name
                ? item.name.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
          });
          this.setState({filteredData:newData});
        //   setFilteredDataSource(newData);
        //   setSearch(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
        //   setFilteredDataSource(masterDataSource);
        //   setSearch(text);
        }
      };
  render() {
    return (
        <View>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search"  onChangeText={(text) => {this.searchFilterFunction(text)}}  />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      <View>
      <FlatList
              data={this.state.filteredData}
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
              <TouchableOpacity onPress={()=>{this.addToCart(item)}} style={{marginLeft:width*0.08,marginTop:25,backgroundColor:'#3F51B5',borderRadius:25,width:100,height:35,justifyContent:'center'}}>
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
      </View>
    );
  }
}