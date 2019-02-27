import React, { useState } from 'react';
import { number, func } from 'prop-types';
import classNames from 'classnames';
import { NavLink as Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faQuestionCircle } from '@fortawesome/pro-solid-svg-icons';
import { About } from '../../pages';
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

const CustomNavbar = ({ round, score, handleNewGame }) => {
    const [showAboutModal, setShowAboutModal] = useState(false);
    const handleShowAboutModal = () => setShowAboutModal(true);
    const handleCloseAboutModal = () => setShowAboutModal(false);
    return (
        <>
            <Navbar
                collapseOnSelect
                variant="dark"
                bg="transparent"
                expand="lg"
                className={styles.root}
            >
                <Container
                    className={classNames(
                        'd-flex',
                        'align-items-center',
                        'justify-content-between'
                    )}
                >
                    <Navbar.Brand as={Link} to="/">
                        <h4
                            className={classNames(
                                'mb-0',
                                'ml-2',
                                'text-primary',
                                'font-weight-bold'
                            )}
                        >
                            FAKE NOOZ
                        </h4>
                    </Navbar.Brand>
                    <div
                        className={classNames(
                            styles.gameInfo,
                            'text-center',
                            'd-flex',
                            'align-items-center',
                            'justify-content-center'
                        )}
                    >
                        <h5 className="mr-3">
                            <div>Round</div>
                            <small>{round}</small>
                        </h5>
                        <h5 className="ml-3">
                            <div>Score</div>
                            <small>{score}</small>
                        </h5>
                    </div>
                    <Nav role="navigation">
                        {handleNewGame && (
                            <Nav.Link
                                className={linkClass}
                                onClick={handleNewGame}
                            >
                                <FontAwesomeIcon
                                    icon={faPowerOff}
                                    fixedWidth
                                    className={iconClass}
                                />
                                New Game
                            </Nav.Link>
                        )}
                        <Nav.Link
                            className={linkClass}
                            onClick={handleShowAboutModal}
                        >
                            <FontAwesomeIcon
                                icon={faQuestionCircle}
                                fixedWidth
                                className={iconClass}
                            />
                            About
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <About show={showAboutModal} onHide={handleCloseAboutModal} />
        </>
    );
};

CustomNavbar.propTypes = {
    round: number.isRequired,
    score: number.isRequired,
    handleNewGame: func
};

CustomNavbar.defaultProps = {
    handleNewGame: undefined
};

export default CustomNavbar;
