import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PriorityHighOutlinedIcon from '@material-ui/icons/PriorityHighOutlined';

class EventBoard extends Component {
    //local state will hold search parameters, if search is implemented

    //upon mounting it will GET all unpublished/published events and users
    //which will be stored in the redux store and accessed via props
    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_DASHBOARD' })
    }

    goToDetails = (eventId) => {
        console.log('hey, in goToDetails with event id:', eventId);
        this.props.history.push(`admin/details/${eventId}`);
    }

    //display the information
    render() {
        return (
            <section className="AdminDashboard">
                {this.props.admin.unpublished &&
                <div className="border-div">
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
                                        <th>Details</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.admin.unpublished.map((event)=>
                                        <tr key={event.id}>
                                            <td>{event.name}</td>
                                            <td>{moment(event.startTime).format('M/D/YY')}</td>
                                            <td><button onClick={() => this.goToDetails(event.id)}>details...</button></td>
                                            <td className="flagbox">
                                                {event.flagged && <PriorityHighOutlinedIcon/>}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            :
                            <p>no unpublished events retrieved from database</p>
                        }
                    </article>
                </div>
                }
                {this.props.admin.published &&
                    <div className="border-div">
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
                                        <th>Details</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.admin.published.map((event) =>
                                        <tr key={event.id}>
                                            <td>{event.name}</td>
                                            <td>{moment(event.startTime).format('M/D')}</td>
                                            <td><button onClick={() => this.goToDetails(event.id)}>details...</button></td>
                                            <td className="flagbox">
                                                {event.flagged && <PriorityHighOutlinedIcon />}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            :
                            <p>no published events retrieved from database</p>
                        }
                    
                    </article>
                </div>
                }
                {/* {this.props.admin.users &&
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
                } */}
            </section>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({ admin: reduxState.admin })
export default connect(putReduxStateOnProps)(EventBoard);
