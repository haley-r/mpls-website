import React from 'react';
import { Link } from 'react-router-dom';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Header = () => (
  <header className="Header">
    <Link to="/home"><h1 id="site-title">mpls.website</h1></Link>
    <p>
      mpls.website is a place to find public events to attend (virtually or otherwise), small businesses and artists to support, and other things that you might see on the bulletin board of a cafe.
    </p>
  </header>
);

export default Header;
