import React, {Component} from 'react';
import {HashRouter as Router, Route, Redirect, Switch,} from 'react-router-dom';

import {connect} from 'react-redux';

//these components will show on all pages
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

//these components are for all users
import Contact from '../Contact/Contact';
import EventBoard from '../EventBoard/EventBoard';
import EventDetails from '../EventDetails/EventDetails';
import EventDisclaimer from '../EventDisclaimer/EventDisclaimer';
import EventForm from '../EventForm/EventForm';
import EventReview from '../EventReview/EventReview';
import EventEdit from '../EventEdit/EventEdit';
import EventConfirmation from '../EventConfirmation/EventConfirmation';
  //also, EventDetails, but I think that'll be imported in other components

//these components are only shown to logged in users
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import AdminDetails from '../AdminDetails/AdminDetails';

//this decides which of the above components are shown at certain routes
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


import './App.css';
import AdminEdit from '../AdminEdit/AdminEdit';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Nav />
          <Switch>
            <Redirect exact from="/" to="/home" />
            {/* unprotected routes - all users can see without login */}
            <Route exact path="/contact" component={Contact}/>
            <Route exact path="/home" component={EventBoard}/>
            <Route path="/details/:eventId" component={EventDetails} />
            <Route exact path="/post-event-1" component={EventDisclaimer}/>
            <Route exact path="/post-event-2" component={EventForm} />
            {/* should review and confirmation be protected? or maybe error if they don't exist */}
            <Route exact path="/post-event-edit" component={EventEdit} />
            <Route exact path="/post-event-3" component={EventReview} />
            <Route exact path="/post-event-4" component={EventConfirmation} />
            {/* protected routes */}
            <ProtectedRoute exact path="/admin" component={AdminDashboard} />
            <ProtectedRoute exact path="/admin/details/:eventId" component={AdminDetails} />
            <ProtectedRoute exact path="/admin/edit/:eventId" component={AdminEdit} />


            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
