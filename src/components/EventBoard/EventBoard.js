import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const EventBoard = () => (
//upon mounting it will GET all events


//local state will hold search input/parameters

  <div>
    <p>
      Here is where i'll display events. it should have a local state, so i should change it to a class component. it's viewable without logging in.
    </p>
  </div>
);

export default EventBoard;
