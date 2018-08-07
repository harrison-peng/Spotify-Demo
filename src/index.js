import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route } from 'react-router-dom';
import history from './history';
import reducer from './reducers';
import * as request from 'request';
import { bake_cookie} from 'sfcookies';

import ArtistSearch from './components/ArtistSearch';
import Index from './components/Index';
import NavBar from './components/NavBar';
import NewRelease from './components/NewRelease';
import { addAccessToken } from './actions';
import SongSearch from './components/SongSearch';

const store = createStore(reducer);

const CLIENT_ID = 'f053c818674a49ecb2312b20bf03a14c';
const CLIENT_SECRET = '88a3673d1f8b469383fdf7bb4b6bd954';

const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Access-Control-Allow-Origin': 'https://spotify-demo-by-harrison.herokuapp.com/',
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'POST',
        'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

request.post(authOptions, function (error, response, body) {
    bake_cookie('access_token', body.access_token);
    store.dispatch(addAccessToken(body.access_token));
});

if (history.location.pathname === '/') {
    history.push('/index');
}

ReactDOM.render(
    <Provider store={store}>
        <Router path='/' history={history}>
            <div>
                <NavBar/>
                <Route path='/index' component={Index}></Route>
                <Route path='/newrelease' component={NewRelease}></Route>
                <Route path='/artist' component={ArtistSearch}></Route>
                <Route path='/song' component={SongSearch}></Route>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);