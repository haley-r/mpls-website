import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


class EventDetails extends Component {
    // upon mounting it will GET details for the single event at the id in the route
    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_DETAILS', payload: { eventId: this.props.match.params.eventId, user: false } });
        this.props.dispatch({ type: 'FETCH_IDS', payload: { eventId: this.props.match.params.eventId, user: false } }) 
        this.props.dispatch({ type: 'FETCH_TAGS', payload: { eventId: this.props.match.params.eventId, user: false } });
    }
    adminMode = () => {
        this.props.history.push(`/admin/details/${this.props.match.params.eventId}`)
        this.props.dispatch({ type: 'FETCH_DETAILS', payload: { eventId: this.props.match.params.eventId, user: true } })
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
        this.props.history.push(`/details/${this.props.ids.idArray[this.props.ids.currentIndex-1]}`);
        window.location.reload(false);
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
                <div className="border-div">
                    {this.props.details.name 
                        ?
                        <article className="Details">
                            <h1>{this.props.details.name}</h1>
                            <h2>{this.props.details.shortDescription}</h2>
                                <p className="fullDescription">{this.props.details.fullDescription}</p>
                                <p className="location">{this.props.details.location}</p>
                                <p className="date">Start: {moment(this.props.details.startTime).format('ddd M/D')} at {moment(this.props.details.startTime).format('h:mm a')}</p>
                                <p className="date">End: {moment(this.props.details.endTime).format('ddd M/D')} at {moment(this.props.details.endTime).format('h:mm a')}</p>
                                {this.props.details.posterLink !== '' &&
                                    <img src={this.props.details.posterLink} alt="poster would be linked in here with valid url" />
                                }
                                {this.props.details.updates &&
                                    <>
                                    <h3>Updates</h3>
                                    <p className="additionalInfo">{this.props.details.updates}</p>
                                    </>
                                }
                                {this.props.details.hostContactPublic &&
                                    <>
                                    <h3>Host Contact</h3>
                                    <p className="additionalInfo">host contact: {this.props.details.hostContact}</p>
                                    </>
                                }
                                {/* <h3>TAGS:</h3>
                                {JSON.stringify(this.props.tags)} */}
                        </article>
                        :
                        <article className="no-details">
                            <h2>There doesn't seem to be anything here.</h2>
                            <p>Log in and go to the admin dashboard if you are trying to see an unpublished or archived event.</p>
                        </article>
                    }
                </div>
                {this.props.ids.currentIndex>0 &&
                    <button onClick={this.earlierEvent} className="left-button chevron"><ChevronLeftIcon/></button>
                }
                    <button onClick={this.laterEvent} className="right-button chevron"><ChevronRightIcon/></button>

                <button onClick={this.backToMain} className="back-button">Back To Main Page</button>
                {this.props.user.id &&
                    <button onClick={this.adminMode} className="admin-button">View As Admin</button>
                }
            </section>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({ details: reduxState.details, user: reduxState.user, ids: reduxState.ids, tags: reduxState.tags })
export default connect(putReduxStateOnProps)(EventDetails);
