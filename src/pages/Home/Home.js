import React, { useState, useEffect } from 'react';
import { number, func, shape, bool } from 'prop-types';
import classNames from 'classnames';
import Helmet from 'react-helmet';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faTimesCircle,
    faExternalLink,
    faChevronCircleRight
} from '@fortawesome/pro-solid-svg-icons';
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons';
import Parser from 'rss-parser';

const parser = new Parser();
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

const feedMetadata = [
    {
        link: 'https://www.theonion.com/rss',
        real: false
    },
    {
        link: 'http://makeamericathebest.com/feed/',
        real: false
    },
    {
        link: 'https://babylonbee.com/feed',
        real: false
    },
    {
        link: 'https://www.wsj.com/xml/rss/3_7085.xml',
        real: true
    },
    {
        link: 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
        real: true
    },
    {
        link: 'http://feeds.reuters.com/reuters/topNews',
        real: true
    }
];

const randomElement = array => array[Math.floor(Math.random() * array.length)];

const randomArticle = feeds => {
    const { title: source, real, items } = randomElement(feeds);
    const { title, content, link } = randomElement(items);
    return {
        source,
        real,
        title,
        content,
        link
    };
};

const Loading = () => (
    <p
        className={classNames(
            'd-flex',
            'align-items-center',
            'justify-content-center'
        )}
    >
        <FontAwesomeIcon
            icon={faSpinnerThird}
            size="2x"
            spin
            className={classNames('mr-3', 'text-primary')}
        />
        Loading news feeds...
    </p>
);

const Result = ({
    article: { source, real, title, link },
    win,
    handleNextArticle
}) => {
    const winVariant = win ? 'success' : 'danger';
    return (
        <>
            <Card bg={winVariant} border={winVariant} className="text-center">
                <Card.Body>
                    <Card.Title>
                        <FontAwesomeIcon
                            icon={real ? faCheckCircle : faTimesCircle}
                            className="mr-2"
                        />
                        {real ? 'Real News' : 'Fake News'}
                    </Card.Title>
                    <h6>{source}</h6>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white"
                    >
                        {title}
                        <FontAwesomeIcon
                            icon={faExternalLink}
                            className="ml-2"
                        />
                    </a>
                </Card.Body>
            </Card>
            <div
                className={classNames(
                    'd-flex',
                    'justify-content-center',
                    'mt-4'
                )}
            >
                <Button variant="light" size="lg" onClick={handleNextArticle}>
                    <FontAwesomeIcon
                        icon={faChevronCircleRight}
                        className="mr-2"
                    />
                    Next
                </Button>
            </div>
        </>
    );
};

Result.propTypes = {
    article: shape({}).isRequired,
    win: bool.isRequired,
    handleNextArticle: func.isRequired
};

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

const Home = ({
    round,
    score,
    setScore,
    setRound,
    playHandler,
    newGameHandler,
    setHandlePlay,
    setHandleNewGame
}) => {
    const [feeds, setFeeds] = useState([]);
    const [article, setArticle] = useState();
    const [realPlay, setRealPlay] = useState();
    const [showResult, setShowResult] = useState(false);

    const fetchFeeds = async () => {
        setFeeds([
            ...feeds,
            ...(await Promise.all(
                feedMetadata.map(async meta => {
                    try {
                        const feed = await parser.parseURL(
                            `${CORS_PROXY}${meta.link}`
                        );
                        return { ...feed, ...meta };
                    } catch (error) {
                        console.error(error);
                        return [];
                    }
                })
            ))
        ]);
    };

    const handlePlay = isReal => {
        setScore(article.real === isReal ? score + 1 : Math.max(score - 1, 0));
        setRealPlay(isReal);
        setShowResult(true);
    };

    const handlePlayParent = () => isReal => handlePlay(isReal);

    const handleNextArticle = advanceRound => {
        if (advanceRound) setRound(round + 1);
        setArticle(randomArticle(feeds));
        setShowResult(false);
    };

    const handleNewGame = () => () => {
        setScore(0);
        setRound(1);
        handleNextArticle(false);
    };

    useEffect(() => {
        if (!feeds.length) fetchFeeds();
        else if (!article) setArticle(randomArticle(feeds));
        if (!playHandler) setHandlePlay(handlePlayParent);
        if (!newGameHandler) setHandleNewGame(handleNewGame);
    }, [feeds, article, playHandler, newGameHandler]);

    return (
        <Container className="py-5">
            <Helmet title="Fake Nooz" />
            <h3 className="text-center mb-5">Is it real or fake?</h3>
            <Row>
                <Col sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
                    {article ? (
                        <Game
                            article={article}
                            realPlay={realPlay}
                            showResult={showResult}
                            handleNextArticle={handleNextArticle}
                            handleRealButton={() => handlePlay(true)}
                            handleFakeButton={() => handlePlay(false)}
                        />
                    ) : (
                        <Loading />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

Home.propTypes = {
    round: number.isRequired,
    score: number.isRequired,
    setScore: func.isRequired,
    setRound: func.isRequired,
    playHandler: func,
    newGameHandler: func,
    setHandlePlay: func.isRequired,
    setHandleNewGame: func.isRequired
};

Home.defaultProps = {
    playHandler: undefined,
    newGameHandler: undefined
};

export default Home;
