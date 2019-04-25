import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import CustomerList from './components/CustomerList';
import TrainingsList from './components/TrainingsList';
import Home from './components/Home';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Calendar from './components/Calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static">          
            <Toolbar>          
              <Typography variant="h6" color="inherit">
                Training App
              </Typography>
            </Toolbar>
        </AppBar>
            
        <BrowserRouter>
          <div className="Frame" style={{marginLeft:24}}>
          <Link to="/" style={{textDecoration:'none'}}><Button style={{marginTop:10, marginBottom: 10, marginRight: 5}} variant="outlined">Home</Button></Link>
          <Link to="/customers" style={{textDecoration:'none'}}><Button style={{marginTop:10, marginBottom: 10, marginRight: 5}} variant="outlined">Customers</Button></Link>
          <Link to="/trainings" style={{textDecoration:'none'}}><Button style={{marginTop:10, marginBottom: 10, marginRight: 5}} variant="outlined">Trainings</Button></Link>
          <Link to="/calendar" style={{textDecoration:'none'}}><Button style={{marginTop:10, marginBottom: 10}} variant="outlined">Calendar</Button></Link>
          
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/customers" component={CustomerList} />
              <Route path="/trainings" component={TrainingsList} />
              <Route path="/calendar" component={Calendar} />
            </Switch>

          </div>
        </BrowserRouter>
        
        
        
      </div>
    );
  }
}

export default App;
