import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { MongoClient } from 'mongodb';

import history from './utils/history';
import reducers from './reducers';
import Routes from './router';
import mongoose from 'mongoose';
import './seeds';

const url = 'mongodb://localhost:27017';
const dbName = 'upstar_music';

mongoose.Promise = Promise;

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store} history={history}>
      <Routes />
    </Provider>
  );
};

MongoClient.connect(url, function(err, client) {
  window.db = client.db(dbName);

  mongoose.connect('mongodb://localhost/upstar_music');
  mongoose.connection
    .once('open', () => {
      ReactDOM.render(<App />, document.getElementById('root'));
    })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});
