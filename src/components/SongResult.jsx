import React, { Component } from 'react';

class SongResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playingUrl: '',
            audio: null,
            playing: false
        }
    }

    playAudio(previewUrl) {
        // console.log(this.state);
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
        const { tracks } = this.props;
        return (
            <div className='App'>
                <div className='App-title'>
                    Results
                </div>
                <br/>
                {
                    tracks.map((track, k) => {
                        const {artists} = track;
                        return (
                            <div
                                key={k}
                                className='track'
                                onClick={() => this.playAudio(track.preview_url)}
                            >
                                <img
                                    src={track.album.images[0].url}
                                    className='track-img'
                                    alt='track'
                                />
                                <div className='track-play'>
                                    <div className='track-play-inner'>
                                        {
                                            this.state.playingUrl === track.preview_url
                                                ? <span>| |</span>
                                                : <span>&#9654;</span>
                                        }
                                    </div>
                                </div>
                                <p className='track-text'>
                                    {track.name} -&nbsp;
                                    {
                                        artists.map((artist, i) => {
                                            if (artists.length === i + 1) { return (artist.name) }
                                            else { return (`${artist.name} & `) }
                                        })
                                    }
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SongResult;