import React, { Component } from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import history from '../history';
import Cookies from 'universal-cookie';
// import { read_cookie } from 'sfcookies';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: history.location.pathname,
        }
    }

    render() {
        const cookies = new Cookies();
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
                            href={(typeof cookies.get('access_token') !== 'undefined') ? "/newrelease" : ""}
                            className={( typeof cookies.get('access_token') !== 'undefined') ? '' : 'disabled'}
                        >
                            New Release
                        </NavItem>
                        <NavItem 
                            eventKey='/artist'
                            href={(typeof cookies.get('access_token') !== 'undefined') ? "/artist" : ""}
                            className={(typeof cookies.get('access_token') !== 'undefined') ? '' : 'disabled'}
                        >
                            Artist Search
                        </NavItem>
                        <NavItem 
                            eventKey='/song'
                            href={(typeof cookies.get('access_token') !== 'undefined') ? "/song" : ""}
                            className={(typeof cookies.get('access_token') !== 'undefined') ? '' : 'disabled'}
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