import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Todo from './Todo'
import * as serviceWorker from './serviceWorker';

class Counter extends React.Component{
    constructor(props){
        super(props);
        this.state={count:0}
        this.add = this.add.bind(this);
        this.minu = this.minu.bind(this)
        this.reset = this.reset.bind(this)
    }

    add(){
        this.setState((preState)=>{

            return{
                count:preState.count + 1
            }
        })
        
    }
    minu(){
        console.log("handelMINUS");
    }
    reset(){
        console.log("handelRESET");
    }

    render(){
        return(
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.add}>+1</button>
                <button onClick={this.minu}>-1</button>
                <button onClick={this.reset}>ReSet</button>
            </div>
        )
    }
}


ReactDOM.render(<Todo />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
