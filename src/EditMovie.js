import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class EditMovie extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            director: '',
            rating: '',
            id: '',
            redirect: false,
            error: false,
        }
    }
    
    componentDidMount=()=>{
        let id = this.props.match.params.id;
        console.log(id)
        axios
        .get('http://3.120.96.16:3001/movies/' + id)
        .then ((resp) => {
            let movie = resp.data
            console.log(movie)
            if(movie){
                this.setState({ 
                    id: movie.id,
                    title: movie.title,
                    description: movie.description,
                    director: movie.director,
                    rating: movie.rating,
                })
            }
        })
        .catch((error) => {
            this.setState({error: true})
            
        })
    }

    onSubmit=(e)=>{
        e.preventDefault();
        let id = this.props.match.params.id;
        const movie = {
            title: this.state.title,
            description: this.state.description,
            director: this.state.director,
            rating: this.state.rating
        }
        console.log(id)
        axios.put('http://3.120.96.16:3001/movies/' + id, movie)
        .then (() => {
            this.setState({ 
                redirect: true,
            })
        })
        .catch((error)=>{
            this.setState({error: true})
        });
    }

    onChangeTitle=(e)=>{
                this.setState({title: e.target.value});
    }

    onChangeDirector=(e)=>{
        this.setState({director: e.target.value});
        console.log(this.state.movie.director)
    }

    onChangeRating=(e)=>{
        this.setState({rating: e.target.value});
    }

    onChangeDescription=(e)=>{
        this.setState({description: e.target.value});
    }

    render(){
        if(this.state.redirect){
            return <Redirect to = '/' />
        }
        if(this.state.error){
            return <p>Ooops, something went wrong!</p>
        }
        return(
            <div>
                <Helmet>
                    <title>Edit movie</title>
                </Helmet>
                <form onSubmit={this.onSubmit}>
                    <label>Enter title:
                        <input 
                            id = 'inputTitle' 
                            type = 'text' 
                            onChange = {this.onChangeTitle} 
                            value={this.state.title}
                            minLength='1'
                            maxLength='40'
                            required
                        /><br />
                    </label>
                    <label>Enter director:
                        <input 
                            id = 'inputDirector' 
                            type = 'text' 
                            onChange = {this.onChangeDirector} 
                            value ={this.state.director} 
                            minLength='1'
                            maxLength='40'
                            required
                        /><br />
                    </label>
                    <label>Enter rating:
                        <input 
                            id = 'inputRating' 
                            type = 'number' 
                            onChange = {this.onChangeRating} 
                            value= {this.state.rating} 
                            min = '0'
                            max = '5'
                            step = '0.1'
                            required
                        /><br />
                    </label>
                    <label >Movie description:
                        <textarea 
                            id = 'inputDescription' 
                            type = 'text' 
                            onChange = {this.onChangeDescription} 
                            value={this.state.description}
                            minLength= '1'
                            maxLength= '300'
                            required>
                        </textarea><br />
                    </label>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default EditMovie;