import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch
} from 'react-native';

const timeOptions = [5, 7, 10, 12, 15, 21]

class Button extends Component {
  constructor(props) {
    super(props);
    this.startTimer = this.startTimer.bind(this);
  }

  startTimer(event){
    let time = (this.props.isMinutes) ? this.props.time * 60 : this.props.time;
    return this.props.startTimer(time);
  }

  render(){
    return(
      <TouchableOpacity onPress={this.startTimer}>  
        <Text style={styles.button}>{this.props.time} {(this.props.isMinutes) ? 'minutes' : 'seconds'} </Text>
      </TouchableOpacity>
    )
  }
}

class Timer extends Component {
  render(){
    if(this.props.time == null || this.props.time == 0) {
      return <View><Text></Text></View>
    }
    return(
      <View>
        <Text style={styles.heading}>{this.props.time}</Text>
        <Text style={{alignItems:'center'}}>Seconds left</Text>
      </View>      
    )
  }
}

export default class TimerWrapper extends Component {

  constructor(props){
    super(props)
    this.state = {
      time:null,
      timer: null,
      isMinutes: false
    }
    this.startTimer = this.startTimer.bind(this)
  }

  toggleTime(){
    let time = this.state.time
    if(time == 0) {
      time = null
    }
    this.setState({isMinutes:!this.state.isMinutes, time:time})
  }

  startTimer(time) {
    clearInterval(this.state.timer);
    let timer = setInterval(() => {
      var time = this.state.time - 1;
      console.log('insde timeLeft' + time);
      if(time == 0) {
        clearInterval(timer);
      }
      this.setState({time:time})
    }, 1000);
    console.log('outside of timeLeft' + time);
    return this.setState({time:time, timer:timer});
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Timer!</Text>
          <Text style={styles.instructions}>Press a button</Text>
          <View style={styles.buttons}>
            {timeOptions.map((item, index) => {
              return <Button key={index} time={item} startTimer={this.startTimer} isMinutes={this.state.isMinutes}/>
            })}
          </View>
          <Text>Minutes</Text>
          <Switch onValueChange={this.toggleTime.bind(this)} value={this.state.isMinutes}/>
          <Timer time={this.state.time}/>
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    alignItems:'center'
  },
  heading:{
    borderRadius:10,    
    backgroundColor:'#ef553a',
    flex:0,
    fontSize: 36,
    fontWeight:'bold',
    margin:35,
    borderWidth: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  instructions:{
    color: '#333333',
    marginBottom: 15,
    fontSize:35
  },
  button:{
    color: '#111',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
  	borderRadius: 20,
    fontWeight: '600'        
  },
  buttons:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-start'
  }
})