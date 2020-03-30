import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class EventDetails extends Component {
    state = {
        commentInput: false,
        inputText: ''
    }
    // upon mounting it will GET details for the single event at the id in the route
    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_DETAILS', payload: {eventId: this.props.match.params.eventId, user: true}})    
        this.props.dispatch({ type: 'FETCH_NOTES', payload: { eventId: this.props.match.params.eventId} })
        this.props.dispatch({ type: 'FETCH_TAGS', payload: { eventId: this.props.match.params.eventId, user: false } });

    }
    backToMain =()=> {
        this.props.history.push('/');
    }
    dispatchPublish=(eventId)=> {
        if (this.props.details.published) {this.props.dispatch({ type: 'SET_PUBLISHED', payload: { id: eventId, setTo: false } });}
        else {this.props.dispatch({type: 'SET_PUBLISHED', payload: {id: eventId, setTo: true}});}
        window.location.reload(false);
    }
    dispatchFlag = (eventId) => {
        if (this.props.details.flagged) { this.props.dispatch({ type: 'SET_FLAGGED', payload: { id: eventId, setTo: false } }); }
        else { this.props.dispatch({ type: 'SET_FLAGGED', payload: { id: eventId, setTo: true } }); }
        window.location.reload(false);
    }
    dispatchDelete = (eventId) => {
        this.props.dispatch({ type: 'DELETE_SELECTED', payload: { id: eventId } });
        this.props.history.push('/admin');
        window.location.reload(false);
    }
    editMode = () => {
        this.props.history.push(`/admin/edit/${this.props.match.params.eventId}`)
    }

    handleInput=(event)=> {
        this.setState({
            inputText: event.target.value
        })
    }

    leaveComment=(inputText)=> {
        this.props.dispatch({ type: 'ADD_NOTE', payload: { id: this.props.match.params.eventId, text: inputText, userId: this.props.user.id }});
        this.setState({commentInput: false, inputText: ''});
        window.location.reload(false);
    }

    showCommentBox=()=>{
        this.setState({commentInput: true})
    }


    //display the events that are stored in redux state and on props:
    render() {
        return (
            <section className="EventDetails">
                <div className="border-div">
                {this.props.details.name 
                    ?
                    <article className="Details">
                        <h1>{this.props.details.name}</h1>
                        <h2>{this.props.details.shortDescription}</h2>
                        <p className="fullDescription">{this.props.details.fullDescription}</p>
                        <p className="location">{this.props.details.location}</p>
                        <p className="date">Start: {moment(this.props.details.startTime).format('ddd M/D')} at {moment(this.props.details.startTime).format('h:mm a')}</p>
                        <p className="date">End: {moment(this.props.details.endTime).format('ddd M/D')} at {moment(this.props.details.endTime).format('h:mm a')}</p>
                        {this.props.details.posterLink !== '' &&
                            <img src={this.props.details.posterLink} alt="poster would be linked in here with valid url" />
                        }
                        {this.props.details.updates &&
                            <>
                                <h3>Updates</h3>
                                <p className="additionalInfo">{this.props.details.updates}</p>
                            </>
                        }
                        {this.props.details.hostContact &&
                            <>
                                <h3>Host Contact</h3>
                                <p className="additionalInfo">host contact: {this.props.details.hostContact}</p>
                            </>
                        }
                    </article>
                    :
                    <article className="no-details">
                        <h2>There doesn't seem to be anything here.</h2>
                        <p>Log in and go to the admin dashboard if you are trying to see an unpublished or archived event.</p>
                    </article>
                }
                </div>
                {this.props.user.id 
                &&
                <div className="actionButtons">
                    {this.props.details.published
                    ?
                        <button onClick={() => this.dispatchPublish(this.props.match.params.eventId)}>uppublish</button>
                    :
                        <button onClick={() => this.dispatchPublish(this.props.match.params.eventId)}>publish</button>
                    }
                    {this.props.details.flagged
                        ?
                        <button onClick={() => this.dispatchFlag(this.props.match.params.eventId)}>unflag</button>
                        :
                        <button onClick={() => this.dispatchFlag(this.props.match.params.eventId)}>flag</button>
                    }
                    <button onClick={this.editMode}>edit</button>
                    <button onClick={() => this.dispatchDelete(this.props.match.params.eventId)}>delete</button>
                    <button onClick={this.showCommentBox}>leave comment</button>
                </div>
                }

                {this.state.commentInput &&
                    <form onSubmit={()=>this.leaveComment(this.state.inputText)} className="note-form">
                        <label htmlFor="note-text" className="hide">Leave a Note:</label>
                        <textarea required type="text" id="note-text"
                            value={this.state.inputText} onChange={this.handleInput} />
                        <input className="input-button" type="submit" name="submit" value="leave note" />
                    </form>
                }
                {this.props.notes[0] &&
                    <>
                    <h2 className="top-h2">Notes:</h2>
                        {this.props.notes.map((note)=>
                            <div className="singleNote">
                                <p><strong>{note.username}:</strong> {note.text}</p>
                                <span className="noteTime">{moment(note.noteTime).calendar()}</span>
                            </div>
                        )}
                    </>
                }
                
            </section>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({ details: reduxState.details, notes: reduxState.notes, user: reduxState.user, tags: reduxState.tags })
export default connect(putReduxStateOnProps)(EventDetails);
