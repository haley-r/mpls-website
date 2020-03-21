import React, { Component } from 'react';
import { connect } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class EventBoard extends Component{
//upon mounting it will GET all events
componentDidMount=()=>{
  this.props.dispatch({type:'FETCH_EVENTS'})
}



//local state will hold search input/parameters
render(){
  return( 
    <section className="EventBoard">
      {this.props.events[0] &&
        this.props.events.map((eventObject)=>
          <li key={eventObject.id}>{eventObject.title}</li>
        )
      }
    </section>
  )
}
}

const putReduxStateOnProps = (reduxState) => ({events: reduxState.event})
export default connect(putReduxStateOnProps)(EventBoard);
