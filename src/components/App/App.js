import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { HotKeys } from 'react-hotkeys';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar';
import Home from '../Home';
import NotFound from '../NotFound';
import Footer from '../Footer';
import './App.scss';

const App = () => {
    const [loading, setLoading] = useState(true);
    const [stage, setStage] = useState('start-game');
    const [round, setRound] = useState(1);
    const [gameRounds, setGameRounds] = useState(10);
    const [score, setScore] = useState(0);
    const [keyHandlers, setKeyHandlers] = useState();
    const [handleNewGame, setHandleNewGame] = useState();

    const accuracy = `${Math.round(
        (100 * score) / (stage === 'round' ? Math.max(1, round - 1) : round)
    )}%`;

    const stats = { stage, round, gameRounds, score, accuracy, loading };

    return (
        <BrowserRouter>
            <HotKeys
                handlers={{
                    n: () => {
                        console.info('Next!');
                    }
                }}
                focused
                tabIndex="-1"
            >
                <Helmet defaultTitle="FAKE NOOZ" />
                <Navbar stats={stats} handleNewGame={handleNewGame} />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={props => (
                            <Home
                                stats={stats}
                                setScore={setScore}
                                setRound={setRound}
                                setGameRounds={setGameRounds}
                                setLoading={setLoading}
                                setStage={setStage}
                                keyHandlers={keyHandlers}
                                newGameHandler={handleNewGame}
                                setKeyHandlers={setKeyHandlers}
                                setHandleNewGame={setHandleNewGame}
                                {...props}
                            />
                        )}
                    />
                    <Route component={NotFound} />
                </Switch>
                <Footer />
            </HotKeys>
        </BrowserRouter>
    );
};

export default App;
