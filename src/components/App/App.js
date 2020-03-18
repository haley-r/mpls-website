import React, {Component} from 'react';
import {HashRouter as Router, Route, Redirect, Switch,} from 'react-router-dom';

import {connect} from 'react-redux';

//these components will show on all pages
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

//these components are for all users
import About from '../About/About';
import EventBoard from '../EventBoard/EventBoard';
import EventForm from '../EventForm/EventForm';
import EventReview from '../EventReview/EventReview';
import EventConfirmation from '../EventConfirmation/EventConfirmation';
  //also, EventDetails, but I think that'll be imported in other components

// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'


import './App.css';

class App extends Component {
  // componentDidMount () {
  //   this.props.dispatch({type: 'FETCH_USER'})
  // }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <About />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={EventBoard}/>
            <Route exact path="/event-form" component={EventForm}/>
            <Route exact path="/event-review" component={EventReview} />
            <Route exact path="/event-confirmation" component={EventConfirmation} />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
