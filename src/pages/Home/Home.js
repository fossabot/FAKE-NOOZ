import React, { useState, useEffect } from 'react';
import { number, func } from 'prop-types';
import classNames from 'classnames';
import Helmet from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons';
import Parser from 'rss-parser';
import Game from './Game';
import feedMetadata from './feedMetadata';

const parser = new Parser();
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

const randomElement = array =>
    array ? array[Math.floor(Math.random() * array.length)] : null;

const randomArticle = feeds => {
    try {
        const { title: source, real, items } = randomElement(feeds);
        const { title, content, link } = randomElement(items);
        return {
            source,
            real,
            title,
            content,
            link
        };
    } catch {
        return randomArticle(feeds);
    }
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
            <Helmet title="FAKE NOOZ" />
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
