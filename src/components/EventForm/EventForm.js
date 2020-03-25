import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventForm extends Component {
    //local state will hold input values
    state = {
        title: '',
        description: '',
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
                <form onSubmit={this.createEvent}>
                    <h1>fill in these details!</h1>
                    <p>Since anyone can make an event post without making an account, you won't be able to edit your post after submitting it. Think of it like making a poster to leave around town.</p>
                    <p>An admin will check your post for completion and compliance with general community standards (see 'about') before publishing it.</p>
                        <label htmlFor="name">
                            Name of Event:
                                <input
                                type="text"
                                name="name"
                                placeholder="short but specific event name"
                                value={this.state.username}
                                onChange={(event) => this.handleInput(event, 'title')}
                                />
                        </label>
                        <label htmlFor="date">
                            Date of Event:
                                    <input
                                type="date"
                                name="date"
                                placeholder="short but specific event name"
                                value={this.state.username}
                                onChange={(event) => this.handleInput(event, 'title')}
                            />
                        </label>
                        <label htmlFor="time">
                            Time of Event:
                                        <input
                                type="time"
                                name="time"
                                placeholder="short but specific event name"
                                value={this.state.username}
                                onChange={(event) => this.handleInput(event, 'title')}
                            />
                        </label>
                        <label htmlFor="description">
                            Description:
                                <textarea
                                type="text"
                                name="description"
                                placeholder="a description of your event"
                                value={this.state.username}
                                onChange={(event) => this.handleInput(event, 'description')}
                                />
                        </label>



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
