import React from 'react';
import { func, shape, bool } from 'prop-types';
import classNames from 'classnames';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/pro-solid-svg-icons';
import Result from './Result';

const Game = ({
    article,
    realPlay,
    showResult,
    handleNextArticle,
    handleRealButton,
    handleFakeButton
}) => {
    const win = article && article.real === realPlay;
    return showResult ? (
        <Result
            article={article}
            win={win}
            handleNextArticle={handleNextArticle}
        />
    ) : (
        <>
            <Card bg="dark" border="dark">
                <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <article /* eslint-disable react/no-danger */
                        dangerouslySetInnerHTML={{
                            __html: article.content
                                .replace(/<img[^>]*>/g, '')
                                .replace(/<a[^>]*>.*<\/a>/g, '')
                                .replace(/\n.*/g, '')
                                .replace(
                                    /\s*makeamericathebest.com Your Trusted Source for Faux News\./g,
                                    ''
                                )
                        }}
                    />
                </Card.Body>
            </Card>
            <div
                className={classNames(
                    'd-flex',
                    'align-items-center',
                    'justify-content-center',
                    'mt-4'
                )}
            >
                <Button
                    variant="success"
                    size="lg"
                    className="mr-3"
                    onClick={handleRealButton}
                >
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                    Real
                </Button>
                <Button
                    variant="danger"
                    size="lg"
                    className="ml-3"
                    onClick={handleFakeButton}
                >
                    <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                    Fake
                </Button>
            </div>
        </>
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
