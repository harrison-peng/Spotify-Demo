import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route } from 'react-router-dom';
import history from './history';
import reducer from './reducers';

import ArtistSearch from './components/ArtistSearch';
import Index from './components/Index';
import NewRelease from './components/NewRelease';
import SongSearch from './components/SongSearch';

const store = createStore(reducer);

// const CLIENT_ID = '';
// const CLIENT_SECRET = '';

// const authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Origin': 'https://spotify-demo-by-harrison.herokuapp.com/',
//         'Access-Control-Request-Method': 'POST',
//         'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
//     },
//     form: {
//         grant_type: 'client_credentials'
//     },
//     json: true
// };

// request.post(authOptions, function (error, response, body) {
//     bake_cookie('access_token', body.access_token);
//     store.dispatch(addAccessToken(body.access_token));
// });

if (history.location.pathname === '/') {
    history.push('/index');
}

ReactDOM.render(
    <Provider store={store}>
        <Router path='/' history={history}>
            <div>
                {/* <NavBar/> */}
                <Route path='/index' component={Index}></Route>
                <Route path='/newrelease' component={NewRelease}></Route>
                <Route path='/artist' component={ArtistSearch}></Route>
                <Route path='/song' component={SongSearch}></Route>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);