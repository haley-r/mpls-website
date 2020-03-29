import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventFormPage1 extends Component {
    //go to next page in event form
    goToNextPage=()=>{
        this.props.history.push('/post-event-2');
    }

    //display the events that are stored in redux state and on props:
    render() {
        return (
            <section className="disclaimer">
                <p className="info">mpls.website is more like a community bulletin board than other event sites. It's a simple tool for finding each other.</p>
                <p className="info">When posting an event, think of it like posting a flyer. Include all necessary information, and a way for attendees to find updates or more details.</p>
                <h2>Events must be:</h2>
                    <h3>Open to the public</h3> 
                        <p className="sidenote">It would be okay, in some situations, to ask that participants be of a certain age, or self-identify in a certain way</p>
                    <h3>Non-commercial</h3>
                        <p className="sidenote">Not necessarily free- just not at a large venue or sponsored by a big company.</p>
                    <h3>Local(ish)</h3>
                        <p className="sidenote">No strict boundary - especially since we're in a new age of virtual events - but the closer to Minneapolis, the better.</p>
                    <h3>Not Terrible</h3>
                        <p className="sidenote">Though admins expect people to use their best judgement before attending or hosting an event, they will not publish anything clearly unsafe or unwelcoming.</p>
                    <h4>Admins will approve posts on the above requirements. It may take a few days!</h4>  
                    <button onClick={this.goToNextPage} className="got-it">Got It!</button>             
            </section>
        )
    }
}
export default connect()(EventFormPage1);
