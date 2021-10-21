import React from 'react';
import { Redirect } from 'react-router';

function Home() {
  return <Redirect to="/user-manager" />;
}

export default Home;
