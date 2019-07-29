import React, { Component } from 'react'
import styled from "styled-components"

const Input=styled.input``

export default class Temperature extends Component {

    state = {
        temperature: "0", 
        displayText: false, 
    }

    getText=(val)=>{

        var res={}
        if (val <10) res={text : "It's cold", color : "blue"}
        else if (val >= 10 && val <= 30) res={text : "It's nice", color : "black"}
        else if (val >= 30) res={text : "It's warm", color : "red"}
        console.log("res ---", res)
        return res

    }

    handleInputTemp = (event) =>{
        let val=event.target.value
        
        this.setState({temperature : val, displayText: true}, () => {

                console.log("val ----", val, "state ---", this.state)
        })

        
    
    }

    render() {
        return (
            <div>
                <h1> Temperature</h1>
                <Input type='number' placeholder="Temperature in °C" onChange={this.handleInputTemp} value={this.state.temperature} />            
            
                {this.state.displayText &&             
                    <p style={{color : `${this.getText(this.state.temperature).color}`}}>
                         {this.getText(this.state.temperature).text}
                     </p>
                }
            </div>

        )
    }
}
