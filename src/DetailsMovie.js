import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import {Link} from 'react-router-dom';


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
        });
    }

    render(){
        if(this.state.error){
            return <p>Ooops, something went wrong. The movie has been removed by another user.</p>
        }
        return(
            <div className = 'detailsContainer'>
                <Helmet>
                    <title>Details</title>
                </Helmet>
                <header>
                    <h1>Details</h1>
                </header>
                <ul>
                    <li className = 'detailsTitle'>{this.state.movie.title}</li>
                    <li className = 'detailsDirector'>Director: {this.state.movie.director}</li>
                    <li className = 'detailsRating'>Rating: {this.state.movie.rating}</li>
                    <li className = 'detailsDescription'>Description: {this.state.movie.description}</li>
                </ul>
                <button className = 'detailsEdit' ><Link to={'/editMovie/' + this.state.movie.id}>Edit</Link></button>
            </div>
        )
    }
}

export default DetailsMovie;