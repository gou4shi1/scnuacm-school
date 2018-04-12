import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import newPage from '../../ui/pages/newPage';
import showPage from '../../ui/pages/showPage';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <div>
            <Route path="/new" component={newPage}/>
            <Route path="/show" component={showPage}/>
        </div>
    </Router>
);
