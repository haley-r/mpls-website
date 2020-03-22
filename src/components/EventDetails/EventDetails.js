import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventDetails extends Component {
    //upon mounting it will GET all published events (unprotected route)
    // componentDidMount = () => {
    //     this.props.dispatch({ type: 'FETCH_EVENTS' })
    // }

    backToMain =()=> {
        this.props.history.push('/');
    }

    //display the events that are stored in redux state and on props:
    render() {
        return (
            <section className="EventDetails">
                <button onClick={this.backToMain}>back home</button>
                <p>this is where event details will go for event with id {this.props.match.params.eventId}</p>
            </section>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({ events: reduxState.event })
export default connect(putReduxStateOnProps)(EventDetails);
