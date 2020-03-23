import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventBoard extends Component{
  //local state will hold search input/parameters (eventually?)


  //upon mounting it will GET all published events (unprotected route)
  componentDidMount=()=>{
    this.props.dispatch({type:'FETCH_EVENTS'})
  }

  goToDetails=(eventId)=>{
    console.log('hey, in goToDetails with event id:', eventId);
    this.props.history.push(`/details/${eventId}`);
  }

  //display the events that are stored in redux state and on props:
  render(){
    return( 
      <section className="EventBoard">
        <h1>Upcoming Events</h1>
        {this.props.events[0] &&
          this.props.events.map((eventObject)=>
            <article className="eventArticle"  key={eventObject.id}>
              <h2>{eventObject.title}</h2>
              <p>{eventObject.description}</p>
              <p className="date">{eventObject.when}</p>
              <p>{eventObject.location}</p>
              <button onClick={() => this.goToDetails(eventObject.id)}>see details</button>
            </article>
          )
        }
      </section>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({events: reduxState.event})
export default connect(putReduxStateOnProps)(EventBoard);
