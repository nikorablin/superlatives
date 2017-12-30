import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import Admin from './components/Admin';

const Routes = props => (
  <BrowserRouter {...props}>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/admin" component={Admin} />
    </div>
  </BrowserRouter>
);

export default Routes;
