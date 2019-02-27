import React, { useState, useEffect } from 'react';
import { shape, oneOfType, string, number, func, bool } from 'prop-types';
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
        return null;
    }
};

const Home = ({
    stats,
    setScore,
    setRound,
    setGameRounds,
    setLoading,
    setStage,
    playHandler,
    newGameHandler,
    setHandlePlay,
    setHandleNewGame
}) => {
    const [feeds, setFeeds] = useState([]);
    const [article, setArticle] = useState();
    const [realPlay, setRealPlay] = useState();
    const { round, gameRounds, score, loading } = stats;

    const fetchFeeds = async clear => {
        setFeeds([
            ...(clear ? [] : feeds),
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
        setScore(
            article.isReal === isReal ? score + 1 : Math.max(score - 1, 0)
        );
        setRealPlay(isReal);
        setStage('result');
    };

    const handlePlayParent = () => handlePlay;

    const handleStartGame = event => {
        event.preventDefault();
        setStage('round');
    };

    const handleRoundSetting = event => setGameRounds(event.target.value);

    const handleNextRound = advanceRound => {
        if (round < gameRounds) {
            if (advanceRound) setRound(round + 1);
            setFeeds(
                feeds.map(feed => ({
                    items: feed.items.filter(
                        ({ link }) => link !== article.link
                    ),
                    ...feed
                }))
            );
            const nextRound = randomArticle(feeds);
            if (nextRound) {
                setArticle(nextRound);
                setStage('round');
            } else setStage('end-game');
        } else setStage('end-game');
    };

    const handleNewGame = async () => {
        setLoading(true);
        await fetchFeeds(true);
        handleNextRound(false);
        setStage('start-game');
        setRound(1);
        setScore(0);
        setLoading(false);
    };

    const handleNewGameParent = () => handleNewGame;

    useEffect(() => {
        if (!feeds.length) fetchFeeds();
        else if (!article) setArticle(randomArticle(feeds));
        else setLoading(false);
        if (!playHandler) setHandlePlay(handlePlayParent);
        if (!newGameHandler) setHandleNewGame(handleNewGameParent);
    }, [feeds, article, playHandler, newGameHandler]);

    return (
        <Container role="main">
            <Helmet title="FAKE NOOZ" />
            <Row>
                <Col
                    sm={{ span: 10, offset: 1 }}
                    lg={{ span: 8, offset: 2 }}
                    xl={{ span: 6, offset: 3 }}
                >
                    {loading ? (
                        <Loading isLoading pastDelay />
                    ) : (
                        <Game
                            stats={stats}
                            feeds={feeds}
                            article={article}
                            realPlay={realPlay}
                            handleStartGame={handleStartGame}
                            handleRoundSetting={handleRoundSetting}
                            handleNextRound={handleNextRound}
                            handleRealButton={() => handlePlay(true)}
                            handleFakeButton={() => handlePlay(false)}
                            handleNewGame={handleNewGame}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

Home.propTypes = {
    stats: shape({
        round: number.isRequired,
        gameRounds: oneOfType([string, number]).isRequired,
        score: number.isRequired,
        loading: bool.isRequired
    }).isRequired,
    setScore: func.isRequired,
    setRound: func.isRequired,
    setGameRounds: func.isRequired,
    setLoading: func.isRequired,
    setStage: func.isRequired,
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
