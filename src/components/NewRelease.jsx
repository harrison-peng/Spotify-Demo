import React, { Component } from 'react';
// import { read_cookie } from 'sfcookies';
import Cookies from 'universal-cookie';
import NavBar from './NavBar';

class NewRelease extends Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            playingUrl: '',
            audio: null,
            playing: false
        }
    }

    componentWillMount(previewUrl) {
        const cookies = new Cookies();
        const accessToken = cookies.get('access_token');
        // console.log(accessToken);
        let FETCH_URL = 'https://api.spotify.com/v1/browse/new-releases?country=TW';
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
            console.log(json);
            const albums = json.albums.items;
            albums.map(album => {
                FETCH_URL = `https://api.spotify.com/v1/albums/${album.id}`;
                fetch(FETCH_URL, {
                    method: 'GET',
                    headers: FETCH_HEADER
                })
                .then(response => response.json())
                .then(json => {
                    const {name} = json;
                    const image = json.images[0].url;
                    const artists = json.artists.map(artist => {
                        return artist.name;
                    });
                    const tracks = json.tracks.items.map(track => {
                        return {
                            name: track.name,
                            url: track.preview_url
                        }
                    })
                    const albumObject = {
                        name,
                        image,
                        artists,
                        tracks
                    }
                    this.setState({ albums: [...this.state.albums, albumObject] });
                })
                return '';
            })
        })
    }

    palyMusic(previewUrl) {
        let audio = new Audio(previewUrl);
        if (!this.state.playing) {
            audio.play();
            this.setState({
                playing: true,
                playingUrl: previewUrl,
                audio
            });
        } else {
            if (this.state.playingUrl === previewUrl) {
                this.state.audio.pause();
                this.setState({
                    playing: false,
                    playingUrl: ''
                });
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playing: true,
                    playingUrl: previewUrl,
                    audio
                });
            }
        }
    }

    render() {
        // console.log('state:', this.state.albums.length);
        const {albums} = this.state;
        return(
            <div className='App'>
                <NavBar/>
                <div className='App-title'>
                    New Release
                </div>
                <hr/>
                <div className='album'>
                    {albums.map(((album, k) => {
                            const {name, artists, image, tracks} = album;
                            // console.log(album.name);
                            return (
                                <div key={k} className='album-item'>
                                    <div className='album-left'>
                                        <img
                                            src={image}
                                            className='album-img'
                                            alt='track'
                                        />
                                        <p className='album-name'>
                                            {name} /&nbsp;
                                        {
                                                artists.map((artist, i) => {
                                                    if (artists.length === i + 1) { return (artist) }
                                                    else { return (`${artist} & `) }
                                                })
                                            }
                                        </p>
                                    </div>
                                    <div className='album-track'>
                                        {
                                            tracks.map((track, k) => {
                                                return (
                                                    <div key={k} className='album-track-item'>
                                                        <div 
                                                            className='album-track-play'
                                                            onClick={() => this.palyMusic(track.url)}    
                                                        >
                                                            {
                                                                track.url === null
                                                                    ? <span>&#9654;</span>
                                                                    : (this.state.playingUrl === track.url
                                                                        ? <span>| |</span>
                                                                        : <span>&#9654;</span>)
                                                            }
                                                        </div>
                                                        &nbsp;&nbsp;&nbsp;{track.name}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        }))}
                </div>
            </div>
        )
    }
}

export default NewRelease;