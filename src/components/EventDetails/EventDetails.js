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

    dispatchPublish=(eventId)=> {
        this.props.dispatch({type: 'SET_PUBLISHED', payload: {id: eventId}});
    }

    //display the events that are stored in redux state and on props:
    render() {
        return (
            <section className="EventDetails">
                <button onClick={this.backToMain}>back home</button>
                <p>this is where event details will go for event with id {this.props.match.params.eventId}</p>
                {this.props.user.id 
                ?
                <div className="actionButtons">
                    {/* have a conditional based on whether event is published or not */}
                    <button onClick={()=>this.dispatchPublish(this.props.match.params.eventId)}>publish</button>
                    {/* eventually make this a link to an edit page - this is for mvp */}
                    <button>delete</button>
                </div>
                :
                <p>admins can edit, delete, or publish events. link to login?</p>
                }
            </section>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({ events: reduxState.event, user: reduxState.user })
export default connect(putReduxStateOnProps)(EventDetails);
