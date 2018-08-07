import React, { Component } from 'react';
import '../App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import { read_cookie } from 'sfcookies';
import Profile from './Profile';
import Gallery from './Gallery';
import NavBar from './NavBar';

class ArtistSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            query: '',
            artist: null,
            tracks: []
        }
    }

    search() {
        const accessToken = read_cookie('access_token');
        const BASE_URL = 'https://api.spotify.com/v1/search';
        let FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        const FETCH_HEADER = new Headers({
            Accept: "application/json",
            Authorization: 'Bearer ' + accessToken
        });
        // console.log('FETCH_URL', FETCH_URL);
        fetch(FETCH_URL, {
            method: 'GET',
            headers: FETCH_HEADER
        })
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            this.setState({artist});
            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=TW&`

            fetch(FETCH_URL, {
                method: 'GET',
                headers: FETCH_HEADER
            })
            .then(response => response.json())
            .then(json => {
                // console.log('artist\'s top tracks:', json);
                const {tracks} = json;
                this.setState({tracks});
            })
        });
    }

    render() {
        return (
            <div className='App'>
                <NavBar/>
                <div className='App-title'>
                    Artist Search
                </div>
                <br/>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            text='text'
                            placeholder='search for an artist'
                            query={this.state.query}
                            onChange={event => {this.setState({query: event.target.value})}}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search()
                                }
                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph='search'></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                    ?
                    <div>
                        <br/>
                        <Profile
                            artist={this.state.artist}
                        />
                        <br/>
                        <Gallery
                            tracks={this.state.tracks}
                        />
                    </div>
                    :<div></div>
                }
            </div>
        )
    }
}

export default ArtistSearch;