import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { HotKeys } from 'react-hotkeys';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, NotFound } from '../../pages';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './App.scss';

const App = () => {
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [handleNewGame, setHandleNewGame] = useState();
    const [handlePlay, setHandlePlay] = useState();

    const keyHandlers = {
        r: () => handlePlay(true),
        f: () => handlePlay(false)
    };

    return (
        <HotKeys handlers={keyHandlers} focused tabIndex="-1">
            <BrowserRouter>
                <>
                    <Helmet defaultTitle="Fake Nooz" />
                    <Navbar
                        round={round}
                        score={score}
                        setScore={setScore}
                        setRound={setRound}
                        handleNewGame={handleNewGame}
                    />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <Home
                                    round={round}
                                    score={score}
                                    setScore={setScore}
                                    setRound={setRound}
                                    playHandler={handlePlay}
                                    newGameHandler={handleNewGame}
                                    setHandlePlay={setHandlePlay}
                                    setHandleNewGame={setHandleNewGame}
                                    {...props}
                                />
                            )}
                        />
                        <Route component={NotFound} />
                    </Switch>
                    <Footer />
                </>
            </BrowserRouter>
        </HotKeys>
    );
};

export default App;
