import React, { Component } from 'react'
import styled from "styled-components"
import axios from "axios"

//import filterBy from "../utils/utilsFunctions"
import filterBy from "../utils/utilsFunctions"
import SearchBar from "./SearchBar"
require('dotenv').config()


const CelebritiesWrapper=styled.div`
width : 100vw; 
display : flex; 
flex-flow: column wrap;
justify-content : flex-start; 
align-items : center; 
`

const CelWrapper=styled.div`
width : 80vw; 
display : flex; 
flex-flow: row wrap;
justify-content : flex-start; 
align-items : center; 
margin : 2vh 2vw; 
`

const CelWrapperSmall=styled(CelWrapper)`
width : 35vw; 
`

const CelDetails=styled(CelebritiesWrapper)`
width : 35vw; 
`

const MovieWrap=styled(CelebritiesWrapper)`
width : 35vw; 
margin: 2vh 2vw; 
`

const Name=styled.button`
padding : 1vh 1vw; 
border: none; 
font-size : 1rem; 
`



const url=process.env.REACT_APP_CELEBRITIES_API_URL
const query="/popular?page=2&"
const api_k="api_key=" + process.env.REACT_APP_MOVIE_API_K
const movieApi=axios.create(url+query+api_k)

export default class Celebrities extends Component {

    state= {
        celebrities: [{
            name:"test",
            profile_path:"coucou"
        }],
        displayCel: false,
        indexShow: "0",
        search:""
    }


    componentDidMount(){
        movieApi.get(url+query+api_k)
        .then(
            (res) =>{ 
                console.log(" movie api response ", res)
                this.setState({celebrities : res.data.results}, () => console.log(this.state))}
        )
        .catch( err => console.log("error in axios get", err))
    }

    handleClick =(event) =>{
        this.setState({displayCel: true, indexShow: event.target.id }, () => console.log("new state", this.state))
    }

    handleSearch= (searchedText) =>{
        this.setState({search :searchedText.toLowerCase() })
    }

    filterCelebrities= () => filterBy(this.state.search, this.state.celebrities, "name")



    render() {
        console.log("this.state.displayCel --", this.state.displayCel)
        return (
            <div>
                <h1>Movies Celebrities</h1>

                <SearchBar handleChange={this.handleSearch} 
                           placeholder="Search a movie by its name"/>

                <CelebritiesWrapper>
                { this.filterCelebrities().map( (cel,index) =>{
                    return (
                        <CelWrapper>
                        <CelWrapperSmall key={index}>
                            <img src= {`https://image.tmdb.org/t/p/w185${cel.profile_path}`} 
                                 alt={cel.name}
                                 width="200"
                                 height="200"/>
                            <Name id={index} type="submit" onClick={this.handleClick}>{cel.name}</Name>
                        </CelWrapperSmall>

                        { this.state.displayCel && this.state.indexShow===index.toString() && <CelDetails key={`${index}-detail`}>
                                <img src= {`https://image.tmdb.org/t/p/w185${cel.profile_path}`} 
                                    alt={cel.name}
                                    width="200"
                                    height="200"/>
                                <h2>{cel.name}</h2>
                                <h3> Known for </h3>
                                {cel.known_for.map( movie =>{
                                    return(
                                        <MovieWrap>
                                            <img src= {`https://image.tmdb.org/t/p/w185${movie.backdrop_path}`} 
                                                alt={movie.name}
                                                width="250"
                                                height="150"/>
                                            <Name>{movie.original_title}</Name>
                                        </MovieWrap> 
                                    )  
                                })}

                            </CelDetails>
                        }
  
                    </CelWrapper>
                    )
                })     
                }
                </CelebritiesWrapper>
            </div>
        )
    }
}
