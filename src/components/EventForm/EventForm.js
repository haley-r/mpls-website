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
                <h2>fill in these details!</h2>
                <form onSubmit={this.createEvent}>
                    <input onChange={(event)=>this.handleInput(event, 'title')}  placeholder="name of event"/>
                    <input onChange={(event) => this.handleInput(event, 'description')}placeholder="description of event" />
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
export default connect()(EventForm);