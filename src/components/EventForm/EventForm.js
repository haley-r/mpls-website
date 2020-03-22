import React, { Component } from 'react';
// import { connect } from 'react-redux';

class EventForm extends Component {
    //local state will hold input values

    //dispatch with bundled input values objext
    createEvent = () => {
        this.props.dispatch({type: 'POST_EVENT', payload: {title: 'fake title for test'}})
    }

    //display the events that are stored in redux state and on props:
    render() {
        return (
            <section className="submitEvent">
                <h2>fill in these deets!</h2>
                <form onSubmit={this.createEvent}>
                    <input placeholder="name of event"/>
                    <input
                        className="log-in"
                        type="submit"
                        name="submit"
                        value="submit event"
                    />

                </form>
            </section>
        )
    }
}
export default EventForm;