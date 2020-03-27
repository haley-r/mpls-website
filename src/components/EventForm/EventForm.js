import React, { Component } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import EventFormPage1 from '../EventFormPage1/EventFormPage1';
import EventFormPage2 from '../EventFormPage2/EventFormPage2';



class EventForm extends Component {
    state = {
        currentPage: 1
    }

    //display the events that are stored in redux state and on props:
    render() {
        return (
            <section className="submitEvent">
                {this.state.currentPage === 1 && <EventFormPage1/>}
                {this.state.currentPage === 2 && <EventFormPage2 />}
                {/* {this.state.currentPage === 3 && <EventFormPage3 />}
                {this.state.currentPage === 4 && <EventFormPage4 />} */}
            </section>
        )
    }
}
export default connect()(EventForm);
