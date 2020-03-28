import React, { Component } from 'react';
import { connect } from 'react-redux';

class EventConfirmation extends Component {
    // upon mounting it will GET details for the single event at the id in the route
    backToMain = () => {
        this.props.history.push('/');
        this.props.dispatch({ type: 'UNSTAGE_EVENT'});
    }

    //display the events that are stored in redux state and on props:
    render() {
        return (
            <section className="confirmation">
                {this.props.confirmationMessage===''
                ?
                <p>There's nothing here. To create an event post, choose 'Create Event Post'</p>
                :
                <p>{this.props.confirmationMessage}</p>
                }
                <button onClick={this.backToMain}>Back to Main Page</button>
            </section>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({ confirmationMessage: reduxState.confirmation })
export default connect(putReduxStateOnProps)(EventConfirmation);
