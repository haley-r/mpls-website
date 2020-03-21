import React, { Component } from 'react';
import { connect } from 'react-redux';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class EventBoard extends Component {
    //upon mounting it will GET all events
    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_DASHBOARD' })
    }



    //local state will hold search input/parameters
    render() {
        return (
            <section className="AdminDashboard">
                {this.props.admin.unpublished &&
                    <article className="unpublished-events">
                        <h2>Unpublished Events</h2>
                        <p>select 'details' to approve or delete</p>

                        {this.props.admin.unpublished[0]
                            ?
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Location</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.admin.unpublished.map((event)=>
                                        <tr key={event.id}>
                                            <td>{event.title}</td>
                                            <td>date</td>
                                            <td>time</td>
                                            <td>{event.location}</td>
                                            <td><button>details...</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            :
                            <p>no unpublished events retrieved from database</p>
                        }
                    </article>
                }
            </section>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({ admin: reduxState.admin })
export default connect(putReduxStateOnProps)(EventBoard);
