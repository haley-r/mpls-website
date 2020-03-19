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
      mpls.website is a community-led website. admins share the responsibility of verifying that posts are complete, local, non-commercial, and open to all. if you have concerns or questions or are interested in becoming an admin, feel free to reach out at ____________@_________
    </p>
  </div>
);

export default EventBoard;
