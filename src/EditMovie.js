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
        axios.get('http://3.120.96.16:3001/movies/' + id)
        .then ((resp) => {
            let movie = resp.data
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

    onChangeDescription=(e)=>{
        this.setState({description: e.target.value});
    }

    onChangeDirector=(e)=>{
        this.setState({director: e.target.value});
    }

    onChangeRating=(e)=>{
        this.setState({rating: e.target.value});
    }
    
    onChangeTitle=(e)=>{
        this.setState({title: e.target.value});
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
                <header>
                    <h1>Edit movie</h1>
                </header>
                <div className = 'formContainer'>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <p>Enter title:</p>
                            <input 
                                id = 'inputTitle' 
                                type = 'text' 
                                onChange = {this.onChangeTitle} 
                                value={this.state.title}
                                minLength='1'
                                maxLength='40'
                                required
                            /><br />
                        </div>
                        <div>
                            <p>Enter director:</p>
                            <input 
                                id = 'inputDirector' 
                                type = 'text' 
                                onChange = {this.onChangeDirector} 
                                value ={this.state.director} 
                                minLength='1'
                                maxLength='40'
                                required
                            /><br />
                        </div>
                        <div>
                            <p>Enter rating:</p>
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
                        </div>
                        <div>
                            <p>Movie description:</p>
                            <textarea 
                                id = 'inputDescription' 
                                type = 'text' 
                                onChange = {this.onChangeDescription} 
                                value={this.state.description}
                                minLength= '1'
                                maxLength= '300'
                                required>
                            </textarea><br />
                        </div>
                        <button type='submit' className = 'submitBtn'>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditMovie;