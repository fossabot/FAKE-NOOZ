import React from 'react';
import { func, shape, bool } from 'prop-types';
import Result from './Result';
import Round from './Round';

const Game = ({
    article,
    realPlay,
    showResult,
    handleNextArticle,
    handleRealButton,
    handleFakeButton
}) => {
    const win = article && article.isReal === realPlay;
    return (
        <div className="py-5">
            {showResult ? (
                <Result
                    article={article}
                    win={win}
                    handleNextArticle={handleNextArticle}
                />
            ) : (
                <Round
                    article={article}
                    handleRealButton={handleRealButton}
                    handleFakeButton={handleFakeButton}
                />
            )}
        </div>
    );
};

Game.propTypes = {
    article: shape({}).isRequired,
    realPlay: bool,
    showResult: bool.isRequired,
    handleNextArticle: func.isRequired,
    handleRealButton: func.isRequired,
    handleFakeButton: func.isRequired
};

Game.defaultProps = {
    realPlay: undefined
};

export default Game;
