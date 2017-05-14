/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

const timerOptions = [5, 7, 10, 12, 15, 21]

class Button extends Component {
  constructor(props){
    super(props);
    this.startTimer = this.startTimer.bind(this);
  }

  startTimer(event) {
    let time = (this.props.isMinutes) ? this.props.time * 60 : this.props.time;
    console.log(time);
    return this.props.startTimer(time);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.startTimer}>
        <Text style={styles.button}>{this.props.time}{(this.props.isMinutes) ? 'minutes' : 'seconds'}</Text>
      </TouchableOpacity>
    )
  }
}

class Timer extends Component {
  render() {
    if(this.props.time == null || this.props.time == 0) {
      return <View><Text style={styles.heading}></Text></View>
    }    
    return (
      <View>
        <Text style={styles.heading}>{this.props.time} </Text>
        <Text>Seconds left</Text>
      </View>      
    );
  }
}

export default class TimerWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: null,
      int: null,
      isMinutes:false
    };
    this.startTimer = this.startTimer.bind(this);
    this.toggleTime = this.toggleTime.bind(this);
  }

  toggleTime(){
    this.setState({isMinutes: !this.state.isMinutes})
  }

  startTimer(time) {
    clearInterval(this.state.int);
    let int = setInterval(() => {
      var timeLeft = this.state.time - 1;
      console.log('timeLeft' + timeLeft);
      if(timeLeft == 0) {
        clearInterval(int);
      }
      this.setState({time: timeLeft});
    }, 1000);
    console.log('1: After setInterval');
    console.log(time);
    console.log(int);
    return this.setState({time:time, int: int})
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Timer!</Text>
          <Text style={styles.instructions}>Press a button!</Text>
          <View style={styles.buttons}>
            {timerOptions.map((item, index, list)=>{
              return <Button key={index} time={item} startTimer={this.startTimer} isMinutes={this.state.isMinutes} />
            })}
          </View>
          <Text>Minutes</Text>
            {/*<Switch onValueChange={()=>{this.setState({isMinutes:!this.state.isMinutes})}} value={this.state.isMinutes} />*/}
            <Switch onValueChange={this.toggleTime} value={this.state.isMinutes} />              
          <Timer time={this.state.time}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems:'center'
  },
  heading:{
    flex: 1,
    fontSize:36,
    paddingTop:40,
    margin:10
  },
  instructions: {
    color: '#333333',
    marginBottom:15
  },
  button:{
    color:'#111',
    marginBottom:15,
    borderWidth:1,
    borderColor:'blue',
    padding: 10,
    borderRadius:20,
    fontWeight:'600'
  },
  buttons:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-start'
  }
});

AppRegistry.registerComponent('Timer', () => TimerWrapper);
