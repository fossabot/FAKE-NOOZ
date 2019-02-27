import React from 'react';
import { arrayOf, shape, func } from 'prop-types';
import classNames from 'classnames';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';

const StartGame = ({
    stats: { gameRounds },
    feeds,
    handleStartGame,
    handleRoundSetting
}) => {
    const articleCount = feeds.reduce(
        (count, feed) => count + feed.items.length,
        0
    );
    const roundOptions = articleCount > 10 ? [10] : [];
    for (let i = 25; i <= articleCount; i *= 2) roundOptions.push(i);
    return (
        <Form onSubmit={handleStartGame}>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title aria-label="Article title">
                        <b>FAKE NOOZ</b>
                    </Card.Title>
                    Can you tell what&apos;s real news and what&apos;s fake
                    news? Take a look at these articles and see how good you are
                    at finding fact from fiction.
                    <Form.Group
                        as={Row}
                        controlId="number-of-rounds-form"
                        className={classNames('mt-3', 'text-left')}
                    >
                        <Form.Label
                            column
                            xs={{ span: 6, offset: 1 }}
                            sm={{ span: 5, offset: 2 }}
                            lg={{ span: 4, offset: 3 }}
                        >
                            Number of Rounds
                        </Form.Label>
                        <Col xs={4} sm={3} lg={2}>
                            <Form.Control
                                as="select"
                                value={gameRounds}
                                onChange={handleRoundSetting}
                            >
                                {roundOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                                <option value={articleCount}>
                                    {articleCount} (Max)
                                </option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Card.Body>
            </Card>
            <div
                className={classNames(
                    'd-flex',
                    'justify-content-center',
                    'mt-4'
                )}
            >
                <Button type="submit" variant="light" size="lg">
                    Start
                </Button>
            </div>
        </Form>
    );
};

StartGame.propTypes = {
    stats: shape({}).isRequired,
    feeds: arrayOf(shape({})).isRequired,
    handleStartGame: func.isRequired,
    handleRoundSetting: func.isRequired
};

export default StartGame;
