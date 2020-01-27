import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Main extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        };
    }

    componentDidMount(){
        this.fetch();
    }

    fetch=()=> {
        axios.get('http://3.120.96.16:3001/movies')
        .then(response => {
            const data = response.data;
            console.log(data)
            this.setState({ data })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    deleteOnClick=(id)=>{
        axios.delete('http://3.120.96.16:3001/movies/' + id)
        .then (response => {
            let data = response.data;
            console.log(data.id)
            this.fetch()
        })
        .catch((error) => {
            throw error.response.data;
        });
    }

    renderTableData=()=>{
        return this.state.data.map((movie) => {
            const { id, title, director, rating } = movie;
            return(
                <tr key = {id}>
                    <td><Link to={'/detailsMovie/'+ movie.id}>{title}</Link></td>
                    <td>{director}</td>
                    <td>{rating}</td>
                    <td><button className = 'Edit' ><Link to={'/editMovie/' + movie.id}>Edit</Link></button></td>
                    <td><button className = 'Details'><Link to = {'/detailsMovie/'+ movie.id} >Details</Link></button></td>
                    <td><button className = 'Delete' onClick = { () => this.deleteOnClick(id) }>Delete</button></td>
                </tr>
            );
        });
    }   
    
    render(){
        return (
            <div>
                <Helmet>
                    <title>Main</title>
                </Helmet>
                <header>
                    <h1>Main page</h1>
                </header> 
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Director</th>
                                <th>Rating</th>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                            </tr>
                        </thead>
                        <tbody>
                            { this.renderTableData() }
                        </tbody>
                    </table>
                    </div>
        )
    }
}

export default Main;