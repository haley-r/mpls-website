import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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
          this.props.events.map((event)=>
            <article className="eventArticle"  key={event.id}>
              <h2>{event.name}</h2>
              <p>{event.shortDescription}</p>
              {/* conditional to show "today" or "tomorrow" could go here */}
              {/* also conditionals to not repeat date if same date - lots of possibilities */}
              <p className="date">{moment(event.startTime).format('ddd M/D')} at {moment(event.startTime).format('h:mm a')}</p>
              {event.endTime != null &&
                <p className="date">{moment(event.endTime).format('- ddd M/D')} at {moment(event.endTime).format('h:mm a')}</p>
              }
              <p>{event.location}</p>
              <button onClick={() => this.goToDetails(event.id)}>see details</button>
            </article>
          )
        }
      </section>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({events: reduxState.event})
export default connect(putReduxStateOnProps)(EventBoard);
