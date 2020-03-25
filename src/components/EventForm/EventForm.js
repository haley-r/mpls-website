import React, { Component } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';

class EventForm extends Component {
    //local state will hold input values
    state = {
        title: '',
        description: ''
    }

    //dispatch with bundled input values objext
    createEvent = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'POST_EVENT', payload: this.state})
    }

    //track input in various fields based on type
    handleInput =(event, type)=> {
        this.setState({
            [type]: event.target.value
        })
    }

    //display the events that are stored in redux state and on props:
    render() {
        return (
            <section className="submitEvent">
                <h1>fill in these details!</h1>
                <p>Since anyone can make an event post without making an account, you won't be able to edit your post after submitting it. Think of it like making a poster to leave around town.</p>
                <p>An admin will check your post for completion and compliance with general community standards (see 'about') before publishing it.</p>
                    <form onSubmit={this.createEvent}>
                        <label htmlFor="name">Name of Event*<span>short, but specific - 50 characters or less</span></label>
                            <input
                            required
                            type="text"
                            id="name"
                            value={this.state.username}
                            onChange={(event) => this.handleInput(event, 'title')}
                            />
                        
                        <label htmlFor="short-description">Short Description<span>to display on home page - 50 characters or less</span></label>
                            <input
                                type="text"
                                id="short-description"
                                maxLength= "50"
                                value={this.state.username}
                                onChange={(event) => this.handleInput(event, 'title')}
                            />
                        <label htmlFor="datetime-input">Start Time*</label>
                            <input
                                required
                                className="datetime-input"
                                type="date"
                                name="date"
                                placeholder="short but specific event name"
                                value={this.state.username}
                                onChange={(event) => this.handleInput(event, 'title')}
                            />
                            <input
                                required
                                className="datetime-input"
                                type="time"
                                name="time"
                                placeholder="short but specific event name"
                                value={this.state.username}
                                onChange={(event) => this.handleInput(event, 'title')}
                            />
                        <label htmlFor="datetime-input">End Time</label>
                            <input
                                className="datetime-input"
                                type="date"
                                name="date"
                                placeholder="short but specific event name"
                                value={this.state.username}
                                onChange={(event) => this.handleInput(event, 'title')}
                            />
                            <input
                                className="datetime-input"
                                type="time"
                                name="time"
                                placeholder="short but specific event name"
                                value={this.state.username}
                                onChange={(event) => this.handleInput(event, 'title')}
                            />
                        <label htmlFor="location">Location*<span>name of a place, street address, or URL</span></label>
                            <input
                                required
                                type="text"
                                id="location"
                                value={this.state.username}
                                onChange={(event) => this.handleInput(event, 'title')}
                            />
                        <label htmlFor="description">Description*<span>use the description to describe the event (obviously) as well as how to attend and any other important information such as age appropriateness or capacity</span></label>
                            <textarea
                                required
                                type="text"
                                id="description"
                                value={this.state.username}
                                onChange={(event) => this.handleInput(event, 'description')}
                            />
                        <label htmlFor="poster">Link to Poster<span>upload image on another site, then link to it here.</span></label>
                            <input
                                type="text"
                                id="poster"
                                value={this.state.username}
                                onChange={(event) => this.handleInput(event, 'description')}
                            />
                        <label htmlFor="updates">Where to Check for Updates<span>not required, but recommended</span></label>
                            <input
                                type="text"
                                id="updates"
                                value={this.state.username}
                                onChange={(event) => this.handleInput(event, 'description')}
                            />
                        <label htmlFor="host-contact">Your Contact Information<span>not required, but recommended. admins might use this to ask a clarifying question before publishing a post that would otherwise not be approved. if you check 'OK' below, it will be listed publicly.</span></label>
                            <input
                                type="text"
                                id="host-contact"
                                value={this.state.username}
                                onChange={(event) => this.handleInput(event, 'description')}
                            />

                        <label htmlFor="contact-public">OK to publish contact info?</label>
                            <input type="radio" id="no" name="contact-public" value="false"/>
                            <label for="no" className="radio-label">No</label>
                            <input type="radio" id="yes" name="contact-public" value="true" />
                            <label for="yes" className="radio-label">Yes</label>


                        <p className="sidenote">*required field</p>
                        <input
                            className="input-button"
                            type="submit"
                            name="submit"
                            value="submit event"
                        />

                </form>
            </section>
        )
    }
}
export default connect()(EventForm);
