import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Main from './Main';
import AddMovie from './AddMovie';
import DetailsMovie from './DetailsMovie';
import Navbar from './Navbar'
import EditMovie from './EditMovie';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <header>
          
        </header>
        <Router>
          <Navbar />
            <Route exact path='/' component={Main} />
            <Route path='/add' component={AddMovie} />
            <Route path='/detailsMovie/:id' component={DetailsMovie} />
            <Route path='/editMovie/:id' component={EditMovie} />
          </Router>
      </div>
    );
  }
}

export default App;
