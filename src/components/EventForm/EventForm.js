import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class EventForm extends Component {
    //local state will hold input values for all fields
    state = {
        mode: 'enter',
        input:{
            name: '',
            shortDescription: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            location: '',
            fullDescription: '',
            posterLink: '',
            updates: '',
            hostContact: '',
            hostContactPublic: false
            }
    }

    //dispatch with bundled input values object (this.state) as payload
    createEvent = (event) => {
        //prevent form reload upon submission
        event.preventDefault();
        //if the reducer isn't holding the event, dispatch it
        // if (this.props.tempEvent.name!==this.state.name){
        //     console.log('the reducer is not holding the input');
        //     //dispatch post action
        //     this.props.dispatch({ type: 'STAGE_EVENT', payload: this.state })
        // }
        //if the reducer is holding the event, go to the next event
        //not sure if state needs to be cleared
        // this.props.history.push('/post-event-3');
    
        this.setState({mode: 'review'})

        //reset state
        // this.setState({
        //     name: '',
        //     shortDescription: '',
        //     startDate: '',
        //     startTime: '',
        //     endDate: '',
        //     endTime: '',
        //     location: '',
        //     fullDescription: '',
        //     posterLink: '',
        //     updates: '',
        //     hostContact: '',
        //     hostContactPublic: false
        // })
       
        // this.props.history.push('/post-event-3');
    }

    //track input in various fields based on type
    handleInput = (event, type) => {
        this.setState({
            input:{
                ...this.state.input,
                [type]: event.target.value
            }            
        })
    }

    //display the events that are stored in redux state and on props:
    render() {
        return (
            <div className="createEvent">
                {this.state.mode==="enter" &&
                <section className="enterEvent">
                    <h2>fill in these details!</h2>
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
                }
                {this.state.mode==="review" &&
                    <section className="reviewEvent">
                    <h2>does this look right?</h2>
                    <h1>{this.state.input.name}</h1>
                    <h2>{this.state.input.shortDescription}</h2>
                    <p>{this.state.input.fullDescription}</p>

                    <p>{this.state.input.location}</p>
                    <p className="date">{moment(this.state.input.startDate).format('ddd M/D')} at
                    <p>{moment(this.state.input.startTime, 'HH:mm:ss').format('h:mm a')}</p>
                    </p>
                    {this.state.input.endTime != null &&
                        <p className="date">{moment(this.state.input.endDate).format('- ddd M/D')} at
                    <p>{moment(this.state.input.startTime, 'HH:mm:ss').format('h:mm a')}</p>
                    </p>
                    }
                    {this.state.input.posterLink !== '' &&
                        <img src={this.state.input.posterLink} alt="poster would be linked in here with valid url" />
                    }
                    <p>for updates: {this.state.input.updates}</p>

                    {this.state.input.hostContactPublic &&
                        <p>host contact: {this.state.input.hostContact}</p>
                    }
                    </section>
                }
            </div>
        )
    }
}
const putReduxStateOnProps = (reduxState) => ({ tempEvent: reduxState.tempEvent })
export default connect(putReduxStateOnProps)(EventForm);
