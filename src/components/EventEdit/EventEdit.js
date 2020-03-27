import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class EventEdit extends Component {
    //local state will hold input values for all fields
    state = {
        name: this.props.tempEvent.name,
        shortDescription: this.props.tempEvent.shortDescription,
        startDate: this.props.tempEvent.startDate,
        startTime: this.props.tempEvent.startTime,
        endDate: this.props.tempEvent.endDate,
        endTime: this.props.tempEvent.endTime,
        location: this.props.tempEvent.location,
        fullDescription: this.props.tempEvent.fullDescription,
        posterLink: this.props.tempEvent.posterLink,
        updates: this.props.tempEvent.updates,
        hostContact: this.props.tempEvent.hostContact,
        hostContactPublic: this.props.tempEvent.hostContactPublic
    }

    //dispatch with bundled input values object (this.state) as payload
    createEvent = (event) => {
        //prevent form reload upon submission
        event.preventDefault();
        //send the state to the reducer
        this.props.dispatch({type:'STAGE_EVENT', payload:this.state});
        //go to next page
        this.props.history.push('/post-event-3');
        //not sure if state needs to be cleared
    }

    //track input in various fields based on type
    handleInput = (event, type) => {
        this.setState({
            [type]: event.target.value        
        })
    }
    //display the events that are stored in redux state and on props:
    render() {
        return (
            <section className="enterEvent">
                <h2>change any field:</h2>
                <form onSubmit={this.createEvent}>
                    <label htmlFor="name-input">Name of Event*<span>short, but specific - max. 50 characters</span></label>
                    <input required type="text" id="name-input"
                        value={this.state.name} onChange={(event) => this.handleInput(event, 'name')} />
                    <label htmlFor="short-description-input">Short Description<span>to display on home page - max. 50 characters</span></label>
                    <input type="text" id="short-description-input" maxLength="50"
                        value={this.state.shortDescription} onChange={(event) => this.handleInput(event, 'shortDescription')} />
                    <label htmlFor="start-datetime-input">Start Time*</label>
                    <input required id="start-date-input" type="date" className="datetime-input"
                        value={this.state.startDate} onChange={(event) => this.handleInput(event, 'startDate')} />
                    <input required id="start-time-input" type="time" className="datetime-input"
                        value={this.state.startTime} onChange={(event) => this.handleInput(event, 'startTime')} />
                    <label htmlFor="end-datetime-input">End Time</label>
                    <input required id="end-date-input" type="date" className="datetime-input"
                        value={this.state.endDate} onChange={(event) => this.handleInput(event, 'endDate')} />
                    <input required id="end-time-input" type="time" className="datetime-input"
                        value={this.state.endTime} onChange={(event) => this.handleInput(event, 'endTime')} />
                    <label htmlFor="location">Location*<span>name of a place, street address, or URL</span></label>
                    <input required type="text" id="location"
                        value={this.state.location} onChange={(event) => this.handleInput(event, 'location')} />
                    <label htmlFor="full-description">Description*<span>use the description to describe the event (obviously) as well as how to attend and any other important information such as age appropriateness or capacity</span></label>
                    <textarea required type="text" id="full-description"
                        value={this.state.fullDescription} onChange={(event) => this.handleInput(event, 'fullDescription')} />
                    <label htmlFor="poster-link">Link to Poster<span>upload image on another site, then link to it here.</span></label>
                    <input type="text" id="poster-link"
                        value={this.state.posterLink} onChange={(event) => this.handleInput(event, 'posterLink')} />
                    <label htmlFor="updates">Where to Check for Updates<span>not required, but recommended</span></label>
                    <input type="text" id="updates"
                        value={this.state.updates} onChange={(event) => this.handleInput(event, 'updates')} />
                    <label htmlFor="host-contact">Host Contact Information<span>not required, but recommended. admins might use this to ask a clarifying question before publishing a post that would otherwise not be approved. if you check 'OK' below, it will be listed publicly.</span></label>
                    <input type="text" id="host-contact"
                        value={this.state.hostContact} onChange={(event) => this.handleInput(event, 'hostContact')} />
                    <label htmlFor="contact-public">OK to publish contact info?</label>
                    <input type="radio" id="no" name="contact-public" value="false" />
                    <label htmlFor="no" className="radio-label">No</label>
                    <input type="radio" id="yes" name="contact-public" value="true" />
                    <label htmlFor="yes" className="radio-label">Yes</label>
                    <p className="sidenote">*required field</p>
                    <input className="input-button" type="submit" name="submit" value="submit event" />
                </form>
            </section>          
        )
    }
}
const putReduxStateOnProps = (reduxState) => ({ tempEvent: reduxState.tempEvent })
export default connect(putReduxStateOnProps)(EventEdit);
