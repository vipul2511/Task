import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity,BackHandler,ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {                   
      Email: '',  
      Password:'',
      user_name:'',
      password:''                          
    };
  
  }
  createAccount=()=>{
      this.props.navigation.navigate('SignUp');
  }
  handleSubmit = () => {
    let email = this.state.Email;
    let Password = this.state.Password;
    if (Password !== '' && email !== '') {
        console.log('email',this.state.Email);
        console.log('password',this.state.Password);
        console.log('store pass',this.state.user_name);
        console.log('store pass',this.state.password);
        console.log('first if working');
     if(email==this.state.user_name && Password==this.state.password){
         console.log('second if working');
        this.props.navigation.navigate('Home');
      }else{
          alert('Please enter correct email and password');
      }
    }else{
      alert('Please enter email and password');
    }
  }
  componentDidMount(){
    AsyncStorage.getItem('@user_localDetails').then((obj)=>{
        if(obj){
           
            let conObj=JSON.parse(obj);
            console.log('object',conObj.password);
            this.setState({user_name:conObj.user_email});
            this.setState({password:conObj.password});
        }
    })
  }
 
 
  render() {
    return (
      
      <View style={styles.container}>
        <Text style={styles.formLabel}>Email ID</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={(Email) => this.setState({ Email })}
          value={this.state.Email}
        />
        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={(Password) => this.setState({ Password })}
          value={this.state.Password}
          secureTextEntry={true}
        />
        <View><TouchableOpacity title="Already have an Account" onPress={this.createAccount}>
            <Text style={{color:'#0093E9',textAlign:'right',marginTop:5}}> Don't have an Account ?</Text>
        </TouchableOpacity></View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            title="Start Call!"
            onPress={this.handleSubmit}
            style={styles.submitButton}
          >
            <Text style={{ color: '#ffffff' }}> Sign In </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 0,
    padding: 20,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formLabel: {
    paddingBottom: 10,
    paddingTop: 10,
    color: '#0093E9',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  submitButton: {
    paddingHorizontal: 60,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  formInput: {
    height: 40,
    backgroundColor: '#f5f5f5',
    color: '#0093E9',
    borderRadius: 4,
    paddingLeft: 20,
  },
});

export default SignIn;