import React, { useState } from 'react';
import {
    bool,
    string,
    func,
    shape,
    oneOfType,
    object,
    array,
    arrayOf,
    node
} from 'prop-types';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';
import Swipe from 'react-easy-swipe';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faTimesCircle,
    faArrowLeft,
    faArrowRight
} from '@fortawesome/pro-solid-svg-icons';
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
            styles[`swipeBadge${label}`],
            active && styles.swipeBadgeActive,
            'text-center',
            `text-${variant}`,
            className
        )}
        {...props}
    >
        <FontAwesomeIcon
            icon={icon}
            size="2x"
            className={classNames('mx-auto', 'mb-1', 'd-block')}
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

const BottomRow = ({ active, children, className, ...props }) => (
    <div
        className={classNames(
            'mt-4',
            'd-flex',
            'align-items-center',
            'justify-content-center',
            'fade',
            active && 'show',
            className
        )}
        {...props}
    >
        {children}
    </div>
);

BottomRow.propTypes = {
    active: bool.isRequired,
    children: oneOfType([node, arrayOf(node)]).isRequired,
    className: string
};

BottomRow.defaultProps = {
    className: undefined
};

const Round = ({ article: { title, content }, handlePlay }) => {
    const cardXOffsetDefault = -35;
    const [cardXOffset, setCardXOffset] = useState(cardXOffsetDefault);
    const [swiping, setSwiping] = useState(false);

    const swipeThreshold = browserWidth() / 2.5;
    let swipe;
    if (cardXOffset - cardXOffsetDefault < -swipeThreshold) swipe = 'Real';
    else if (cardXOffset - cardXOffsetDefault > swipeThreshold) swipe = 'Fake';

    const swipeReal = swipe === 'Real';
    const swipeFake = swipe === 'Fake';

    let cardVariant;
    if (swipeReal) cardVariant = 'success';
    else if (swipeFake) cardVariant = 'primary';

    const [swipeEndClass, setSwipeEndClass] = useState();

    const onSwipeStart = () => {
        setSwiping(true);
        setSwipeEndClass();
    };

    const onSwipeMove = ({ x }) => setCardXOffset(x + cardXOffsetDefault);

    const onSwipeEnd = () => {
        setSwiping(false);
        if (swipe) {
            setSwipeEndClass(styles[`swipeEnd${swipe}`]);
            setTimeout(() => handlePlay(swipeReal), 250);
        } else {
            setSwipeEndClass(styles.swipeEnd);
            setCardXOffset();
        }
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
                className={classNames(
                    styles.swipeContainer,
                    swipeEndClass,
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
                <Card
                    bg={cardVariant}
                    border={cardVariant}
                    className={styles.card}
                >
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
            </Swipe>
            <BottomRow active={!swiping}>
                <Button
                    variant="success"
                    size="lg"
                    aria-label="It's real"
                    onClick={() => handlePlay(true)}
                    className="mr-3"
                >
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                    Real
                </Button>
                <Button
                    variant="primary"
                    size="lg"
                    aria-label="It's fake"
                    onClick={() => handlePlay(false)}
                    className="ml-3"
                >
                    <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                    Fake
                </Button>
            </BottomRow>
            <BottomRow active={swiping} className="mt-n5">
                <div className={classNames('mr-4', 'text-center')}>
                    <div>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className={classNames('mr-2', 'text-success')}
                        />
                        Real
                    </div>
                    <small>Swipe Left</small>
                </div>
                <div className={classNames('ml-4', 'text-center')}>
                    <div>
                        Fake
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            className={classNames('ml-2', 'text-primary')}
                        />
                    </div>
                    <small>Swipe Right</small>
                </div>
            </BottomRow>
        </>
    );
};

Round.propTypes = {
    article: shape({}).isRequired,
    handlePlay: func.isRequired
};

export default Round;
