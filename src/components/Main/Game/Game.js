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
    handleRealButton,
    handleFakeButton,
    handleNewGame
}) => {
    const win = article && article.isReal === realPlay;
    let Stage;

    switch (stats.stage) {
        case 'start-game':
            Stage = () => (
                <StartGame
                    stats={stats}
                    feeds={feeds}
                    handleStartGame={handleStartGame}
                    handleRoundSetting={handleRoundSetting}
                />
            );
            break;
        case 'round':
            Stage = () => (
                <Round
                    article={article}
                    handleRealButton={handleRealButton}
                    handleFakeButton={handleFakeButton}
                />
            );
            break;
        case 'result':
            Stage = () => (
                <Result
                    article={article}
                    win={win}
                    handleNextRound={handleNextRound}
                />
            );
            break;
        case 'end-game':
            Stage = () => (
                <GameOver stats={stats} handleNewGame={handleNewGame} />
            );
            break;
        default:
            Stage = () => null;
            break;
    }

    return (
        <div className="py-4 py-md-5" aria-live="polite">
            <Stage />
        </div>
    );
};

Game.propTypes = {
    stats: shape({}).isRequired,
    feeds: arrayOf(shape({})),
    article: shape({}).isRequired,
    realPlay: bool,
    handleStartGame: func.isRequired,
    handleRoundSetting: func.isRequired,
    handleNextRound: func.isRequired,
    handleRealButton: func.isRequired,
    handleFakeButton: func.isRequired,
    handleNewGame: func.isRequired
};

Game.defaultProps = {
    feeds: undefined,
    realPlay: undefined
};

export default Game;
