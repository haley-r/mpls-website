import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventConfirmation extends Component {
    // upon mounting it will GET details for the single event at the id in the route
    backToMain = () => {
        this.props.history.push('/');
    }


    // UNSTAGE_EVENT
    backToForm = () => {
        this.props.history.push('/post-event-2');
    }
    editEvent = () => {
        this.props.history.push('/post-event-edit');
    }
    postEvent = () => {
        //post the event to the database
        this.props.dispatch({ type: 'POST_EVENT', payload: this.props.tempEvent })
        //go to the confirmation page
        this.props.history.push('/post-event-4');
    }

    //display the events that are stored in redux state and on props:
    render() {
        return (
            <section className="confirmation">
               <p>{this.props.confirmationMessage}</p>
            </section>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({ confirmationMessage: reduxState.confirmation })
export default connect(putReduxStateOnProps)(EventConfirmation);
