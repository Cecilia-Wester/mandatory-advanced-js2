import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class AddMovie extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            director: '',
            rating: '',
            description: '',
            redirect: false,
        }
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
        axios.post('http://3.120.96.16:3001/movies', {
            title: this.state.title, 
            director: this.state.director, 
            rating: this.state.rating, 
            description: this.state.description
        })
        .then(() => {
            this.setState({redirect: true})
        })
        .catch((error) => {
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
                    <title>Add movie</title>
                </Helmet>
                <header>
                    <h1>Add a new movie</h1>
                </header>
                <div className = 'formContainer'>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <p>Enter title: </p>  
                            <input 
                                placeholder='Title' 
                                id = 'inputTitle' 
                                onChange = {this.onChangeTitle} 
                                title={this.state.title}
                                minLength='1'
                                maxLength='40'
                                required 
                            /><br />
                        </div>
                        <div>
                            <p>Enter director: </p>
                        <input 
                                type='text'
                                placeholder='Director' 
                                id='inputDirector' 
                                onChange = {this.onChangeDirector} 
                                director ={this.state.director} 
                                minLength='1'
                                maxLength='40'
                                required
                            /><br />
                        </div>
                        <div>
                            <p>Enter rating: </p>
                            <input 
                                type='number'
                                placeholder='Rating' 
                                id = 'inputRating' 
                                onChange = {this.onChangeRating} 
                                rating= {this.state.rating} 
                                min='0'
                                max='5'
                                step='0.1'
                                required
                            /><br />
                        </div>
                        <div>
                            <p>Movie description: </p>
                            <textarea 
                                type='text'
                                placeholder='Description' 
                                id = 'inputDescription' 
                                onChange = {this.onChangeDescription} 
                                description={this.state.discription}
                                minLength='1'
                                maxLength='300'
                                required>
                            </textarea><br />
                        </div>
                        <button type='submit' className = 'submitBtn'>Submit</button>
                    </form>
                </div>
            </div>
        );
            
    }
}

export default AddMovie;