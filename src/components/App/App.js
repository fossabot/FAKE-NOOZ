import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { HotKeys } from 'react-hotkeys';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, NotFound } from '../../pages';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './App.scss';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [handleNewGame, setHandleNewGame] = useState();
    const [handlePlay, setHandlePlay] = useState();

    const keyHandlers = loading
        ? {}
        : {
              r: () => handlePlay(true),
              f: () => handlePlay(false)
          };

    return (
        <HotKeys handlers={keyHandlers} focused tabIndex="-1">
            <BrowserRouter>
                <>
                    <Helmet defaultTitle="FAKE NOOZ" />
                    <Navbar
                        round={round}
                        score={score}
                        loading={loading}
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
                                    loading={loading}
                                    playHandler={handlePlay}
                                    newGameHandler={handleNewGame}
                                    setLoading={setLoading}
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
