import React from 'react';
import { func, arrayOf, shape, bool } from 'prop-types';
import StartGame from './StartGame';
import Round from './Round';
import Result from './Result';
import GameOver from './GameOver';

const Game = ({
    stats,
    feeds,
    article,
    realPlay,
    handleStartGame,
    handleRoundSetting,
    handleNextRound,
    handleRealPlay,
    handleFakePlay,
    handleNewGame
}) => {
    const win = article && article.isReal === realPlay;

    switch (stats.stage) {
        case 'start-game':
            return (
                <StartGame
                    stats={stats}
                    feeds={feeds}
                    handleStartGame={handleStartGame}
                    handleRoundSetting={handleRoundSetting}
                />
            );
        case 'round':
            return (
                <Round
                    article={article}
                    handleRealPlay={handleRealPlay}
                    handleFakePlay={handleFakePlay}
                />
            );
        case 'result':
            return (
                <Result
                    article={article}
                    win={win}
                    handleNextRound={handleNextRound}
                />
            );
        case 'end-game':
            return <GameOver stats={stats} handleNewGame={handleNewGame} />;
        default:
            return null;
    }
};

Game.propTypes = {
    stats: shape({}).isRequired,
    feeds: arrayOf(shape({})),
    article: shape({}).isRequired,
    realPlay: bool,
    handleStartGame: func.isRequired,
    handleRoundSetting: func.isRequired,
    handleNextRound: func.isRequired,
    handleRealPlay: func.isRequired,
    handleFakePlay: func.isRequired,
    handleNewGame: func.isRequired
};

Game.defaultProps = {
    feeds: undefined,
    realPlay: undefined
};

export default Game;
