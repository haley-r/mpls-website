import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class EventBoard extends Component{
  //local state will hold search input/parameters when search is developed
  
  componentDidMount=()=>{
    this.props.dispatch({type:'FETCH_EVENTS'})
  }  //upon mounting, GET all published events (unprotected route)
  goToDetails=(eventId)=>{
    this.props.history.push(`/details/${eventId}`);
  }//clicking any details button will go to details route for that event

  //display the events that are stored in redux state from the get on load (or search get, later)
  //conditional rendering for dates!
  render(){
    return( 
      <section className="EventBoard">
        <h1>Upcoming Events</h1>
        {this.props.events[0] &&
          this.props.events.map((event)=>
            <div className="border-div">
              <article className="eventArticle"  key={event.id}>
                <h2>{event.name}</h2>
                  <p className="shortDescription">{event.shortDescription}</p>
                  <p className="date">{moment(event.startTime).calendar()} </p> 
                  <p className="location">at {event.location}</p>
                <button onClick={() => this.goToDetails(event.id)} className="detailsButton">Details...</button>
              </article>
            </div>
          )
        }
      </section>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({events: reduxState.event})
export default connect(putReduxStateOnProps)(EventBoard);


//use conditionals to render dates beyond just moment's automatic choices
// {/* conditional to show "today" or "tomorrow" could go here */ }
// {/* also conditionals to not repeat date if same date - lots of possibilities */ }
// <p className="date">{moment(event.startTime).format('ddd M/D')} at {moment(event.startTime).format('h:mm a')}</p>
// {
// event.endTime != null &&
//   <p className="date">{moment(event.endTime).format('- ddd M/D')} at {moment(event.endTime).format('h:mm a')}</p>
// }
