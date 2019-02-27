import React, { useState, useEffect } from 'react';
import { number, func, bool } from 'prop-types';
import Helmet from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import Parser from 'rss-parser';
import Loading from '../../components/Loading';
import Game from './Game';
import feedMetadata from '../../feedMetadata';

const parser = new Parser();
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

const randomElement = array =>
    array ? array[Math.floor(Math.random() * array.length)] : null;

const randomArticle = feeds => {
    try {
        const { source, isReal, items } = randomElement(feeds);
        const { title, content, link } = randomElement(items);
        return {
            source,
            isReal,
            title,
            content,
            link
        };
    } catch (error) {
        console.error('Failed to get random article: ', error);
        return null;
    }
};

const Home = ({
    round,
    score,
    setScore,
    setRound,
    loading,
    playHandler,
    newGameHandler,
    setLoading,
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
                            CORS_PROXY + meta.rss
                        );
                        return { ...feed, ...meta };
                    } catch (error) {
                        console.error(error);
                        return {};
                    }
                })
            ))
        ]);
    };

    const handlePlay = isReal => {
        console.info('New play / isReal: ', isReal, ' article: ', article);
        setScore(
            article.isReal === isReal ? score + 1 : Math.max(score - 1, 0)
        );
        setRealPlay(isReal);
        setShowResult(true);
    };

    const handlePlayParent = () => handlePlay;

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
        else setLoading(false);
        if (!playHandler) setHandlePlay(handlePlayParent);
        if (!newGameHandler) setHandleNewGame(handleNewGame);
    }, [feeds, article, playHandler, newGameHandler]);

    return (
        <Container role="main">
            <Helmet title="FAKE NOOZ" />
            <Row>
                <Col
                    sm={{ span: 8, offset: 2 }}
                    md={{ span: 6, offset: 3 }}
                    aria-live="polite"
                >
                    {loading ? (
                        <Loading isLoading pastDelay />
                    ) : (
                        <Game
                            article={article}
                            realPlay={realPlay}
                            showResult={showResult}
                            handleNextArticle={handleNextArticle}
                            handleRealButton={() => handlePlay(true)}
                            handleFakeButton={() => handlePlay(false)}
                        />
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
    loading: bool.isRequired,
    playHandler: func,
    newGameHandler: func,
    setLoading: func.isRequired,
    setHandlePlay: func.isRequired,
    setHandleNewGame: func.isRequired
};

Home.defaultProps = {
    playHandler: undefined,
    newGameHandler: undefined
};

export default Home;
