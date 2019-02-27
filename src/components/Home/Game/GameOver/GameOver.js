import React from 'react';
import { shape, oneOfType, number, string, func } from 'prop-types';
import classNames from 'classnames';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/pro-solid-svg-icons';

const GameOver = ({
    stats: { gameRounds, score, accuracy },
    handleNewGame
}) => {
    const accuracyPercent = Number(accuracy.replace(/%/g, ''));
    let comment = 'Was that your best shot?';
    let resultVariant = 'dark';

    if (accuracyPercent === 100) comment = 'Perfect!';
    else if (accuracyPercent >= 90) comment = 'Almost Perfect';
    else if (accuracyPercent >= 80) comment = 'Very Nice';
    else if (accuracyPercent >= 70) comment = 'Good Job';
    else if (accuracyPercent >= 60) comment = 'Not Bad';
    else if (accuracyPercent >= 50) comment = "It's the effort that counts.";
    else if (accuracyPercent >= 33) comment = 'Looks like you got fooled.';
    else if (accuracyPercent >= 10) comment = 'Well… you tried.';

    if (accuracyPercent >= 66) resultVariant = 'success';
    else if (accuracyPercent <= 33) resultVariant = 'danger';

    return (
        <>
            <h3 className={classNames('text-center', 'mb-4', 'mb-md-5')}>
                Game Over
            </h3>
            <Card
                bg={resultVariant}
                border={resultVariant}
                className="text-center"
            >
                <Card.Body>
                    <Card.Title aria-label="Article title">
                        {comment}
                    </Card.Title>
                    <div
                        className={classNames(
                            'text-center',
                            'mx-auto',
                            'd-flex',
                            'align-items-center',
                            'justify-content-center'
                        )}
                    >
                        <h6>
                            Rounds
                            <br />
                            <small>{gameRounds}</small>
                        </h6>
                        <h6 className="mx-2 mx-md-3">
                            Score
                            <br />
                            <small>{score}</small>
                        </h6>
                        <h6>
                            Accuracy
                            <br />
                            <small>{accuracy}</small>
                        </h6>
                    </div>
                </Card.Body>
            </Card>
            <div
                className={classNames(
                    'd-flex',
                    'justify-content-center',
                    'mt-4'
                )}
            >
                <Button variant="light" size="lg" onClick={handleNewGame}>
                    <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                    New Game
                </Button>
            </div>
        </>
    );
};

GameOver.propTypes = {
    stats: shape({
        gameRounds: oneOfType([string, number]).isRequired,
        score: number.isRequired,
        accuracy: string.isRequired
    }).isRequired,
    handleNewGame: func.isRequired
};

export default GameOver;
