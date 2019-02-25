import React from 'react';
import { func, shape, bool } from 'prop-types';
import classNames from 'classnames';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faTimesCircle,
    faExternalLink,
    faChevronCircleRight
} from '@fortawesome/pro-solid-svg-icons';

const Result = ({
    article: { source, isReal, title, link },
    win,
    handleNextArticle
}) => {
    const winVariant = win ? 'success' : 'danger';
    return (
        <>
            <Card bg={winVariant} border={winVariant} className="text-center">
                <Card.Body>
                    <Card.Title as="h4">
                        {win ? 'Correct!' : 'Incorrect'}
                    </Card.Title>
                    <h5>
                        <FontAwesomeIcon
                            icon={isReal ? faCheckCircle : faTimesCircle}
                            className="mr-2"
                        />
                        {isReal ? 'Real News' : 'Fake News'}
                    </h5>
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

export default Result;
