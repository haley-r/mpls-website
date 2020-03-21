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
                {this.props.admin.published &&
                    <article className="published-events">
                        <h2>Published Events</h2>
                        <p>select 'details' to update or delete</p>
                        {this.props.admin.published[0]
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
                                    {this.props.admin.published.map((event) =>
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
                            <p>no published events retrieved from database</p>
                        }
                    </article>
                }
                {this.props.admin.users &&
                    <article className="users">
                        <h2>Users</h2>
                        <p>select 'update' to manage access</p>
                        <p>only users with access levels below your own can be seen</p>

                        {this.props.admin.users[0]
                            ?
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Access Level</th>
                                        <th>Manage Access</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.admin.users.map((user) =>
                                        <tr key={user.id}>
                                            <td>{user.username}</td>
                                            <td>{user.access_level}</td>
                                            <td><button>update</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            :
                            <p>no users retrieved</p>
                        }
                    </article>
                }
            </section>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({ admin: reduxState.admin })
export default connect(putReduxStateOnProps)(EventBoard);
