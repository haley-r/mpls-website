import React, {Component} from 'react';
import {HashRouter as Router, Route, Redirect, Switch,} from 'react-router-dom';

import {connect} from 'react-redux';

//these components will show on all pages
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

//these components are for all users
import About from '../About/About';
import Contact from '../Contact/Contact';
import EventBoard from '../EventBoard/EventBoard';
import EventForm from '../EventForm/EventForm';
import EventReview from '../EventReview/EventReview';
import EventConfirmation from '../EventConfirmation/EventConfirmation';
  //also, EventDetails, but I think that'll be imported in other components

//these components are only shown to logged in users
import AdminDashboard from '../AdminDashboard/AdminDashboard';

//this decides which of the above components are shown at certain routes
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


import './App.css';

class App extends Component {
  // does it need to do this to decide what shows? probably..
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
            {/* unprotected routes - all users can see without login */}
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/home" component={EventBoard}/>
            <Route exact path="/event-form" component={EventForm}/>
            {/* should review and confirmation be protected? or maybe error if they don't exist */}
            <Route exact path="/event-review" component={EventReview} />
            <Route exact path="/event-confirmation" component={EventConfirmation} />
            {/* protected routes */}
            <ProtectedRoute exact path="/admin" component={AdminDashboard} />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
