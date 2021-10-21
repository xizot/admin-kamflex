import React from 'react';
import { Redirect } from 'react-router';

function Home() {
  return <Redirect to="/movie-manager" />;
}

export default Home;
