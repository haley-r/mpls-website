import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class EventDetails extends Component {
    // upon mounting it will GET details for the single event at the id in the route
    backToMain = () => {
        this.props.history.push('/');
    }
    backToForm = () => {
        this.props.history.push('/post-event-2');
    }
    editEvent = () => {
        this.props.history.push('/post-event-edit');
    }
    postEvent=()=>{
        //post the event to the database
        this.props.dispatch({ type: 'POST_EVENT', payload: this.props.tempEvent})
        //go to the confirmation page
        this.props.history.push('/post-event-4');
    }

    //display the events that are stored in redux state and on props:
    render() {
        return (
            <div className="review">
                {this.props.tempEvent.name ?
                    <section className="EventDetails">
                    <h2>does this look right?</h2>
                    <h1>{this.props.tempEvent.name}</h1>
                    <h2>{this.props.tempEvent.shortDescription}</h2>
                    <p>{this.props.tempEvent.fullDescription}</p>

                    <p>{this.props.tempEvent.location}</p>
                    <p className="date">{moment(this.props.tempEvent.startDate).format('ddd M/D')} at {moment(this.props.tempEvent.startTime, 'HH:mm:ss').format('h:mm a')}</p>
                    {this.props.tempEvent.endTime != null &&
                        <p className="date">{moment(this.props.tempEvent.endDate).format('- ddd M/D')} at {moment(this.props.tempEvent.endTime, 'HH:mm:ss').format('h:mm a')}</p>}
                    {this.props.tempEvent.posterLink !== '' &&
                        <img src={this.props.tempEvent.posterLink} alt="poster would be linked in here with valid url" />
                    }
                    <p>for updates: {this.props.tempEvent.updates}</p>

                    {this.props.tempEvent.hostContactPublic &&
                        <p>host contact: {this.props.tempEvent.hostContact}</p>
                    }
                    <button onClick={this.editEvent}>Edit</button>
                    <button onClick={this.postEvent}>Looks Good!</button>
                </section>
                :
                <section className="eventError">
                    <p>No new event information is in our system.</p>
                    <p>Please go back to the form and try again.</p>
                    <button onClick={this.backToForm}>Back to Form</button>
                </section>
                }
            </div>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({ tempEvent: reduxState.tempEvent})
export default connect(putReduxStateOnProps)(EventDetails);
