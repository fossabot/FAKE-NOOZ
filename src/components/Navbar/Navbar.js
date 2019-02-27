import React, { useState } from 'react';
import { shape, oneOfType, number, string, func, bool } from 'prop-types';
import classNames from 'classnames';
import { NavLink as Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlusCircle,
    faQuestionCircle
} from '@fortawesome/pro-solid-svg-icons';
import About from '../About';
import { ReactComponent as Logo } from './logo.svg';
import styles from './Navbar.module.scss';

const linkClass = classNames(
    styles.link,
    styles.navLink,
    'd-flex',
    'd-sm-block',
    'text-center',
    'align-items-center'
);
const iconClass = classNames(
    styles.icon,
    'mr-2',
    'mx-sm-auto',
    'mb-sm-1',
    'd-sm-block'
);

const GameInfo = ({ label, value }) => (
    <h5 className={classNames(styles.gameInfo, 'mx-sm-3', 'mb-0')}>
        <div
            className={classNames('d-inline', 'd-sm-block', 'mr-2', 'mr-sm-0')}
        >
            {label}
        </div>
        <small>{value}</small>
    </h5>
);

GameInfo.propTypes = {
    label: string.isRequired,
    value: oneOfType([string, number]).isRequired
};

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
                expand="sm"
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
                        className={classNames(
                            styles.link,
                            'mr-0',
                            'd-flex',
                            'align-items-center'
                        )}
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
                                styles.gameInfoContainer,
                                'text-center',
                                'd-sm-flex',
                                'align-items-center',
                                'justify-content-center'
                            )}
                            aria-live="polite"
                            aria-label="Game Info"
                        >
                            <GameInfo
                                label="Round"
                                value={`${round} / ${gameRounds}`}
                            />
                            <GameInfo label="Score" value={score} />
                            <GameInfo label="Accuracy" value={accuracy} />
                        </div>
                    )}
                    <Nav role="navigation">
                        {!loading && stage !== 'start-game' && (
                            <Nav.Link
                                className={linkClass}
                                onClick={handleNewGame}
                            >
                                <FontAwesomeIcon
                                    icon={faPlusCircle}
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
        gameRounds: oneOfType([string, number]).isRequired,
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
