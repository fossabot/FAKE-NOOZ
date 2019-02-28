import React, { useState } from 'react';
import {
    bool,
    string,
    func,
    shape,
    oneOfType,
    object,
    array
} from 'prop-types';
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

const SwipeBadge = ({ active, label, variant, icon, className, ...props }) => (
    <div
        className={classNames(
            styles.swipeBadge,
            styles[`swipe${label}`],
            active && styles.swipeActive,
            'text-center',
            `text-${variant}`,
            className
        )}
        {...props}
    >
        <FontAwesomeIcon
            icon={icon}
            size="2x"
            className={classNames('mx-auto', 'mb-1')}
        />
        {label}
    </div>
);

SwipeBadge.propTypes = {
    active: bool.isRequired,
    label: string.isRequired,
    variant: string.isRequired,
    icon: oneOfType([object, array, string]).isRequired,
    className: string
};

SwipeBadge.defaultProps = {
    className: undefined
};

const Round = ({
    article: { title, content },
    handleRealPlay,
    handleFakePlay
}) => {
    const [cardXOffset, setCardXOffset] = useState(0);

    const swipeThreshold = browserWidth() / 2.5;
    const swipeReal = cardXOffset < -swipeThreshold;
    const swipeFake = cardXOffset > swipeThreshold;

    const onSwipeStart = () => {
        console.info('Start swiping...');
    };

    const onSwipeMove = ({ x }) => setCardXOffset(x);

    const onSwipeEnd = () => {
        if (swipeReal) handleRealPlay();
        else if (swipeFake) handleFakePlay();
        else setCardXOffset(0);
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
        <>
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
                <div
                    className={classNames(
                        'd-flex',
                        'align-items-center',
                        'position-relative'
                    )}
                    style={{ left: cardXOffset }}
                >
                    <SwipeBadge
                        active={swipeFake}
                        label="Fake"
                        variant="primary"
                        icon={faTimesCircle}
                    />
                    <Card>
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
                    <SwipeBadge
                        active={swipeReal}
                        label="Real"
                        variant="success"
                        icon={faCheckCircle}
                    />
                </div>
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
                    aria-label="It's real"
                    onClick={handleRealPlay}
                    className="mr-3"
                >
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                    Real
                </Button>
                <Button
                    variant="primary"
                    size="lg"
                    aria-label="It's fake"
                    onClick={handleFakePlay}
                    className="ml-3"
                >
                    <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                    Fake
                </Button>
            </div>
        </>
    );
};

Round.propTypes = {
    article: shape({}).isRequired,
    handleRealPlay: func.isRequired,
    handleFakePlay: func.isRequired
};

export default Round;
