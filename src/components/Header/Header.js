import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Header extends Component{
  state = {
    aboutClass: 'hide',
    buttonText: 'about'
  }

  toggleAbout=()=>{
    if (this.state.aboutClass==='show'){this.setState({aboutClass: 'hide', buttonText: 'about'})}
    else { this.setState({ aboutClass: 'show', buttonText: 'close' }) }

  }

  render() {
    return (
  <header className="Header" >
    <Link to="/home"><h1 id="site-title">mpls.website</h1></Link>
        <p className={this.state.aboutClass}>
      mpls.website is a place to find public events to attend (virtually or otherwise), small businesses and artists to support, and other things that you might see on the bulletin board of a cafe.
    </p>
    <button onClick={this.toggleAbout} id="about-button">{this.state.buttonText}</button>
  </header>
    )
  }
}

export default Header;

