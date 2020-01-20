import React from 'react';
import logo from './logo.svg';
import Card from './Card';
import './App.css';


export default class App extends React.Component{
  constructor(){
    super();
    this.state={name:"Zoro"}
  }
  
  render(){
    return(
      <div>
        <Card name={this.state.name} />
      </div>
    )
  }
};
 