import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class EventDetails extends Component {
    // upon mounting it will GET details for the single event at the id in the route
    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_DETAILS', payload: { eventId: this.props.match.params.eventId, user: false } });
        this.props.dispatch({ type: 'FETCH_IDS', payload: { eventId: this.props.match.params.eventId, user: false } }) 

    }
    backToMain =()=> {
        this.props.history.push('/');
    }
    dispatchPublish=(eventId)=> {
        this.props.dispatch({type: 'SET_PUBLISHED', payload: {id: eventId}});
    }
    dispatchDelete = (eventId) => {
        this.props.dispatch({ type: 'DELETE_SELECTED', payload: { id: eventId } });
    }

    earlierEvent=()=>{
        if (this.props.ids.currentIndex===0){
            alert('no earlier events');
        }
        else{
        this.props.history.push(`/details/${this.props.ids.idArray[this.props.ids.currentIndex-1]}`);
        window.location.reload(false);
        }
    }

    laterEvent=()=>{
        if (this.props.ids.currentIndex+1 === this.props.ids.idArray.length) {
            alert('no later events');
        }
        else {
            this.props.history.push(`/details/${this.props.ids.idArray[this.props.ids.currentIndex + 1]}`);
            window.location.reload(false);
        }
    }

    //display the events that are stored in redux state and on props:
    render() {
        return (
            <section className="EventDetails">
                <button onClick={this.backToMain}>back home</button>
                {this.props.details.name 
                    ?
                    <article className="Details">
                        <h1>{this.props.details.name}</h1>
                        <h2>{this.props.details.shortDescription}</h2>
                        <p>{this.props.details.fullDescription}</p>

                        <p>{this.props.details.location}</p>
                        <p className="date">{moment(this.props.details.startTime).format('ddd M/D')} at {moment(this.props.details.startTime).format('h:mm a')}</p>
                        {this.props.details.endTime != null &&
                            <p className="date">{moment(this.props.details.endTime).format('- ddd M/D')} at {moment(this.props.details.endTime).format('h:mm a')}</p>
                        }
                        {this.props.details.posterLink !== '' &&
                            <img src={this.props.details.posterLink} alt="poster would be linked in here with valid url" />
                        }
                        <p>for updates: {this.props.details.updates}</p>

                        {this.props.details.hostContactPublic &&
                            <p>host contact: {this.props.details.hostContact}</p>
                        }
                        <button onClick={this.earlierEvent}> earlier events </button>
                        <button onClick={this.laterEvent}> later events </button>
                    </article>
                    :
                    <article className="no-details">
                        <h2>There doesn't seem to be anything here.</h2>
                        <p>Log in and go to the admin dashboard if you are trying to see an unpublished or archived event.</p>
                    </article>
                }
            </section>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({ details: reduxState.details, user: reduxState.user, ids: reduxState.ids })
export default connect(putReduxStateOnProps)(EventDetails);
