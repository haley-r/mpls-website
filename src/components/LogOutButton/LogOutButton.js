import React from 'react';
import { connect } from 'react-redux';

const LogOutButton = props => (
  <button className="logoutButton" onClick={() => props.dispatch({ type: 'LOGOUT' })}>
    Log Out
  </button>
);

export default connect()(LogOutButton);
