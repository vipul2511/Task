import React, { Component} from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity,BackHandler,ToastAndroid,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {                   
      Email: '',  
      password:'',
      confirmPassword:''                     
    };
  }
  alreadyAccount=()=>{
      this.props.navigation.navigate('SignIn');
  }
  handleSubmit = () => {
    let email = this.state.Email;
    let Password = this.state.password;
    let Confirm= this.state.confirmPassword;
    if(Password === Confirm){
    if (Password !== '' && email !== '') {
      let userObj={
        user_email:email,
        password:Password
      }
    AsyncStorage.setItem('@user_localDetails',JSON.stringify(userObj)).then(succ=>{
      this.props.navigation.navigate('Home');
    })
    }else{
    alert("Please Enter correct Email ID and Password")
    }
}else{
    alert("Enter the correct Password");
}
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
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true}
        />
         <Text style={styles.formLabel}>Confirm Password</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
          value={this.state.confirmPassword}
          secureTextEntry={true}
        />
        <View><TouchableOpacity title="Already have an Account" onPress={this.alreadyAccount}>
            <Text style={{color:'#0093E9',textAlign:'right',marginTop:5}}> Already have an Account</Text>
        </TouchableOpacity></View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            title="Start Call!"
            onPress={this.handleSubmit}
            style={styles.submitButton}
          >
            <Text style={{ color: '#ffffff' }}> Sign Up </Text>
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

export default SignUp;