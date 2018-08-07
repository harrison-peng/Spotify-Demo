import React, { Component } from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import history from '../history';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: history.location.pathname
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
                            href="/newrelease"
                            onClick={() => {this.setState({active: 1})}}
                        >
                            New Release
                        </NavItem>
                        <NavItem 
                            eventKey='/artist'
                            href="/artist"
                        >
                            Artist Search
                        </NavItem>
                        <NavItem 
                            eventKey='/song'
                            href="/song"
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