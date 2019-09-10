import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from '../components/routing/Routes';
import Landing from './layout/Landing';
import Navbar from './layout/Navbar';
import Alert from './layout/Alert';
import Footer from './layout/Footer';
import './css/style.css';

import { loadUser } from '../actions';
import store from '../store';
import { Provider } from 'react-redux';
import setAuthToken from '../utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className='container'>
            <Navbar />
            <Alert />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route component={Routes} />
            </Switch>
            <Footer />
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
