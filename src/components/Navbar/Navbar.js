import React from 'react';
import classNames from 'classnames';
import { NavLink as Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-solid-svg-icons';
import styles from './Navbar.module.scss';

const linkClass = classNames(
    styles.link,
    'd-flex',
    'd-lg-block',
    'align-items-center'
);
const iconClass = classNames(
    styles.icon,
    'mr-2',
    'mx-lg-auto',
    'mb-lg-1',
    'd-lg-block'
);

const CustomNavbar = () => (
    <Navbar
        collapseOnSelect
        bg="white"
        variant="light"
        expand="lg"
        className={styles.root}
    >
        <Container>
            <Navbar.Brand
                as={Link}
                to="/"
                className={classNames('d-flex', 'align-items-center')}
            >
                <h4
                    className={classNames(
                        'd-inline',
                        'm-0',
                        'ml-2',
                        'text-primary'
                    )}
                >
                    My App
                </h4>
            </Navbar.Brand>
            <Navbar.Toggle label="Toggle Navbar" aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/user" className={linkClass}>
                        <FontAwesomeIcon
                            icon={faUser}
                            fixedWidth
                            className={iconClass}
                        />
                        User
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

export default CustomNavbar;
