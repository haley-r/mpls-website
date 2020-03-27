import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class EventDetails extends Component {
    // upon mounting it will GET details for the single event at the id in the route
    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_DETAILS', payload: this.props.match.params.eventId })
    }
    backToMain = () => {
        this.props.history.push('/');
    }
    dispatchPublish = (eventId) => {
        this.props.dispatch({ type: 'SET_PUBLISHED', payload: { id: eventId } });
    }
    dispatchDelete = (eventId) => {
        this.props.dispatch({ type: 'DELETE_SELECTED', payload: { id: eventId } });
    }

    //display the events that are stored in redux state and on props:
    render() {
        return (
            <section className="EventDetails">
                <h1>{this.props.tempEvent.name}</h1>
                <h2>{this.props.tempEvent.shortDescription}</h2>
                <p>{this.props.tempEvent.fullDescription}</p>

                <p>{this.props.tempEvent.location}</p>
                <p className="date">{moment(this.props.tempEvent.startTime).format('ddd M/D')} at {moment(this.props.tempEvent.startTime).format('h:mm a')}</p>
                {this.props.tempEvent.endTime != null &&
                    <p className="date">{moment(this.props.tempEvent.endTime).format('- ddd M/D')} at {moment(this.props.tempEvent.endTime).format('h:mm a')}</p>
                }
                {this.props.tempEvent.posterLink !== '' &&
                    <img src={this.props.tempEvent.posterLink} alt="poster would be linked in here with valid url" />
                }
                <p>for updates: {this.props.tempEvent.updates}</p>

                {this.props.tempEvent.hostContactPublic &&
                    <p>host contact: {this.props.tempEvent.hostContact}</p>
                }
            </section>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({ tempEvent: reduxState.tempEvent})
export default connect(putReduxStateOnProps)(EventDetails);
