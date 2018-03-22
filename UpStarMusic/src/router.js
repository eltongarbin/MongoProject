import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import ArtistMain from './components/artists/ArtistMain';
import ArtistDetail from './components/artists/ArtistDetail';
import ArtistCreate from './components/artists/ArtistCreate';
import ArtistEdit from './components/artists/ArtistEdit';

const Routes = () => {
  return (
    <HashRouter>
      <div className="container">
        <Header />
        <Route exact path="/" component={ArtistMain} />
        <Switch>
          <Route exact path="/artists/new" component={ArtistCreate} />
          <Route exact path="/artists/:id" component={ArtistDetail} />
          <Route exact path="/artists/:id/edit" component={ArtistEdit} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default Routes;
