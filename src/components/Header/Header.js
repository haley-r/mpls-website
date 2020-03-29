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
    else { this.setState({ aboutClass: 'show', buttonText: 'events' }) }

  }

  render() {
    return (
  <header className="Header" >
    <Link to="/home"><h1 id="site-title">mpls.website</h1></Link>
        <button onClick={this.toggleAbout} id="about-button">{this.state.buttonText}</button>

        <div className={this.state.aboutClass}>
          <div className="border-div">
          <div className="content-div">
              <p><span className="site-title">mpls.website</span> is a place to find public events to attend (virtually or otherwise).</p>
          <p>Anyone can submit an event, just select 'Make Event Post' to get started.</p>
          </div>
          </div>
        </div>
  </header>
    )
  }
}

export default Header;

