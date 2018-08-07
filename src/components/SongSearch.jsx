import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import { read_cookie } from 'sfcookies';
import SongResult from './SongResult';

class SongSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            tracks: null
        }
    }

    search() {
        const accessToken = read_cookie('access_token');
        const BASE_URL = 'https://api.spotify.com/v1/search';
        const FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=track`
        const FETCH_HEADER = new Headers({
            Accept: "application/json",
            Authorization: 'Bearer ' + accessToken
        });
        fetch(FETCH_URL, {
            method: 'GET',
            headers: FETCH_HEADER
        })
        .then(response => response.json())
        .then(json => {
            const tracks = json.tracks.items;
            // console.log(tracks);
            this.setState({tracks});
        })
    }

    render() {
        return (
            <div className='App'>
                <div className='App-title'>
                    Song Search
                </div>
                <br />
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            text='text'
                            placeholder='search for a song'
                            query={this.state.query}
                            onChange={event => { this.setState({ query: event.target.value }) }}
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
                    this.state.tracks !== null
                        ? 
                        <div>
                            <SongResult 
                                tracks={this.state.tracks}
                            />
                        </div>
                        : <div></div>
                }
            </div>
        )
    }
}

export default SongSearch;