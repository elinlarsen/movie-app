import React, { Component } from 'react'
import styled from "styled-components"

const Main=styled.div`
width : 100vw; 
display : flex; 
flex-flow: column wrap;
justify-content : center; 
align-items : center; 
`

export default class CustomizeImage extends Component {

    state={
        url:"http://www.photos-public-domain.com/wp-content/uploads/2018/05/siamese-tabby-cat.jpg",
        size:{
            height:"500",
            width: "500"
        }
    }

    handleRangeChange =(event) =>{
        let val=event.target.value
        this.setState({
            url: this.state.url,
            size: {
                height : val,
                width: val,
            }
        }, () => console.log(this.state))

    }

    handleImageChange =(event) =>{
        let val=event.target.value
        this.setState({
            url: val,
            size: this.state.size,
        }, () => console.log(this.state))

    }

    render() {
        return (
            <Main>
                <h1> Custimize your image </h1>
                <input type="text" placeholder="Url of an image" value={this.state.url} onChange={this.handleImageChange}/>
                <input type="range" value={this.state.size.height} onChange={this.handleRangeChange} max="1000"/>
                <img src={this.state.url} alt='coucou' width={this.state.size.width} height= {this.state.size.height}  />
                <p>{this.state.size.height} x {this.state.size.width} px</p>               
            </Main>
        )
    }
}
