import React from 'react';
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
    render(){
        return(
            <div className = 'navBar'>
                <h1>Movies</h1>
                <div className = 'links'>
                    <h1><Link to='/'>Home</Link></h1>
                    <h1><Link to='/add'>Add</Link></h1>
                </div>
            </div>
        )
    }
}

export default Navbar;