import React from 'react';


export default class Card extends React.Component{
    constructor(props){
        super(props)
        console.log(props);
        
        this.state={item:[]}
    }

    render(){
        return(
            <div>
                <h2>{this.props.name} is my Name</h2>
            </div>
        )
    }

}