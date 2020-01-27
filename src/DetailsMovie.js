import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class DetailsMovie extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            movie: {},
            error: false,
        }
    }

    componentDidMount=()=>{
        let id = this.props.match.params.id;
        console.log(id)
        axios
        .get('http://3.120.96.16:3001/movies/' + id)
        .then ((resp) => {
            let movie = resp.data;
            if(movie){
                this.setState({movie: movie})
            } 
        })
        .catch((error) => {
            this.setState({error: true})
            console.log(error);
        })
    }
    
    render(){
        if(this.state.error){
            return <p>Ooops, something went wrong. The movie has been removed by another user.</p>
        }
        return(
            <div>
                <Helmet>
                    <title>Movie info</title>
                </Helmet>
                <h2>Details</h2>
                <ul>
                    <li>{this.state.movie.title}</li>
                    <li>{this.state.movie.director}</li>
                    <li>{this.state.movie.rating}</li>
                    <li>{this.state.movie.description}</li>
                </ul>
            </div>
        )
    }
}

export default DetailsMovie;