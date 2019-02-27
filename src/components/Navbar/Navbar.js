import React, { useState } from 'react';
import { shape, number, string, func, bool } from 'prop-types';
import classNames from 'classnames';
import { NavLink as Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faQuestionCircle } from '@fortawesome/pro-solid-svg-icons';
import { About } from '../../pages';
import { ReactComponent as Logo } from './logo.svg';
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

const CustomNavbar = ({
    stats: { stage, round, gameRounds, score, accuracy, loading },
    handleNewGame
}) => {
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
                    <Navbar.Brand
                        as={Link}
                        to="/"
                        className={classNames('d-flex', 'align-items-center')}
                    >
                        <Logo height={40} />
                        <h4
                            className={classNames(
                                'd-none',
                                'd-md-block',
                                'mb-0',
                                'ml-3',
                                'text-primary',
                                'font-weight-bold'
                            )}
                        >
                            FAKE NOOZ
                        </h4>
                    </Navbar.Brand>
                    {!loading && !/.+-game/g.test(stage) && (
                        <div
                            className={classNames(
                                styles.gameInfo,
                                'text-center',
                                'd-flex',
                                'align-items-center',
                                'justify-content-center'
                            )}
                        >
                            <h5
                                className={classNames('d-inline', 'd-md-block')}
                            >
                                Round
                                <br
                                    className={classNames(
                                        'd-none',
                                        'd-md-block'
                                    )}
                                />
                                <small>
                                    {round} / {gameRounds}
                                </small>
                            </h5>
                            <h5 className="mx-2 mx-md-3">
                                Score
                                <br
                                    className={classNames(
                                        'd-none',
                                        'd-md-block'
                                    )}
                                />
                                <small>{score}</small>
                            </h5>
                            <h5>
                                Accuracy
                                <br
                                    className={classNames(
                                        'd-none',
                                        'd-md-block'
                                    )}
                                />
                                <small>{accuracy}</small>
                            </h5>
                        </div>
                    )}
                    <Nav role="navigation">
                        {!loading && stage !== 'start-game' && (
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
    stats: shape({
        stage: string.isRequired,
        round: number.isRequired,
        gameRounds: number.isRequired,
        score: number.isRequired,
        accuracy: string.isRequired,
        loading: bool.isRequired
    }).isRequired,
    handleNewGame: func
};

CustomNavbar.defaultProps = {
    handleNewGame: undefined
};

export default CustomNavbar;
