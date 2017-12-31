import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import Admin from './components/Admin';
import Results from './components/Admin/Results';

const Routes = props => (
  <BrowserRouter {...props}>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/admin/results" component={Results} />
    </div>
  </BrowserRouter>
);

export default Routes;
