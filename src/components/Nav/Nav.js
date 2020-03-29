import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="Nav">
      {props.user.id && <LogOutButton className="nav-link" />}
      <Link className="nav-link" to="/admin">Admin</Link>
      <Link className="nav-link" to="/post-event-1">Make Event Post</Link>
  </div>
);

//redux state holds user- if there's a user, show logout option
const mapStateToProps = state => ({user: state.user});

export default connect(mapStateToProps)(Nav);
