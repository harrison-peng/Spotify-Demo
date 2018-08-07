import React, { Component } from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import history from '../history';
import { read_cookie } from 'sfcookies';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: history.location.pathname,
        }
    }

    render() {
        return (
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/index"><strong>Spotify Demo</strong></a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav activeKey={this.state.active}>
                        <NavItem 
                            eventKey='/newrelease' 
                            href={(read_cookie('access_token') !== null) ? "/newrelease" : ""}
                            onClick={() => {this.setState({active: 1})}}
                            className={(read_cookie('access_token') !== null) ? '' : 'disabled'}
                        >
                            New Release
                        </NavItem>
                        <NavItem 
                            eventKey='/artist'
                            href={(read_cookie('access_token') !== null) ? "/artist" : ""}
                            className={(read_cookie('access_token') !== null) ? '' : 'disabled'}
                        >
                            Artist Search
                        </NavItem>
                        <NavItem 
                            eventKey='/song'
                            href={(read_cookie('access_token') !== null) ? "/song" : ""}
                            className={(read_cookie('access_token') !== null) ? '' : 'disabled'}
                        >
                            Song Search
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem disabled>
                            created by <em>Harrison</em>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar;