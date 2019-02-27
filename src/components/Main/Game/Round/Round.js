import React, { useState } from 'react';
import { func, shape } from 'prop-types';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import Swipe from 'react-easy-swipe';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/pro-solid-svg-icons';
import styles from './Round.module.scss';

const browserWidth = () =>
    Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );

const Round = ({
    article: { title, content },
    handleRealButton,
    handleFakeButton
}) => {
    const [cardXOffset, setCardXOffset] = useState(0);

    const onSwipeStart = () => {
        // console.info('Start swiping...');
    };

    const onSwipeMove = ({ x }) => {
        setCardXOffset(cardXOffset + x);
    };

    const onSwipeEnd = () => {
        const halfBrowserWidth = browserWidth() / 2;
        if (cardXOffset < -halfBrowserWidth) handleRealButton();
        if (cardXOffset > halfBrowserWidth) handleFakeButton();
    };

    const formattedArticle = content
        .replace(/^\s+/g, '') // Remove lead space
        .replace(/^(?:&nbsp;)+/g, '') // Remove lead space
        .replace(/<img[^>]*>/g, '') // Remove images
        .replace(/<a[^>]*>.*<\/a>/g, '') // Remove links
        .replace(/<\/?p[^>]*>/g, '') // Remove paragraphs
        .replace(/<table[^>]*>.*<\/table>/g, '') // Remove tables (Reddit)
        .replace(/submitted by.*/g, '') // Remove submitted by (Reddit)
        .replace(/<br.*/g, '') // Remove line breaks and following content
        .replace(/The post \.\n/g, '') // Remove "The post ."
        .replace(/^.$/g, '') // Remove period
        .replace(
            /\s*makeamericathebest.com Your Trusted Source for Faux News\./g,
            ''
        ); // Remove "Make America The Best" tagline
    const articleContentExists = formattedArticle && formattedArticle !== '';

    return (
        <div className={styles.roundContainer}>
            <h3 className={classNames('text-center', 'mb-4', 'mb-md-5')}>
                Is it real or fake?
            </h3>
            <Swipe
                {...isMobile && {
                    onSwipeStart,
                    onSwipeMove,
                    onSwipeEnd
                }}
            >
                <Card style={{ left: cardXOffset }}>
                    <Card.Body>
                        <Card.Title
                            aria-label="Article title"
                            className={classNames(
                                !articleContentExists && 'mb-0'
                            )}
                        >
                            {title}
                        </Card.Title>
                        {articleContentExists && (
                            <article /* eslint-disable react/no-danger */
                                dangerouslySetInnerHTML={{
                                    __html: formattedArticle
                                }}
                            />
                        )}
                    </Card.Body>
                </Card>
            </Swipe>
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
                    aria-label="It's real"
                    onClick={handleRealButton}
                >
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                    Real
                </Button>
                <Button
                    variant="primary"
                    size="lg"
                    className="ml-3"
                    aria-label="It's fake"
                    onClick={handleFakeButton}
                >
                    <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                    Fake
                </Button>
            </div>
        </div>
    );
};

Round.propTypes = {
    article: shape({}).isRequired,
    handleRealButton: func.isRequired,
    handleFakeButton: func.isRequired
};

export default Round;
